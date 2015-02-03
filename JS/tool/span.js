/**
 * 
 */
/*---------------脚本预先执行--------------------------------------------
 *
 *第一种：如果没有<iframe>标签可以使用
 * document.write('<script id="ie_loaded" defer="defer"
 * src="javascript:void(0)"></script>'); var ie_loader =
 * document.getElementById('ie_loaded'); ie_loader.onreadystatechange =
 * function() { if (this.readyState == 'complete') //alert("执行了change"); fn(); };
 *
 *第二种：主要用于非主流浏览器使用
 *if(ducument&&document.getElementById&&document.getElementsByTagName&&document.getElementsByName)
 *{
 *			执行函数();
 *}
 */
function windowLoad(fn){
	checkBrowser();
	if (window.property['type'] == 'IE' && parseInt(window.property['version']) < 9) {
			var time=setInterval(function(){
				try {
					document.documentElement.doScroll('left');
					fn();
					clearInterval(time);
				} catch (e) {}
			},1);
	}else{
			addEvent(window, 'DOMContentLoaded',function(){
				fn();
				removeEvent(window, 'DOMContentLoaded',arguments.callee);
			});
	}
}
function getFileSize(obj){  
    var objValue = obj.value;  
    if (objValue=="") return ;  
    var fileLenth=-1;  
    try {  
        // 对于IE判断要上传的文件的大小
        var fso = new ActiveXObject("Scripting.FileSystemObject");  
        fileLenth=parseInt(fso.getFile(objValue).size);  
    } catch (e){  
        try{  
            // 对于非IE获得要上传文件的大小
             fileLenth=parseInt(obj.files[0].size);  
        }catch (e) {  
            fileLenth=-1;          
        }  
         
    }  
    return fileLenth;  
}  
// 检测浏览器
function checkBrowser(){
	var property=navigator.userAgent.toLowerCase();
	
	window.property={};
	var s=[];
	window.property['type']=
	(s=property.match(/firefox\/([\d.]+)/)) ? 'Firefox':
	(s=property.match(/chrome\/([\d.]+)/)) ? 'Chrome':
	(s=property.match(/msie ([\d.]+)/)) ? 'IE':
	(s=property.match(/version\/([\d.]+).*safari/)) ? 'Safari':"未知";
	(s.length>1)? window.property['version']=s[1]:"未知";
	 
	// alert(window.property['type']+"------"+window.property['version']);
};
// 跨浏览器添加事件------------------------------------------------------
function addEvent(obj, type, fn) {
	if (obj.addEventListener) {
		obj.addEventListener(type, fn, false);
	} else {
		if(!obj.events)obj.events={};	// 创建一个MAP
		
		if(!obj.events[type])obj.events[type]=[];	// 创建一个存储方法的数组
		
		if(!obj['on'+type])obj.events[type][0]=fn;	// 判断是否为第一次添加
		else if(!addEvent.equals(obj.events[type],fn))	// 判断如果没有该方法才添加
			obj.events[type][addEvent.ID++]=fn;	
		
		obj['on' +type]=addEvent.exec;
	}
}
addEvent.ID=1;	// 注册一个ID初始值


addEvent.exec=function(evt){	
	// 将保留的函数运行
	var e=evt||addEvent.fixEvent(window.event);
	var es = this.events[e.type];
	for (var i in es) {
		es[i].call(this, e);
	}
};

addEvent.fixEvent=function(evt){
	evt.preventDefault=addEvent.fixEvent.preventDefault;
	evt.stopPropagetion=addEvent.fixEvent.stopPropagetion;
	evt.target = evt.srcElement;
	return evt;
};
addEvent.fixEvent.preventDefault=function(){	// 关联W3C取消默认行为
	this.returnValue=false;
};
addEvent.fixEvent.stopPropagetion=function(){// 关联W3C取消冒泡
	this.cancelBubble=false;
};


addEvent.equals=function(es,fn){	// 比较方法是否重复
	for(var i in es){
		if(es[i]==fn)return true;
	}
	return false;
};
function removeEvent(obj, type, fn) {// 跨浏览器移除事件
	if (obj.removeEventListener){
		obj.removeEventListener(type, fn, false);
	}else {
		for ( var i in obj.events[type]) {
			if(obj.events[type][i]==fn)
				delete obj.events[type][i];
		}
	}
}

function getEvtObj(evt) {// 获取调用事件对象
	var e=getEvent(evt);
	if (e.target)
		return e.target;
	else
		return e.srcElement;
}
// ----------------------------获取可视---------------------------
function viewInner() {
	this.height= (typeof window.innerHeight != 'undefined') ? innerHeight
			: document.documentElement.clientHeight;
	this.width= (typeof window.innerWidth != 'undefined') ? innerWidth
			: document.documentElement.clientWidth;
	return this;
}
// 跨浏览器获取滚动条位置
function getScroll() {
	return {
		top : document.documentElement.scrollTop || document.body.scrollTop,
		left : document.documentElement.scrollLeft || document.body.scrollLeft,
		height:document.documentElement.scrollHeight || document.body.scrollHeight,
		width:document.documentElement.width || document.body.width
	};
}
// 跨浏览器获取innerText
function getInnerText(element) {
	return (typeof element.textContent == 'string') ? element.textContent : element.innerText;
}
// 跨浏览器设置innerText
function setInnerText(elememt, text) {
	if (typeof element.textContent == 'string') {
		element.textContent = text;
	} else {
		element.innerText = text;
	}
}
// ---------------------------获取Style---------------------------
function getStyle(element,key){
	if (typeof window.getComputedStyle != 'undefined') {
		return window.getComputedStyle(element, null)[key];
	} else if (typeof element.currentStyle != 'undefined') {
		return element.currentStyle[key];
	}
	return "undefined";
}
// 跨浏览器获取EVENT
function getEvent(event){
	return event||window.event;
}
// 取消默认行为
function stopEvent(event){
	var e=getEvent(event);
	if(e.preventDefault)
		e.preventDefault();
	else{
		e.returnValue=false;
	}
	return e;
}
// 取非空白内容
String.prototype.isEmpty=function (){
	return this.replace(new RegExp("^\\s*|\\s*$","igm"),"");
};
String.prototype.myEndsWith=function (str){
	return this.replace(new RegExp(str+"$","igm"),"");
};
String.prototype.myFristWith=function (str){
	return this.replace(new RegExp("^"+str,"igm"),"");
};
// unicode转换
var toUN = {
	    on: function(str) {
	        var a = [],
	        i = 0;
	        for (; i < str.length;) a[i] = ("00" + str.charCodeAt(i++).toString(16)).slice( - 4);
	        return "\\u" + a.join("\\u");
	    },
	    un: function(str) {
	        return unescape(str.replace(/\\/g, "%"));
	    }
	};
// #unicode转换
var toHTML = {
on: function(str) {
    var a = [],
    i = 0;
    for (; i < str.length;) a[i] = str.charCodeAt(i++);
    return "&#" + a.join(";&#") + ";";
},
un: function(str) {
    return str.replace(/&#(x)?([^&]{1,5});?/g,
    function(a, b, c) {
        return String.fromCharCode(parseInt(c, b ? 16 : 10));
    });
}
};

