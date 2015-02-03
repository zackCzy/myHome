/**
 * @author zack
 */

function $Base(_this) {
	return new Base(_this);
}
function Base(_this,startElement) {
	this.element = [];
	this.flag = false;
	if (typeof _this == 'string') {
		if (_this.indexOf(" ") != -1) {
			this.getByClass(_this,startElement);
		} else {
			switch (_this.charAt(0)) {		
			case '#':
				this.getById(_this.substring(1));
				break;
			case '.':
				this.getClass(_this.substring(1));
				break;
			case '!':	
				this.form(_this.substring(1));
				break;
			default:
				this.getTagName(_this);
			}
		}
	}else if (_this)
		this.element[0] = _this;

	Base.prototype.addBase=function(base){
		var m= base.getBase().length;
		var temp= base.getBase();
		
		var j=this.element.length;
		var n= 0;
		for ( var i =0; i < base.getBase().length; i++) {
			this.element[j]=temp[i];
			j++;
		}
		return this;
	};
	Base.prototype.getBase=function(){
		return this.element;
	};
	// 提供插件接口
	Base.prototype.extend = function(name, fn) {
		if (typeof name == 'object') {
			for ( var i = 0; i < arguments[0].length; i++) {
				Base.prototype[name[i]] = fn[i];
			}
		} else {
			Base.prototype[name] = fn;
		}
	};
	Base.prototype.length = function() {
		return this.element.length;
	};
	// 从ID获取
	Base.prototype.getById = function(Id) {
		this.element.push(document.getElementById(Id));
		return this;
	};
	// 从标签名获取
	Base.prototype.getTagName = function(tag) {
		this.element = [];
		var tags = document.getElementsByTagName(tag);
		for ( var i = 0; i < tags.length; i++) {
			this.element.push(tags[i]);
		}
		return this;
	};
	Base.prototype.setAttribute=function(key,value){
		for ( var i = 0; i < this.element.length; i++) {
			this.element[i].setAttribute(key,value);
		}
	};
	Base.prototype.getAttribute=function(key,index){
		return this.element[index? index :0].getAttribute(key);
	};
	// 从属性Name获取
	Base.prototype.getName = function(tag, name) {
		this.element=[];
		var tags = document.getElementsByName(name);
		// 兼容IE方法
		if (tags.length == 0) {
			tags = document.getElementsByTagName(tag);
			for ( var i = 0; i < tags.length; i++) {
				if (tags[i].getAttribute("name") == name)
					this.element.push(tags[i]);
			}
		} else {
			this.element = tags;
		}
		return this;
	};
	// 从Class获取
	Base.prototype.getClass = function(className) {
		var temp = document.getElementsByTagName('*');
	    this.element = [];   
		for ( var i = 0; i <temp.length; i++) {
			if (temp[i].className == className){
				 this.element.push(temp[i]);
			}
		}
		return this;
	};
//	Base.prototype.className = function() {
//		return this.element[0].className;
//	};
	/**
	 * <pre>获取当前节点第一个节点</pre>
	 * @param _this  是否单独取出
	 * */
	Base.prototype.getFirst = function(_this) {
		return !_this? this : this.element[0];
	};
	/**
	 * <pre>获取当前节点最后一个节点</pre>
	 * @param _this  是否单独取出
	 * */
	Base.prototype.getLast = function(_this) {

		return !_this ? this : this.element[length - 1];
	};

	Base.prototype.index = function () {
		var children = this.element[0].parentNode.children;
		for (var i = 0; i < children.length; i ++) {
			if (this.element[0] == children[i]) return i;
		}
	};
	Base.prototype.appendChild=function(node){
		for (var i = 0; i < this.element.length; i ++) {
			this.element[i].appendChild(node);
		}
	};
	Base.prototype.insertBefore=function(newNode,oldNode){
		for (var i = 0; i < this.element.length; i ++) {
			this.element[i].insertBefore(newNode,oldNode);
		}
	};
	
	Base.prototype.cloneNode=function(type,index){
			return this.element[(index ? index :0)].cloneNode(type);			
	};
	/**
	 * <pre>通过牵引取出节点</pre>
	 * @param index 取出牵引
	 * @param _this  是否单独取出
	 * */
	Base.prototype.get = function(index, _this) {
		return !_this? this : this.element[index];
	};
	/**
	 * <pre>获取标签获取下一个同一个节点</pre>
	 * @param _this  是否单独取出
	 * */
	Base.prototype.getNext = function( _this) {
		for ( var i = 0; i < this.element.length; i++) {
			this.element[i]=this.element[i].nextSibling;
			if(this.element[i]==null)
				throw new Error("没有找到下一个同一节的节点");
			if(this.element[i].nodeType==3)
				this.getNext();
		}		
		return !_this? this : this.element;
	};
	/**
	 * <pre>获取上一个同一节点</pre>
	 * @param _this 是否返回找到的节点 Boolean
	 *    
	 * */
	Base.prototype.getPrevious = function(_this) {
		for ( var i = 0; i < this.element.length; i++) {
			this.element[i]=this.element[i].previousSibling;
			if(this.element[i]==null)
				throw new Error("没有找到上一个同一节的节点");
			if(this.element[i].nodeType==3)
				this.getPrevious();
		}		
		return !_this===true ? this : this.element;
	};
	/**
	 * <pre>获取父节点</pre>
	 * @param _this 是否返回找到的节点 Boolean
	 *    
	 * */
	Base.prototype.getParent = function( _this) {
		for ( var i = 0; i < this.element.length; i++) {
			this.element[i]=this.element[i].parentNode;
		}	
		return !_this===true ? this: this.element;
	};
	/**
	 * <pre>修改标签CSS属性</pre>
	 * @param key 1.如果为MAP对象 则设置CSS属性
	 * 						2.如果为String类型 获取CSS属性
	 *  
	 * */
	Base.prototype.css = function(key) {
		// 判断获取还是赋值
		for ( var i = 0; i < this.element.length; i++) {
			if (typeof key == 'string') {
				// 获取计算后的样式
				return getStyle(this.element[i], key);
			}
			for ( var n in key) {
				this.element[i].style[n] = key[n];
			}
		}
		return this;
	};
	/**
	 * <pre>设置响应事件</pre>
	 * @param type 事件类型
	 * @param fn  	 回调函数
	 * */
	Base.prototype.event = function(type, fn) {
		for ( var i = 0; i < this.element.length; i++) {
			addEvent(this.element[i], type, fn);
		}
		return this;
	};
	/**
	 * <pre>删除响应事件</pre>
	 * @param type 事件类型
	 * @param fn  	 回调函数
	 * */
	Base.prototype.removeEvent = function(type, fn) {
		for ( var i = 0; i < this.element.length; i++) {
			removeEvent(this.element[i], type, fn);
		}
		return this;
	};
	/**
	 * <pre>设置innerHTLM</pre>
	 * @param text  为空则获取，否则设置
	 * */
	Base.prototype.innerHTML = function(text) {
		// 判断获取还是赋值
		for ( var i = 0; i < this.element.length; i++) {
			if (arguments.length == 0) {
				return this.element[i].innerHTML.isEmpty();
			}
			this.element[i].innerHTML = text;
		}
		return this;
	};
	/**
	 * <pre>设置innerText</pre>
	 * @param text  为空则获取，否则设置
	 * */
	Base.prototype.innerText = function(text) {
		// 判断获取还是赋值
		for ( var i = 0; i < this.element.length; i++) {
			if (arguments.length == 0) {
				return getInnerText(this.element[i]);
			}
			setInnerText(this.element[i], text);
		}
		return this;
	};
	/**
	 * <pre>设置标签Class属性</pre>
	 * @param method  1加 2减 3换
	 * @param oldclass 欲被替换或删除的Class属性
	 * @param newclass 欲添加或替换的Class属性
	 * */
	Base.prototype.setClass = function(method, oldclass, newclass) {
		for ( var i = 0; i < this.element.length; i++) {
			if (method == 1)
				addClass(this.element[i], oldclass);
			else if (method == 2)
				removeClass(this.element[i], oldclass);
			else
				replaceClass(this.element[i], oldclass, newclass);
		}
		return this;
	};
	Base.prototype.className = function(name) {
		for ( var i = 0; i < this.element.length; i++) {
			if(name==null){
				return this.element[i].className;
			}
			 this.element[i].className=name;
		}
		return this;
	};
	/**
	 * <pre>设置标签悬浮离开事件</pre>
	 * @param over  悬浮函数
	 * @param out 离开函数
	 * */
	Base.prototype.hover = function(over, out) {
		this.event('mouseover', over);
		this.event('mouseout', out);
		return this;
	};
	/**
	 * <pre>设置标签获取丢失焦点事件</pre>
	 * @param focus    获取焦点函数
	 * @param blur 		 丢失焦点函数
	 * */
	Base.prototype.getLost=function(focus,blur){
		this.event('focus',focus);
		this.event('blur',blur);
		return this;
	};
	Base.prototype.getLength=function(focus,blur){
		return this.element.length;
	};
	Base.prototype.bind=function(type,fn){
		for ( var i = 0; i < this.element.length; i++) {
			addEvent(this.element[i], type, fn);
		}	
	};
	/**
	 * <pre>设置标签多个事件交替响应</pre>
	 * @param arguments 默认为空 可传递多个函数 自动交替
	 * */
	Base.prototype.tabEvent=function(){	
		for ( var i = 0; i <this.element.length; i++) {
			(function (element,arg){
				var eventNum=0;
				addEvent(element,"click",function(evt){
					arg[eventNum++%arg.length].call(this,evt);		 
				});}
				)(this.element[i], arguments);
		}
		return this;
	};
		
	/**
	 * <pre>设置标签隐藏</pre>
	 * @param flag 是否将高度设置为0
	 * */
	Base.prototype.hide = function(flag) {
		return this.css(flag===true ? {
			'display' : 'none',
			"height" : "0px"
		} : {
			'display' : 'none'
		});
	};
	/**
	 * <pre>设置标签显示</pre>
	 * @param att 希望显示后的display 样式
	 * */
	Base.prototype.show = function(att) {
		return this.css({
			'display' : ((!att) ? 'block' : att)
		});
	};
	/**
	 * <pre>清空标签value值</pre>
	 * */
	Base.prototype.empty=function(){
		for ( var i = 0; i < this.element.length; i++) {
			this.element[i].value="";
		}
		return this;
	};
	Base.prototype.form=function(name){
		this.element=document.forms[name];
		return this;
	};
	Base.prototype.forms=function(name){
		for ( var i = 0; i < this.element.length; i++) {
			this.element[i]=this.element[i][name];
		}
		return this;
	};
	Base.prototype.value=function(value){
		for ( var i = 0; i < this.element.length; i++) {
			if(!value)return this.element[i].value;
			this.element[i].value=value;
		}
		return this;
	};
	Base.prototype.attr=function(name,value){
		for ( var i = 0; i < this.element.length; i++) {
			if(!value)return this.element[i].getAttribute(name);
			this.element[i].setAttribute(name,value);
		}
		return this;
	};
	Base.prototype.offsetTop=function(){
		var top=this.element[0].offsetTop;
		var parent=this.element[0].offsetParent;
		while(parent){
			top+=this.parent.offsetTop;
			parent=parent.offsetParent;
		}
		return top;
	};
	// ---------------------不完善应该自己创建一个div元素---------------------------------------
	/**
	 * <pre>设置窗口屏蔽</pre>
	 * */
	Base.prototype.lock = function() {
		this.css({
			'height' : viewInner().height +getScroll().top+ 'px'
		});
		this.css({
			'width' : viewInner().width + getScroll().left+ 'px'
		});
		document.documentElement.scrollTop ? document.documentElement.style.overflow="hidden" : document.body.style.overflow="hidden"; 
		this.show();
		return this;
	};
	Base.prototype.opacity=function(value){
		for ( var i = 0; i < this.element.length; i++) {
			this.css({			
				opacity:value/100,
				filter:"alpha(opacity="+value+")"
			});
		}
	};
	/**
	 * <pre>取消窗口屏蔽</pre>
	 * */
	Base.prototype.unlock = function() {
		this.hide();
		document.documentElement.scrollTop ? document.documentElement.style.overflow="auto" : document.body.style.overflow="auto"; 
		return this;
	};	
	/**
	 * <pre>旋转元素</pre>
	 * @param angle:为旋转角度 正值为顺时针 负值为逆时针
	 * */
	Base.prototype.rotate=function(angle){
		for ( var i = 0; i < this.element.length; i++) {
			this.element[i].style.webkitTransform="rotate("+angle+"deg)";;
			this.element[i].style.MozTransform="rotate("+angle+"deg)";
			this.element[i].style.msTransform="rotate("+angle+"deg)";
			this.element[i].style.OTransform="rotate("+angle+"deg)";
			this.element[i].style.transform="rotate("+angle+"deg)";
		}
	};
	Base.prototype.setCenter=function(){
		for ( var i = 0; i < this.element.length; i++) {
				getCenter( this.element[i]);
		}
		return this;
	};
	/**
	 * <pre>创建标签</pre>
	 * @param nodeName  欲创建的标签类型 
	 * @param first 		创建起始数
	 * @param num			添加数目
	 * @param fn     	    创建中操作标签函数(op,int)
	 * */
	Base.prototype.myCreateNode=function(nodeName,first,num,fn){
		first=parseInt(first)>0? first:0;
		num=num<=0? first:first+num;
		for ( var i = 0; i < this.element.length; i++) {
			myCreateNode(this.element[i],nodeName,first,num,fn);
		}
	};
	/**
	 * <pre>清除标签</pre>
	 * @param type   清除的事件 
	 * @param fn 		清除的方法
	 * */
	Base.prototype.remove=function(type,fn){
		for ( var i = 0; i < this.element.length; i++) {
				if(type!=null&&typeof fn=="function"){
					removeEvent(this.element[i],type,fn);
				}
				this.element[i].parentNode.removeChild(this.element[i]);
		}
		return this;
	};
	Base.prototype.removeAll=function(){
		
		for ( var i = 0; i < this.element.length; i++) {
			var n=this.element[i].children.length;
			for ( var ii = 0; ii <n; ii++) {
				this.element[i].removeChild(this.element[i].children[0]);
			}
		}
		return this;
	};
	/**
	 * <pre>删除标签</pre>
	 * @param postion 		删除位置
	 * @param num			    删除数目
	 * @param fn     	    	删除回调函数(node)
	 * */
	Base.prototype.myRemoveNode=function(postion,num,fn){
		postion=postion+1;		
		num=num<=0? postion:postion+num;	
		for ( var i = 0; i < this.element.length; i++) {
			myRemoveNode( this.element[i],postion,num,fn);
		}
	};
}
function lockScroll(evt) {
	document.documentElement.scrollTop = 0;
	document.body.scrollTop = 0;
}

