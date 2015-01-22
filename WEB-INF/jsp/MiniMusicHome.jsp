<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<link type="text/css" rel="stylesheet" href="/myHome/CSS/public/main.css">
		<link type="text/css" rel="stylesheet" href="/myHome/CSS/MiniMusicHome.css">	
		<script type="text/javascript" src="${pageContext.request.contextPath}/JS/tool/span.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/jquery-1.10.1.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/JS/plugObject/notice.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/JS/tool/JQ_plugs.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/JS/MiniMusicHome.js" ></script>
		<title>Mini 音乐</title>
	</head>
	<body>
		<%@include file="../memberJsp/login.html" %>
		<div style="position: fixed;width:0;height:0;top: 0;background: #c0f;left:400px;">
			<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
				codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0"
				width="0" height="0" id="Externa1">
				<param name="quality" value="high" />
				<param value="#FFFFFF" name="bgcolor">
				<param value="transparent" name="wmode">
				<param name="allowScriptAccess" value="always" />
				<param name="movie" value="/myHome/flash/minimusichome.swf" />
				<param value="userName=zhangwan" name="flashvars">
				<embed src="/myHome/flash/minimusichome.swf" quality="high"
					pluginspage="http://www.macromedia.com/go/getflashplayer"
					type="application/x-shockwave-flash" width="0" height="0"
					id="Externa" flashvars="userName=zhangwan">
				</embed>
			</object>	
		</div>
		<div class="mini_music_box">
			<span class="list_title">临时列表
				<i></i>
			</span>
			<ol class="list_ul">

			</ol>	
		</div>
		<div class="minimusic_nav">
			 <img alt="viki" src="${pageContext.request.contextPath}/image/vikilogo.png" style="float: left;"/>

			<div class="minimusic_search">
				 <input type="text" stash-placeholder="Mini搜索" placeholder="Mini搜索" id="searchText">
				 <input id="searchButton" type="button">
			</div>
			<div class="user_type_nav">
				<ul>
					<li>推荐</li>
					<li>歌手</li>
					<li>电台FM</li>
				</ul>
			</div>
			<div class="user_message_area">
				<s:if test="#session.sgin==null">			
					<a id="headLogin" class="anav">登陆</a>|
					<a href="/myHome/application" class="anav">注册</a>|
					<a href="/myHome/" class="anav">Viki 首页</a>	
				</s:if>
				<s:else>
					<div class="user_message_left">
						<img width=25px height=25px  src="/myHome/load/download_getSmallPhoto?id=${id}">
						<strong>${sgin}</strong>
						<ul>
							<li><a href="${pageContext.request.contextPath}/user/space/${sgin}/" target="_blank">空间</a></li>
							<li id="exit_login">退出</li>
						</ul>	
					</div>
					<a id="miniindex" href="/myHome/" class="anav">Viki 首页</a>	
				</s:else>
			</div>
		</div>
		<div class="mini_music_bg">
			<img src="/myHome/images/miniMusic/016.jpg" id="music_img_bg"/>
		</div>
		<div class="mini_music_component">
			<div class="mini_music_playArea">
				<h2 id="p_songName" class="music_song">Viki 音乐</h2>
				<span id="p_singerName" class="music_singer">---</span>
				<div class="mini_music_controll">
					<div class="singer_photo">
						<img id="singer_photo" width=180 height=180 src="/myHome/load/download_singerPhoto?singerName=%E5%91%A8%E6%9D%B0%E4%BC%A6" />
						<span></span>
					</div>
				</div>
				<div class="mini_music_each">
					<span style="margin-left:75px;" id="like_music"></span>
					<span id="download_music"></span>
					<span id="model_music"></span>
					<span id="volume_music" class="volume_music">
						<span id="volume_bar_area">
							<span id="volume_bar">
								<span id="volume_bar_cursor" class="cursor"></span>
							</span>
						</span>
					</span>
				</div>
				<div class="mini_music_lyric">

				</div>
				<div class="mini_music_play_controll">
					<div class="progress">
						<span id="bufferBar" class="buffer" >
							<span></span>
						</span>			
						<span id="currTimeBar" class="reach" >
							<span id="bar">
								<span id="cursor" class="cursor"></span>
							</span>					
						</span>			
					</div>
					<span id="playTime_left">00:00</span>
					<span id="playTime_right">00:00</span>
					<div class="mini_music_play_controll_p">
						<span id="previous_music" title="上一首(Ctrl + ←)"></span>
						<span id="play_music" title="播放(Ctrl + Enter)" class="play_music"></span>
						<span id="next_music" title="下一首(Ctrl + →)"></span>
						<span id="music_list" title="歌曲列表"></span>
					</div>
				</div>
			</div>
			<div class="mini_music_content_right">
					<div style="overflow: auto;height: 100%;width: 100%;">
						<h2 style="float: left;">华语男歌手</h2>
						<div class="singer_area">
							<ul>
								<li><span class="singer_li_hover"></span></li>
								<li><span class="singer_li_hover"></span></li>
								<li><span class="singer_li_hover"></span></li>
								<li><span class="singer_li_hover"></span></li>
								<li><span class="singer_li_hover"></span></li>
								<li><span class="singer_li_hover"></span></li>
								<li><span class="singer_li_hover"></span></li>
								<li><span class="singer_li_hover"></span></li>
							</ul>
						</div>
						<h2 style="float: left;">华语女歌手</h2>
							<div class="singer_area">
							<ul>
								<li>
									<span class="singer_li_hover"></span>
									<span class="singer_name_n">邓紫棋</span>
									<img src="/myHome/load/download_singerPhoto?singerName=%25E5%2590%258E%25E5%25BC%25A6"  alt="邓紫棋" src="" width=100% height=100% >
								</li>
								<li><span class="singer_li_hover"></span></li>
								<li><span class="singer_li_hover"></span></li>
								<li><span class="singer_li_hover"></span></li>
								<li><span class="singer_li_hover"></span></li>
								<li><span class="singer_li_hover"></span></li>
								<li><span class="singer_li_hover"></span></li>
								<li><span class="singer_li_hover"></span></li>
							</ul>
						</div>
					</div>
			</div>
		</div>
	</body>
</html>