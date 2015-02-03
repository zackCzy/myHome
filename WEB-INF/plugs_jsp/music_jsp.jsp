<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<div class="music">
	<strong id="mini">M</strong>
	<div class="musicDisplay">
		<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
			codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0"
			width="300" height="155" id="Externa1">
			<param name="quality" value="high" />
			<param value="#FFFFFF" name="bgcolor">
			<param value="transparent" name="wmode">
			<param name="allowScriptAccess" value="always" />
			<param name="movie" value="/myHome/flash/MiniMusic.swf" />
			<param value="userName=zhangwan" name="flashvars">
			<embed src="/myHome/flash/MiniMusic.swf" quality="high"
				pluginspage="http://www.macromedia.com/go/getflashplayer"
				type="application/x-shockwave-flash" width="300" height="155"
				id="Externa" flashvars="userName=zhangwan">
			</embed>
		</object>
		<div class="playList">
			<span style="color: #fbfbfb; font-weight: bold; float: left;">
				[ 播放列表 ]</span>
			<s:if test="#authority==1">
				<a href="/myHome/user/user_spaceMusic">背景音乐</a><b
				style="margin: 0 1px;">┆</b><a href="">设置</a>
			</s:if>
		</div>
		<div style="clear: both"></div>
		<hr style="clear: both; width: 280px; margin: 8px auto 0;" />
		<div id="head_list_display">
			<ul id="head_play_List" onselectstart="return false";>
			</ul>
			<i id="scrollBar"> <i id="scrollBox"
				style="border-radius: 5px;cursor: pointer; height: 10px; width: 5px; float: left; background-color: #82C138;top: 0px; left: 0px; position: absolute;"></i>
			</i>
		</div>
	</div>
</div>
<script type="text/javascript">
	function stopScroll(event) {
		stopEvent(event);
	}
	function musicBox() {return <s:property value="#user.id"/>;}	
	$("#scrollBox").on("mousedown", click);
	function click(e) {
		var that = this;
		var diffY = e.clientY - this.offsetTop;
		function stop() {// 松开按键 停止默认行为
			removeEvent(document, 'mousemove', move);
			removeEvent(document, 'mouseup', stop);
			if (typeof that.releaseCapture != 'undefined') {
				that.releaseCapture();
			}
		}
		function move(e) { // 鼠标移动
			var top = e.clientY - diffY;
			// alert(top);
			if (top < 0)
				top = 0;
			else if (top > 260 - that.offsetHeight)
				top = 260 - that.offsetHeight;
	
			that.style['top'] = top + "px";
			$Base("#head_play_List")
			.css({'top' : -(top*	(document.getElementById("head_play_List").children.length*37+6)/ 270)+ "px"});	
			if (typeof that.setCapture != 'undefined') {
				that.setCapture();
			}
		}
		$(document).on('mousemove', move);
		$(document).on('mouseup', stop);
	}
	if(navigator.userAgent.indexOf("MSIE")>0||navigator.userAgent.indexOf("Chrome")>0)
		this.onmousewheel = scrollF;
	else
		this.addEventListener("DOMMouseScroll",scrollF ,false);

	function scrollF(event){
		var evt=window.event || event;
		var that=$("#scrollBox");
		var top=parseInt(that.css("top"))+(event.wheelDelta ?  -(event.wheelDelta/40)*3:event.detail*3);
		var height=that.get(0).offsetHeight;
		if (top < 0)
			top = 0;
		else if (top > 260 -height){
			top = 260 -height;
		}
		that.css({'top' :top+"px"});
		$("#head_play_List")
		.css({'top' : -(top*	(document.getElementById("head_play_List").children.length*37+6)/ 270)+ "px"});	
	}
	function createMusicBox(json) {
		var li;
		var ul = document.getElementById("head_play_List");
		for ( var int = 0; int < json.length; int++) {
			li = document.createElement("li");
			li.innerHTML = json[int]['song'];
			li.setAttribute("alt", int);
			ul.appendChild(li);
		}
		var height = document.getElementById("head_play_List").children.length*(37+6);
		if(height>270){
			$("#scrollBar").css({display:"block"});
		}
		$("#scrollBox").css({
			height :260* 260 / height + "px"
		});
	}
	$("#head_play_List").on(
		"click",
		function(evt) {
			var node = getEvtObj(evt);
			try {
				if (evt.nodeName = "LI") {
					document.getElementById("Externa").musicBox(
							node.getAttribute("alt"));
				}
			} catch (e) {
				if (evt.nodeName = "LI") {
					document.getElementById("Externa1").musicBox(
							node.getAttribute("alt"));
				}
			}
		});
	$('.music').on("mouseenter",function() {
		$('.musicDisplay').css({top:"60px"}).stop(true).animate({	
				height : 500
		},500);
		if(navigator.userAgent.indexOf("MSIE")>0||navigator.userAgent.indexOf("Chrome")>0){
			document.onmousewheel = function()
			{return false;};
		}
		else{document.addEventListener("DOMMouseScroll",stopScroll ,false);
		}
	}).on("mouseleave",function() {
		var temp = $('.musicDisplay').stop(true).animate({
				height: 0
			},function(){
				 temp.css({top:"-150px"});
				 if(navigator.userAgent.indexOf("MSIE")>0||navigator.userAgent.indexOf("Chrome")>0)
				 {document.onmousewheel = function(){return true;};}
				 else{document.removeEventListener("DOMMouseScroll",stopScroll ,false);}
			}
		);
	});

</script>