// 删除CSS
function removeClass(element, clname) {
	if (element.className.match(new RegExp('(\\s|^)' + clname + '(\\s|$)')))
		element.className = element.className.replace(new RegExp('(\\s|^)'
				+ clname + '(\\s|$)'), " ");
}
// 添加CSS
function addClass(element, clname) {
	if (!element.className.match(new RegExp('(\\s|^)' + clname + '(\\s|$)')))
		element.className += " " + clname;
}
// 替换CSS
function replaceClass(element, oldcss, newcss) {
	removeClass(element, oldcss);
	addClass(element, newcss);
}
/**
 * <pre>创建标签</pre>
 * @param parentNode 欲加入标签的父标签
 * @param nodeName  欲创建的标签类型 
 * @param first 		创建起始数
 * @param num			添加数目
 * @param fn     	    创建中操作标签函数(op,int)
 * */
function myCreateNode(parentNode,nodeName,first,num,fn){	
	for ( var int =first ; int <=num; int++) {
		 var op=document.createElement(nodeName);
		 if(typeof  fn=='function'){
			 fn(op,int);
		 }
		 parentNode.appendChild(op);
	}
}
function myRemoveNode(parentNode,postion,num,fn){
	for ( var int = postion; int <num; int++) {		
		 if(typeof  fn=='function') {
			 var node=parentNode.children[postion];
			 fn(node);
		}	
		 parentNode.removeChild(parentNode.children[postion]);
	}	
}
String.prototype.isEmpty=function (){
	return this.replace(new RegExp("^\\s*|\\s*$","igm"),"");
};
