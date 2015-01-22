<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<script type="text/javascript" src="${pageContext.request.contextPath}/JS/tool/JQ_Scroll_Plub.js"></script>
<style type="text/css">
.music {
	float: right;
	width: 50px;
	height: 50px;
	position: relative;
	z-index: 10;
	font-family: "微软雅黑", "华文细黑", "黑体", arial;
	font-size: 13px;
	font-style: normal;
	margin: 0px 30px 0 0;
	-moz-user-select: -moz-none;
	border-right:1px solid #74797E;
	border-left:1px solid #74797E;
	border-bottom:4px solid #E1E1E1;
	background: #48525E;
}

.music strong {
	height: 55px;
	display: block;
	text-align: center;
	cursor: pointer;
	line-height: 50px;
	color: #fcfcfc;
	font-size:25px;
	
}
.music:hover{
	border-bottom:4px solid #DC3C00;
}
.music:hover strong {
	color: #9ED034;	
}

.music span,.music a,.music b {
	height: 20px;
	line-height: 20px;
	margin: 0;
}
.musicDisplay {
	position: absolute;
	width: 300px;
	height: 0px;
	background: url("/myHome/image/trans.png");
	left: -170px;
	top: -150px;
	box-shadow: 4px 3px 2px rgba(0, 0, 0, 0.03), 3px 2px 1px
		rgba(0, 0, 0, 0.4);
	overflow: hidden;
	z-index: 1;
	border: 1px solid #1B1E23;
	border-radius: 0 0 10px 10px;
}
.playList {
	width: 280px;
	margin: 3px auto;
}

.playList a,.playList b {
	float: right;
	color: #5CAAE6;
}

.playList a:LINK {
	float: right;
	color: #5CAAE6;
}
#head_play_List {
	float: left;
	width: 277px;
	height:270px;
	list-style: none;
	cursor: pointer;
	text-indent: 1em;
	color: #FBFBFB;
	scrollbar-arrow-color: #A9C50B;
	scrollbar-base-color: #A9C50B;
	scrollbar-dark-shadow-color: #A9C50B;
	scrollbar-face-color: #A9C50B;
	position: absolute;
	top: 0;
	left: 6px;
}

#head_list_display {
	width: 290px;
	margin: 10px 0 0 4px;
	overflow: hidden;
	height: 270px;
	position: relative;
}

#head_play_List li {
	width: 260px;
	height: 30px;
	margin: 4px 0;
	border-bottom: 1px dashed #474747;
	line-height: 30px;
	text-align: left;
	padding: 0;
}

#head_play_List li:hover {
	background: #5CAAE6;
}

</style>
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
		</div>
	</div>
</div>
<script type="text/javascript">
	function musicBox() {return <s:property value="#user.id"/>;}	
	function createMusicBox(json) {
		var li;
		var ul = document.getElementById("head_play_List");
		for ( var int = 0; int < json.length; int++) {
			li = document.createElement("li");
			li.innerHTML = json[int]['song'];
			li.setAttribute("alt", int);
			ul.appendChild(li);
		}
		$(ul).addScroll();
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
	}).on("mouseleave",function() {
		$('.musicDisplay').stop(true).animate({
				height: 0
			},500,function(){
				 $(this).css({top:"-150px"});
		});
	});

</script>