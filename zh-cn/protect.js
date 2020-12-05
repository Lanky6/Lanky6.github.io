//保护知识产权 禁止非法盗用 请遵守法律和道德底线
window.onload = function(){
   document.onkeydown = function(event){
    var ev = event || window.event || arguments.callee.caller.arguments[0];
    //123=F12 | 屏蔽F^N键和Ctrl键
    if(event.keyCode = 123){
     return false;
    }
   }
  }

document.oncontextmenu=new Function("event.returnValue=false;");
document.onselectstart=new Function("event.returnValue=false;");// 屏蔽鼠标右键和文本选择

if (top.location != self.location) {top.location=self.location;}// 屏蔽非法镜像或引用

var OriginTitile = document.title,
titleTime;
document.addEventListener("visibilitychange",
function() {
    if (document.hidden) {
        document.title = "点我点我......";
        clearTimeout(titleTime)
    } else {
        document.title = "欢迎回来......" ;
        titleTime = setTimeout(function() {
            document.title = OriginTitile
        },
        500)
    }
});

//网站流量统计
var cnzz_s_tag = document.createElement('script');
cnzz_s_tag.type = 'text/javascript';
cnzz_s_tag.async = true;
cnzz_s_tag.charset = 'utf-8';
cnzz_s_tag.src = 'https://w.cnzz.com/c.php?id=1279171634&async=1';
var root_s = document.getElementsByTagName('script')[0];
root_s.parentNode.insertBefore(cnzz_s_tag, root_s);