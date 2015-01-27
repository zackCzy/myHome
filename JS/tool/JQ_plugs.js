/**
 * @author zack;
 */

(function($,w){
	$.fn.extend({//为元素添加抖动动画 fn执行后执行函数
		shake:function(fn){
				var position,$this;
				var data={};
				var _that=this;
				$(this).each(function(i){
					$this=$(this);
					position=$this.css("position");
					if(position=="absolute"||position=="fixed"||position=="relative"){
						data.top=parseInt($this.css("top"));
						data.left=parseInt($this.css("left"));
						data.attr="position";
					}else{
						data.top = parseInt($this.css("margin-top"));
						data.left = parseInt($this.css("margin-left"));
						data.attr="margin";
					}
					$.shakeF.call(_that,this,data,fn);			
				});
				return this;
		},
		move:function(activeE){
			$(this).each(function(i){
				$.clickMove.call(this,this,activeE);
			});
			return this;
		},
		setCenter:function () {//设置元素居中
			var view=$.getViewInner();
			var scroll=$.getScroll();
			var scrollTop=scroll.top;
			var scrollLeft=scroll.left;
			var height=view.height;
			var width=view.width;
			var ht,wt;
			$(this).each(function(){
				ht = this.offsetHeight == 0 ? $(this).height() : this.offsetHeight;
				wt = this.offsetWidth == 0 ? $(this).width() : this.offsetWidth;
				this.style['top']  =((height- ht) / 2 < 0 ? 0 : (height- ht) / 2)+scrollTop+'px';
				this.style['left']  =((width  -wt) / 2 < 0 ? 0: (width-wt) / 2)+scrollLeft+'px';	
			});
			return this;
		},
		setFullScreen:function(){//元素填满整个窗口
			var view=$.getViewInner();
			var scroll=$.getScroll();
			var scrollTop=scroll.top;
			var scrollLeft=scroll.left;
			var height=view.height;
			var width=view.width;
			$(this).each(function(){
				$(this).css({
					'height' : (height+scrollTop),
					'width' : (width +scrollLeft)
				});	
			});
			return this;
		},
		lock:function(aopacity,time,fn) {//创建锁屏元素
			var _doc=document;
			var _time=time;
			var _that=this;
			var $this;		
			if(_time==null)_time=300;
			$(this).each(function(){
				$this=$(this);
				this.overflow=_doc.documentElement.style.overflow||_doc.body.style.overflow;
				this.lockTime=time;
				_doc.documentElement.scrollTop ? _doc.documentElement.style.overflow="hidden" : _doc.body.style.overflow="hidden"; 
				$this.setFullScreen().css({
					"display":"block",
					"position":"fixed",
					"top":"0",
					"left":"0"
				});
				$this.stop(true).animate({
					"opacity":(aopacity==null ? 0.6:aopacity)
				},_time,function(){
					if(typeof fn==Function)
						fn.call(_that);
				});
			});
			$(window).resize(function(){
					$(_that).setFullScreen();
			});
			return this;
		},
		unlock:function(fn){//解除锁屏元素
			var _doc=document;
			var _that=this;
			var _this,$this;
			$(this).each(function(){
				_this=this;
				$this=$(this);				
				_doc.documentElement.scrollTop ? _doc.documentElement.style.overflow=_this.overflow : _doc.body.style.overflow=_this.overflow; 
				$this.stop(true).animate({
					opacity:0
				},_that.lockTime,function(){
					$this.css("display","none");
					if(typeof fn==Function)
						fn.call(_that);
				});
			});
			return this;
		},
		tabEvent:function(){
			var args=arguments;
			$(this).each(function(){
				(function (element,arg){
					var eventNum=0;
					$(element).click(function(evt){
						arg[eventNum++%arg.length].call(this,evt);		 
					});}
				)(this, args);
			});
			return this;
		},
		/**
		 * <pre>创建标签</pre>
		 * @param nodeName  欲创建的标签类型 
		 * @param first 		创建起始数
		 * @param num			添加数目
		 * @param fn     	    创建中操作标签函数(op,int)
		 * */
		createNodes:function(nodeName,first,num,fn){
			first=parseInt(first)>0? first:0;
			num=num<=0? first:first+num;
			$(this).each(function(){
				$.myCreateNode(this,nodeName,first,num,fn);
			});
		},
		/**
		 * <pre>删除标签</pre>
		 * @param postion 		删除位置
		 * @param num			    删除数目
		 * @param fn     	    	删除回调函数(node)
		 * */
		removeNodes:function(postion,num,fn){
			postion=postion+1;		
			num=num<=0? postion:postion+num;
			$(this).each(function(){
				$.myRemoveNode(this,postion,num,fn);
			});
		},
		className:function(className){
			$(this).each(function(){
				this.className=className;
			});
		}
	});
	$.extend({
		myRemoveNode:function (parentNode,postion,num,fn){
			for ( var int = postion; int <num; int++) {		
				 if(typeof  fn=='function') {
					 var node=parentNode.children[postion];
					 fn(node);
				}	
				 parentNode.removeChild(parentNode.children[postion]);
			}	
		},
		/**
		 * <pre>创建标签</pre>
		 * @param parentNode 欲加入标签的父标签
		 * @param nodeName  欲创建的标签类型 
		 * @param first 		创建起始数
		 * @param num			添加数目
		 * @param fn     	    创建中操作标签函数(op,int)
		 * */
		myCreateNode:function (parentNode,nodeName,first,num,fn){	
			for ( var int =first ; int <=num; int++) {
				 var op=document.createElement(nodeName);
				 if(typeof  fn=='function'){
					 fn(op,int);
				 }
				 parentNode.appendChild(op);
			}
		},
		/**
		 * <pre>提示框</pre>
		 * @param paramObj 
		 * {
		 * 		title		type:String   
		 * 		body 	type:String   
		 * 		time		type:int	
		 * 		id			type:int
		 * 		bt			type:Object  {
		 * 											okVal  type:String,
		 * 											noVal  type:String,
		 * 											okFn	  type:Function,
		 * 											noFn   type:Function
		 * 										}
		 * }	  
		 * */
		texi:function(paramObj){
			var texi=new Texi(paramObj.title,paramObj.body,paramObj.time,paramObj.id,paramObj.bt);
			texi.init();
			texi.show();
		},
		Rollchart:function(){
		  	return new Rollchart();
		},
		clickMove:function (element, activeE) {
			if (!activeE)
				activeE = element;
			var $activeE=$(activeE);
			var $d=$(document);
			var _element=element;
			var _that=this;
			var positionCss=$(_element).css("position");
			$activeE.on('mousedown', function(evt){
				click.call(_that,evt,_element);
			});
			function click(e,_element) {
				// 保存点击时坐标
				var diffY = e.clientY - _element.offsetTop;
				var diffX = e.clientX - _element.offsetLeft;
				var view=$.getViewInner();
				var scroll=$.getScroll();
				var innerWidth=view.width;
				var innerHeight=view.height;
				var scrollTop=positionCss=="fixed" ? 0 : scroll.top;
				var scrollHeight=scrollTop+innerHeight;
				var scrollLeft=positionCss=="fixed" ? 0:scroll.left;
				var scrollWidth=scrollLeft+innerWidth;
				function stop() {// 松开按键 停止默认行为
					$d.off('mousemove', move);
					$d.off('mouseup', stop);
					if (typeof _element.releaseCapture != 'undefined') {
						_element.releaseCapture();
					}
				}
				function move(e) { // 鼠标移动
					var top = e.clientY - diffY;
					var left = e.clientX - diffX;
					if (left < scrollLeft)
						left = scrollLeft;
					else if (left > scrollWidth - _element.offsetWidth)
						left =scrollWidth - _element.offsetWidth;
					if (top < scrollTop)
						top = scrollTop;
					else if (top > scrollHeight - _element.offsetHeight)
						top = scrollHeight - _element.offsetHeight;
					_element.style['left'] = left + "px";
					_element.style['top'] = top + "px";
					if (typeof _element.setCapture != 'undefined') {
						_element.setCapture();
					} 
				}
				$d.on('mousemove', move);
				$d.on('mouseup', stop);
			}
		},
		shakeF:function (element,data,fn) {	
			var action =['top','left'];
			var postion = 0;
			var _that=this;
			var atype,index,temp;
			if(element.shakeTime!=undefined){
				return false;
			}
			element.shakeTime = setInterval(function() {
				var atype=action[postion % 2];
				var index=(postion++) %4<2==0 ? parseInt(data[atype])+"px" : parseInt(data[atype])+4+"px";
				atype={};
				var temp=data.attr!="position" ? (postion % 2 ==0? "margin-top":"margin-left"):(postion % 2 ==0? "left":"top");
				atype[temp]=index;
				$(element).css(atype);
				if (postion > 25) {
					clearInterval(element.shakeTime);
					$(element).css((data.attr!="position" ? {"margin-top":"-=4","margin-left":"-=4"}:{"top":"-=4","left":"-=4"}));
					element.shakeTime=null;
					if(typeof fn=="function"){
						fn.call(_that);
					}
				}
			}, 32);
		},
		getViewInner:function () {
			this.height= (typeof window.innerHeight != 'undefined') ? innerHeight
					: document.documentElement.clientHeight;
			this.width= (typeof window.innerWidth != 'undefined') ? innerWidth
					: document.documentElement.clientWidth;
			return this;
		},
		getScroll:function () {
			return {
				top : document.documentElement.scrollTop || document.body.scrollTop,
				left : document.documentElement.scrollLeft || document.body.scrollLeft,
				height:document.documentElement.scrollHeight || document.body.scrollHeight,
				width:document.documentElement.width || document.body.width
			};
		},
		notice:function(title, content, time,fn){
			var notice=new Notice();
			notice.show(title, content, time,fn);
		},
		cookie: function(name, value, options) {  
		     if (typeof value != 'undefined') {          
		          options = options || {};          
		          if (value === null) {              
		              value = '';              
		              options = $.extend({}, options);              
		              options.expires = -1;          
		          }          
		          var expires = '';          
		          if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)){              
		        	  var date;              
			          if (typeof options.expires == 'number') {                  
			        	  date = new Date();                  
			        	  date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));              
			          } else {                  
			        	  date = options.expires;              
			          }              
			          expires = '; expires=' + date.toUTCString();          
		          }          
		          var path = options.path ? '; path=' + (options.path) : '';          
		          var domain = options.domain ? '; domain=' + (options.domain) : '';          
		          var secure = options.secure ? '; secure' : '';         
		          document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');      
	          } else {          
		          var cookieValue = null;          
		          if (document.cookie && document.cookie != '') {              
			          var cookies = document.cookie.split(';');              
			          for (var i = 0; i < cookies.length; i++) {                  
				          var cookie = jQuery.trim(cookies[i]);                 
				          if (cookie.substring(0, name.length + 1) == (name + '=')) {                      
					          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));                      
					          break;                  
				          }              
			          }          
		          }          
		       return cookieValue;    
		    }
		},
		getCookie:function (name)
		{
		    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)"); 
		    if(arr=document.cookie.match(reg)){
		        return decodeURIComponent(arr[2]);
		    }else
		        return null;
		},
		getCookies:function (key)
		{
			var getCookie = document.cookie.replace(/[ ]/g,"");
			var arrCookie = getCookie.split(";"); 
			var reArr=[];
			var index=0;
			var arr;
	        for(var i=0;i<arrCookie.length;i++){
	            arr=arrCookie[i].split("="); 
	            if(arr[0].indexOf(key)!=-1){
	            	reArr[index++]=decodeURIComponent(arr[1]);
	            }
	        }
			return reArr;
		},
		removeCookie:function(name,path){
			var exp = new Date(1970,1,1);
		    var cval=$.getCookie(name);
		    if(cval!=undefined){
		    	$.cookie(name,cval, {expires: exp.toGMTString(),"path":path}); 
		    	return true;
		    }else{
		    	return false;
		    }
		}
	});
})(jQuery,window);
