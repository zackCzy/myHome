/**
 * @author zack
 */
$.fn.extend({
	mousewheel:function(fn){
		$(this).each(function(i){
			if(navigator.userAgent.indexOf("MSIE")>0||navigator.userAgent.indexOf("Chrome")>0){
				this.onmousewheel = scrollF;
			}
			else{
				this.addEventListener("DOMMouseScroll",scrollF ,false);
			}
		});	
	}
});
$.fn.extend({
	/**
	 * <pre>获取当前节点第一个节点</pre>
	 * @param css  type:Object  设置滚动条css对象
	 * */
	addScroll:function (css){
		//设置滚动条样式 CSS滚动条 barCSS 滚动块
		if(css==null||!jQuery.isPlainObject(css)){
			css={
					background: "url('/myHome/image/trans.png') repeat scroll 0 0 rgba(0, 0, 0, 0)",
			    	right: 0,
			    	width: "10px"
				};
		}
		css.position="absolute";
		css.top="0px";
		css["-moz-user-select"]="none";
		css["z-index"]=9999999;
		css["border-radius"]= "25px";
		css["margin"]= "0";
		css["border"]= "0 none";
		css["padding"]= "0";
		var barCss={
			background:"none repeat scroll 0 0 #ccc",
		    "border-radius": "25px",
		    "cursor": "pointer",
		    display: "block",
		    opacity: "0.9",
		    position: "absolute",
		    top: 0,
		    width: "100%",
		    right:0,
		    height:"50px",
		    margin: "0",
			border:"0 none",
			padding:"0"
		};	
		//遍历添加滚动条
		$(this).each(function(i){
			var scroll=document.createElement("div");
			var bar=document.createElement("span");
			var clientHeight=parseInt($(this).css("height"));
			barCss["height"]=Math.min((clientHeight*clientHeight)/ this.scrollHeight)+"px";
			$(bar).css(barCss).appendTo(scroll).on( 'mousedown', scrollClick);	
			css["height"]=$(this).css("height");
			$(scroll).css(css).append(bar).appendTo(this).css({
				"height":clientHeight
			});
			$(this).css({
				"position":"relative",
				"overflow": "hidden"
			}).hover(function() {//阻止放行document滚动条默认行为
				if(navigator.userAgent.indexOf("MSIE")>0||navigator.userAgent.indexOf("Chrome")>0){
					document.onmousewheel = function(){return false;};
				}
				else{
					document.addEventListener("DOMMouseScroll",stopEvent ,false);
				}
			}, function() {
				if(navigator.userAgent.indexOf("MSIE")>0||navigator.userAgent.indexOf("Chrome")>0){
					document.onmousewheel = function(){return true;};
				 }
				 else{
					 document.removeEventListener("DOMMouseScroll",stopEvent ,false);
				}
			}).mousewheel(scrollF).scrollTop(22);
		});
	}
});
//鼠标点击移动
function scrollClick(e) {
	var that = this;
	var diffY = e.clientY - this.offsetTop;
	var scrollBarHeight=parseInt($(this.parentNode).css("height"));
	var body=$(this.parentNode.parentNode);
	var clientHeightM = parseInt(body.css("height"));
	
	function stop() {
		$(that).off( 'mousemove', move);
		$(that).off( 'mouseup', stop);
		if (typeof that.releaseCapture != 'undefined') {
			that.releaseCapture();
		}
	}
	function move(e) {
		var top = e.clientY - diffY;
		if (top < 0)
			top = 0;
		else if (top > scrollBarHeight - that.offsetHeight)
			top = scrollBarHeight - that.offsetHeight;
		that.style['top'] = top + "px";
		var fullBody=body.get(0);
		var temp=(top*clientHeightM/ scrollBarHeight)*(fullBody.scrollHeight/scrollBarHeight)+5;
		$(this.parentNode.parentNode).scrollTop(temp);
		this.parentNode.style.top=temp+"px";
		if (typeof that.setCapture != 'undefined') {
			that.setCapture();
		}
	}
	$(that).on( 'mousemove', move);
	$(that).on( 'mouseup', stop);
}
//滚轮事件
function scrollF(evt){
	var that=$($(this).last().get(0).getElementsByTagName("span")[0]);
	var scrollBarHeight=parseInt($(this).last().css("height"));
	var body=$(this);
	var clientHeightM = parseInt(body.css("height"));
	var top=parseInt(that.css("top"))+(-(evt.wheelDelta/40)*3||evt.detail*3);
	var height=parseInt(that.get(0).offsetHeight);
	if (top < 0)
		top = 0;
	else if (top > clientHeightM -height){
		top = clientHeightM -height+2;
	}
	that.css({'top' :top+"px"});
	var fullBody=body.get(0);
	var temp=(top*clientHeightM/ scrollBarHeight)*(fullBody.scrollHeight/scrollBarHeight);
	$(this).scrollTop(temp);
	this.children[this.children.length-1].style.top=temp+"px";
}


function stopEvent(event){
	var e=event||window.event;
	if(e.preventDefault)
		e.preventDefault();
	else{
		e.returnValue=false;
	}
	return e;
}