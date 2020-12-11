/*处理聊天消息的工具类
author：xpf
*/
import expre from "../resources/expression/expre.json"
import React from 'react';
var ContentDispose = function() {}
var ContentDisposePrototype = ContentDispose.prototype;

ContentDisposePrototype.contentdispose = function(text) {
	var regex = new RegExp('\\[[a-zA-Z0-9\\/\\u4e00-\\u9fa5]+\\]', 'g');
	var contentArray = [];
	var regArray = text.match(regex);
	let html = [];
	if (regArray === null) {
		contentArray.push({
			"Content": text
		});
		contentArray.map((content, i) => {
			if (content["Content"] != null) { //文本    
				html.push(<span>{content["Content"]}</span>);
			} else if (content["Resources"] != null) { //表情  
				html.push(<img src={require("../"+content["Resources"])}/>);
			}
		})
		return html;
	}
	var indexArray = [];
	var pos = text.indexOf(regArray[0]); //头  
	for (let i = 1; i < regArray.length; i++) {
		indexArray.push(pos);
		pos = text.indexOf(regArray[i], pos + 1);
	}
	indexArray.push(pos);
	for (let i = 0; i < indexArray.length; i++) {
		if (indexArray[i] === 0) { //一开始就是表情  
			contentArray.push({
				"Resources": this.EMOTION_GIF_NAME(regArray[i]),
				attr: {
					Type: "0"
				}
			});
		} else {
			if (i === 0) {
				contentArray.push({
					"Content": text.substr(0, indexArray[i])
				});
			} else {
				if (indexArray[i] - indexArray[i - 1] - regArray[i - 1].length > 0) { //两个表情相邻，中间不加content  
					contentArray.push({
						"Content": text.substr(indexArray[i - 1] + regArray[i - 1].length, indexArray[i] - indexArray[i - 1] - regArray[i - 1].length)
					});
				}
			}
			contentArray.push({
				"Resources": this.EMOTION_GIF_NAME(regArray[i]),
				attr: {
					Type: "0"
				}
			});
		}
	}

	let lastLocation = indexArray[indexArray.length - 1] + regArray[regArray.length - 1].length;
	if (text.length > lastLocation) {
		contentArray.push({
			"Content": text.substr(lastLocation, text.length - lastLocation)
		});
	}

	contentArray.map((content, i) => {
		if (content["Content"] != null) { //文本    
			html.push(<span>{content["Content"]}</span>);
		} else if (content["Resources"] != null) { //表情  
			html.push(<img src={require("../"+content["Resources"])}/>);
		}
	})
	return html;
}
//取得表情包地址
ContentDisposePrototype.EMOTION_GIF_NAME = function(text) {
	var url = "resources/expression/" + expre[text];
	return url;
}

export default ContentDispose