/**
 * @author zack
 */

(function($,window){
	$.fn.extend({
		/**
		 * <pre>为JQ添加滚轮事件</pre>
		 * @param fn  type:Function   事件激活函数
		 * */
		mousewheel: function(fn) {
			$(this).each(function(i) {
				if (navigator.userAgent.indexOf("MSIE") > 0 || navigator.userAgent.indexOf("Chrome") > 0)
					this.onmousewheel = fn;
				else
					this.addEventListener("DOMMouseScroll", fn, false);
			});
		},
		/**
		 * <pre>为元素添加滚动条</pre>
		 * @param {Object,Object,int}
		 * @param {int}  设置滚动条类型
		 * */
		addScroll: function(css, barcss, type) {
			var scroll=new Scroll(css,barcss,type,this);
			scroll.init();
			return this;
		},
		removeScroll:function(css, barcss, type) {
			var scroll=new Scroll(css,barcss,type,this);
			scroll.removeScroll();
			return this;
		}
	});
})(jQuery,window);

//创建命名空间
(function(){
	var SCROLL_STYLE,BAR_STYLE,THAT_STYLE,scrollClick,scrollF,stopEvent,getWrapStyle;
	Scroll=Scrolls;
	function Scrolls(css, barcss, type,JqDom){
		this.Version = 'version-1.0.0';	//插件版本号
		this.myConstructor(css, barcss, type,JqDom);//初始构造函数
		return this;//显性返回构造对象
	}
	Scroll.prototype={
		staticInit:function(){//静态初始化块
			SCROLL_STYLE = {
				"-moz-user-select": "none",
				"-webkit-user-select": "none",
				"-0-user-select": "none",
				"-ms-user-select": "none",
				"user-select": "none",
				"right": 0,
				"top": "0px",
				"margin": 0,
				"border": "0 none",
				"padding": 0,
				"z-index": 2,
				"position": "absolute"
			};
			BAR_STYLE = {
				position: "absolute",
				top: 0,
				width: "100%",
				right: 0,
				margin: "0",
				border: "0 none",
				padding: "0",
				"cursor": "pointer",
				display: "block"
			};
			THAT_STYLE = {
				margin: 0,
				border: 0,
				top: 0,
				left: 0,
				bottom: 0,
				right: 0,
				position: "static",
				overflow: "hidden",
				"z-index": 1,
				float: "none"
			};
			scrollClick= function (e) {
				var that = this;
				var diffY = e.clientY - this.offsetTop;
				var scrollBarHeight = $(this.parentNode).innerHeight();
				var body = $(this.parentNode).prev();
				var clientHeightM = $(body).innerHeight();
				var barHeight = that.offsetHeight;
				var fullBody = body.get(0);
				$(window).on("mousemove",stopEvent);
				function stop() {
					$(window).off("mousemove",stopEvent);
					$(that).off('mousemove', move);
					$(that).off('mouseup', stop);
					//防止IE拖出窗口
					if (typeof that.releaseCapture != 'undefined')
						that.releaseCapture();
				}
				function move(e) {
					var top = e.clientY - diffY;
					if (top < 0)
						top = 0;
					else if (top > scrollBarHeight - barHeight)
						top = scrollBarHeight - barHeight;
					that.style['top'] = top + "px";
					var temp = (top * clientHeightM / scrollBarHeight) * (fullBody.scrollHeight / scrollBarHeight) + 5;
					$(this.parentNode).prev().scrollTop(temp);
					if (typeof that.setCapture != 'undefined')
						that.setCapture();
				}
				$(that).on('mousemove', move);
				$(that).on('mouseup', stop);
			};
			scrollF=function (evt) {
				evt = stopEvent(evt);
				this.returnValue = false;
				var _body = $(":first", this);
				var that = $(_body.next().get(0).getElementsByTagName("span")[0]);
				var scrollBarHeight = _body.next().innerHeight();
				var clientHeightM = _body.innerHeight();
				var top = parseInt(that.css("top")) + (evt.wheelDelta ? -(evt.wheelDelta / 40) * 3 : evt.detail * 3);
				var height = parseInt(that.get(0).offsetHeight);
				if (top < 0)
					top = 0;
				else if (top > clientHeightM - height)
					top = clientHeightM - height;
				that.css({
					'top': top + "px"
				});
				var fullBody = _body.get(0);
				var temp = (top * clientHeightM / scrollBarHeight) * (fullBody.scrollHeight / scrollBarHeight);
				_body.scrollTop(temp);
			};
			stopEvent=function (event) {
				var e = event || window.event;
				if (e.preventDefault)
					e.preventDefault();
				else
					e.returnValue = false;
				return e;
			};
			getWrapStyle=function (obj,type) {
				var eml = $(obj);
				var vPosition=eml.css("position");
				if(vPosition=="static")vPosition="relative";
				
				var obj={
					"float": eml.css("float"),
					"position": vPosition ,
					"top": eml.css("top"),
					"left": eml.css("left"),
					"bottom": eml.css("bottom"),
					"right": eml.css("right"),
					"marginTop": eml.css("marginTop"),
					"marginLeft": eml.css("marginLeft"),
					"marginBottom": eml.css("marginBottom"),
					"marginRight": eml.css("marginRight"),
					"borderTop": eml.css("border-top-width") + " " + eml.css("border-top-style") + " " + eml.css("border-top-color"),
					"borderLeft": eml.css("border-left-width") + " " + eml.css("border-top-style") + " " + eml.css("border-left-color"),
					"borderBottom": eml.css("border-bottom-width") + " " + eml.css("border-top-style") + " " + eml.css("border-bottom-color"),
					"borderRight": eml.css("border-right-width") + " " + eml.css("border-top-style") + " " + eml.css("border-right-color")
				};
				if(type==1){
					obj.width=eml.width() + parseInt(eml.css("paddingLeft")) + parseInt(eml.css("paddingRight"));
					obj.height= eml.height() + parseInt(eml.css("paddingTop")) + parseInt(eml.css("paddingBottom"));
				}
				return obj;
			};
		}(),
		myConstructor:function(css, barcss, type,JqDom){ //构造函数 
			myJqDom=JqDom;
			scrollStyle = {};
			barCss = {};
			if(arguments.length == 1)type = css;
			switch (type){
				case 1:
					scrollStyle = {
						"width": "10px",
						"border-radius": "25px",
						"background": "rgba(0, 0, 0, 0.5)"
					};
					barCss = {
						background: "none repeat scroll 0 0 #ccc",
						"border-radius": "25px",
						opacity: "0.9"
					};
					break;
				case 2:
					scrollStyle = {
						"width": "10px",
						"border-radius": "25px",
						"background": "rgb(234, 0, 25)",
						opacity: "0.8"
					};
					barCss = {
						background: "rgb(24, 230, 25)",
						"border-radius": "25px",
						opacity: "0.9"
					};
					break;
				default:
					scrollStyle = {
						"width": "10px",
						"border-radius": "25px",
						"background": "rgb(0, 0, 0)",
						opacity: "0.5"
					};
					barCss = {
						background: "none repeat scroll 0 0 #ccc",
						"border-radius": "25px",
						opacity: "0.9"
					};
					break;
			}
			$.extend(true, scrollStyle, css, SCROLL_STYLE);
			$.extend(true, barCss, barcss, BAR_STYLE);
		},
		init:function(){
			var _that=this;
			var _doc = document;
			var idv,_scroll,_bar,_id,tempStyle,_clientHeight,_scrollHeight;
			$(myJqDom).each(function(i) {
				var $this = $(this);
				_clientHeight = $this.height() + parseInt($this.css("paddingTop")) + parseInt($this.css("paddingBottom"));
				_scrollHeight = this.scrollHeight;
				if (_clientHeight < _scrollHeight) {
					idv = _doc.createElement("div"),
					_scroll = _doc.createElement("div"),
					_bar = _doc.createElement("span"),
				    _id = ("zack" + new Date().getTime() + Math.random()).replace(".", ""),
					$this.attr("data-id",_id);
					tempStyle =getWrapStyle(this,1);
					idv.setAttribute("id",_id);
					//计算滚动块长度
					barCss["height"] = Math.floor((_clientHeight * _clientHeight) / _scrollHeight) + "px";
					scrollStyle["height"] = _clientHeight;
					//进行元素包裹
					$(this).css(THAT_STYLE).wrap(idv);
					//添加滚动条
					$(_scroll).css(scrollStyle).append(
						$(_bar).css(barCss).on('mousedown', scrollClick)
					).appendTo($("#" + _id));
					//阻止默认行为 添加滚轮事件
					$("#" + _id).css(tempStyle).hover(function() { //阻止放行document滚动条默认行为
						if (navigator.userAgent.indexOf("MSIE") > 0 || navigator.userAgent.indexOf("Chrome") > 0){
							window.onmousewheel=document.onmousewheel= function() {
								return false;
							};
						}else{
							document.addEventListener("DOMMouseScroll", stopEvent, false);
						}
					},function() {
						if (navigator.userAgent.indexOf("MSIE") > 0 || navigator.userAgent.indexOf("Chrome") > 0)
							window.onmousewheel=document.onmousewheel=function() {
								return true;
							}
						else
							document.removeEventListener("DOMMouseScroll", stopEvent, false);
					}).scrollTop(0).mousewheel(scrollF);
				}
			});
			idv=null,_scroll=null,_bar=null,_id=null,tempStyle=null;
		},
		removeScroll:function(){
			var $this=$(myJqDom);
			var _doc=document;
			var wrap,wrapStyle,temp;
			$this.each(function(i) {
				wrap=_doc.getElementById($this.attr("data-id"));
				wrapStyle=getWrapStyle(wrap,2);
				if($(wrap).children().length>=2){
					temp=$(wrap).children().get(1);
					temp.parentNode.removeChild(temp);
				}
				$(this).css(wrapStyle).unwrap();
			});
		}
	};
})();



