/*个人信息页面
*author：xpf
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Provider, connect} from 'react-redux';
import { Form,Layout,Menu,Icon,List,Avatar,Badge,Input,Button,Modal,Card,Row,Col,message} from 'antd';
import MainMenuClickAction from "../../actions/MainMenuClickAction.js"
import AddChatAction from "../../actions/AddChatAction.js"
import request from "../../request/request.js";
import LoadContactListAction from "../../actions/LoadContactListAction.js";
import ContactsListClickAction from "../../actions/ContactsListClickAction.js";
import UserListSort from "../../util/UserListSort.js";

const { Header, Footer, Sider, Content } = Layout;
const { Meta } = Card;

class PersonalCard extends React.Component {
    constructor(props){
        super(props);
        this.state={
          visible:false,
        }
    }
    openChat(){
      this.props.MainMenuClickAction("message");
      var user={};
      user.id = this.props.seluser.userId;
      user.name = this.props.seluser.nickName;
      user.avatar = this.props.seluser.avatar;
      user.type = "user";
      user.isfriend=true;
      this.props.AddChatAction(user);
    }
    showModal = () => {
      this.setState({
        visible: true,
      });
    }
    cancelModal=()=>{
      this.setState({
        visible: false,
      });
    }
    hideModal = () => {
      this.setState({
        visible: false,
      });
      //删除前要调用一下添加好友接口才能删除，不知道是什么问题
      var body = "userId="+sessionStorage.getItem("imUserId")+"&passWord="+sessionStorage.getItem("imUserPassWord")+"&friendUserId="+this.props.seluser.userId;
      request("MessageServerURL","POST","user/addFriend",body,this.addFriendback.bind(this));
    }
    addFriendback(json){
      var body = "userId="+sessionStorage.getItem("imUserId")+"&passWord="+sessionStorage.getItem("imUserPassWord")+"&friendUserId="+this.props.seluser.userId;
      request("MessageServerURL","POST","user/deleteFriend",body,this.deleteFriendback.bind(this))
    }
    deleteFriendback(json){
      if(json.result=="success"){
        message.success('删除成功');
        this.userListLoad();
        this.props.ContactsListClickAction([],"");
      }else{
        message.warning('删除失败');
      }
    }
    userListLoad(){
      var body = "userId="+sessionStorage.getItem("imUserId")+"&passWord="+sessionStorage.getItem("imUserPassWord")
      request("MessageServerURL","POST","user/addresslist",body,this.userListLoadBack)
    }
    userListLoadBack=(json)=>{
      var listSort =new UserListSort();//写的一个排序的算法
      var sortlist = listSort.listSort(json.addressList);
      this.props.LoadContactListAction("UserListLoad",sortlist,json.result);
    }
    render() {
        return (
          <Row>
          <Col span={8} offset={8}>
          <br/>
          <Modal
                    title="好友请求"
                    visible={this.state.visible}
                    onOk={this.hideModal}
                    onCancel={this.cancelModal}
                    okText="删除"
                    cancelText="取消"
                    width="300px"
                  >
                    <p>确定删除{this.props.seluser.nickName}？</p>
                  </Modal>
          <Card
              style={{ width: 300 }}
              actions={[<Icon type="delete" onClick={this.showModal.bind(this)}/>, <Icon type="export" />, <Icon type="message" onClick={this.openChat.bind(this)}/>]}
            >
              <Meta
                avatar=
                  {this.props.seluser.avatar!=""?
                  <Avatar size="small" src={this.props.seluser.avatar} />
                  :
                  <Avatar size="small" icon="user" />
                  }
                
                title={this.props.seluser.nickName}
                style={{height:25}}
              />
              <Layout style={{borderStyle:"solid  none none none ",borderColor:"#DBDBDB #FFFFFF #FFFFFF #FFFFFF  ",borderWidth:1,paddingTop:10,marginTop:10,backgroundColor:"#FFFFFF"}}>
                <p>账&nbsp;&nbsp;&nbsp;号&nbsp;&nbsp;&nbsp;<span>{this.props.seluser.userName}</span></p>
                <p>昵&nbsp;&nbsp;&nbsp;称&nbsp;&nbsp;&nbsp;<span>{this.props.seluser.nickName}</span></p>
                <p>备&nbsp;&nbsp;&nbsp;注&nbsp;&nbsp;&nbsp;<span></span></p>
                <p>联信号&nbsp;&nbsp;&nbsp;<span>{this.props.seluser.userId}</span></p>
                <p>电&nbsp;&nbsp;&nbsp;话&nbsp;&nbsp;&nbsp;<span>{this.props.seluser.mobilePhone}</span></p>
                <p>邮&nbsp;&nbsp;&nbsp;箱&nbsp;&nbsp;&nbsp;<span>{this.props.seluser.email}</span></p>
                <p>签&nbsp;&nbsp;&nbsp;名&nbsp;&nbsp;&nbsp;<span>{this.props.seluser.sign}</span></p>
              </Layout>
          </Card>
          </Col>
          </Row>
        )
      }
    }


PersonalCard.propTypes = {
    MainMenuClickAction:PropTypes.func.isRequired,
    AddChatAction:PropTypes.func.isRequired,
}
const mapStateToProps=(state)=> {
    return {
        menukey:state.MainMenuClickReducer.menukey,
        seluser:state.ContactsListClickReducer.selectRow,
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        MainMenuClickAction: (menukey) => {
            dispatch(MainMenuClickAction(menukey));//派发action，可添加多个参数
        },
        AddChatAction: (user) => {
            dispatch(AddChatAction(user));//派发action，可添加多个参数
        },
        LoadContactListAction: (actiontype,list,result) => {
            dispatch(LoadContactListAction(actiontype,list,result));//派发action，可添加多个参数
        },
        ContactsListClickAction: (user,listtype) => {//页面加载时，派发Action用于加载表单中组件的默认值
            dispatch(ContactsListClickAction(user,listtype));
        },
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PersonalCard); 