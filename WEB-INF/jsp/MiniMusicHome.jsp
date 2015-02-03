<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags" %>
<%
	String basePath = request.getContextPath();
	String path=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+basePath; 
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<link type="text/css" rel="stylesheet" href="<%=path %>/CSS/public/main.css">
		<link type="text/css" rel="stylesheet" href="<%=path %>/CSS/MiniMusicHome.css">	
		<script type="text/javascript">
			BASE_PATH=<%=path %>
		</script>
		<script type="text/javascript" src="<%=path %>/JS/tool/span.js"></script>
		<script type="text/javascript" src="<%=path %>/scripts/jquery-1.10.1.js"></script>
		<script type="text/javascript" src="<%=path %>/JS/plugObject/Texi.js"></script>
		<script type="text/javascript" src="<%=path %>/JS/plugObject/MusicBox.js"></script>
		<script type="text/javascript" src="<%=path %>/JS/plugObject/notice.js"></script>
		<script type="text/javascript" src="<%=path %>/JS/tool/JQ_plugs.js"></script>
		<script type="text/javascript" src="<%=path %>/JS/MiniMusicHome.js" ></script>
		<title>Mini 音乐</title>
	</head>
	<body>
		<%@include file="../memberJsp/login.html" %>
		<input type="hidden" value="${session.id}" name="h_userId">
		<div style="position: fixed;width:0;height:0;top: 0;background: #c0f;left:400px;">
			<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
				codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0"
				width="0" height="0" id="Externa1">
				<param name="quality" value="high" />
				<param value="#FFFFFF" name="bgcolor">
				<param value="transparent" name="wmode">
				<param name="allowScriptAccess" value="always" />
				<param name="movie" value="<%=path %>/flash/minimusichome.swf" />
				<param value="userName=zhangwan" name="flashvars">
				<embed src="<%=path %>/flash/minimusichome.swf" quality="high"
					pluginspage="http://www.macromedia.com/go/getflashplayer"
					type="application/x-shockwave-flash" width="0" height="0"
					id="Externa" flashvars="userName=zhangwan">
				</embed>
			</object>	
		</div>
		<div class="mini_music_box">
			<span class="list_title">
				<ul>
					<li value="0">临时列表</li>
					<li value="1">Viki列表</li>
				</ul>
				<i></i>
			</span>
			<ol class="list_ul temp">
				<li class="list_ul_point_wrap">
					<div class="list_ul_point"></div>
				</li>
			</ol>	
			<ol class="list_ul vikiMusic">
				<li class="list_ul_point_wrap">
					<div class="list_ul_point"></div>
				</li>
			</ol>	
		</div>
		<div class="minimusic_nav">
			<a href="<%=path %>">
			 	<img alt="viki" src="<%=path %>/image/vikilogo.png" style="float: left;"/>
			</a>
			<div class="minimusic_search">
				 <input type="text" stash-placeholder="Mini搜索" placeholder="Mini搜索" id="searchText">
				 <input id="searchButton" type="button">
			</div>
			<div class="user_type_nav">
				<ul>
					<li>推荐</li>
					<li class="nav_singer">歌手</li>
					<li>电台FM</li>
				</ul>
			</div>
			<div class="user_message_area">
				<s:if test="#session.sgin==null">			
					<a id="headLogin" class="anav">登陆</a>|
					<a href="<%=path %>/application" class="anav">注册</a>|
					<a href="/" class="anav">Viki首页</a>	
				</s:if>
				<s:else>
					<div class="user_message_left">
						<img width=25px height=25px  src="<%=path %>/load/download_getSmallPhoto?id=${id}">
						<strong>${sgin}</strong>
						<ul>
							<li><a href="<%=path %>/user/space/${sgin}/" target="_blank">空间</a></li>
							<li id="exit_login">退出</li>
						</ul>	
					</div>
					<a id="miniindex" href="<%=path %>" class="anav">Viki首页</a>	
				</s:else>
			</div>
		</div>
		<div class="mini_music_bg">
			<img src="<%=path %>/images/miniMusic/016.jpg" id="music_img_bg"/>
		</div>
		<div class="mini_music_component">
			<div class="mini_music_playArea">
				<h2 id="p_songName" class="music_song">Viki 音乐</h2>
				<span id="p_singerName" class="music_singer">---</span>
				<div class="mini_music_controll">
					<div class="singer_photo">
						<img id="singer_photo" width=180 height=180 src="<%=path %>/load/download_singerPhoto?singerName=%E5%91%A8%E6%9D%B0%E4%BC%A6" />
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
				<div class="singer_list">
					<h2 style="float: left;">华语男歌手</h2>
					<div class="singer_area">
						<ul>
							<li><span class="singer_li_hover"></span>
								<span class="singer_name_n">陈奕迅</span>
								<img src="<%=path %>/load/download_singerPhoto?singerName=%25E9%2599%2588%25E5%25A5%2595%25E8%25BF%2585"  alt="陈奕迅"  width=100% height=100% >
							</li>
							<li><span class="singer_li_hover"></span>
								<span class="singer_name_n">阿弟仔</span>
								<img src="<%=path %>/load/download_singerPhoto?singerName=%25E9%2598%25BF%25E5%25BC%259F%25E4%25BB%2594"  alt="阿弟仔"  width=100% height=100% >
							</li>
							<li><span class="singer_li_hover"></span>
								<span class="singer_name_n">罗志祥</span>
								<img src="<%=path %>/load/download_singerPhoto?singerName=%25E7%25BD%2597%25E5%25BF%2597%25E7%25A5%25A5"  alt="罗志祥"  width=100% height=100% >
							</li>
							<li><span class="singer_li_hover"></span>
								<span class="singer_name_n">李玖哲</span>
								<img src="<%=path %>/load/download_singerPhoto?singerName=%25E6%259D%258E%25E7%258E%2596%25E5%2593%25B2"  alt="李玖哲"  width=100% height=100% >
							</li>
							<li><span class="singer_li_hover"></span>
								<span class="singer_name_n">柯有伦</span>
								<img src="<%=path %>/load/download_singerPhoto?singerName=%25E6%259F%25AF%25E6%259C%2589%25E4%25BC%25A6"  alt="柯有伦"  width=100% height=100% >
							</li>
							<li><span class="singer_li_hover"></span>
								<span class="singer_name_n">林俊杰</span>
								<img src="<%=path %>/load/download_singerPhoto?singerName=%25E6%259E%2597%25E4%25BF%258A%25E6%259D%25B0"  alt="林俊杰"  width=100% height=100% >
							</li>
							<li><span class="singer_li_hover"></span>
								<span class="singer_name_n">光良</span>
								<img src="<%=path %>/load/download_singerPhoto?singerName=%25E5%2585%2589%25E8%2589%25AF"  alt="光良"  width=100% height=100% >
							</li>
							<li><span class="singer_li_hover"></span>
								<span class="singer_name_n">潘玮柏</span>
								<img src="<%=path %>/load/download_singerPhoto?singerName=%25E6%25BD%2598%25E7%258E%25AE%25E6%259F%258F"  alt="潘玮柏"  width=100% height=100% >
							</li>
						</ul>
					</div>
					<h2 style="float: left;">华语女歌手</h2>
						<div class="singer_area">
						<ul>
							<li>
								<span class="singer_li_hover"></span>
								<span class="singer_name_n">金莎</span>
								<img src="<%=path %>/load/download_singerPhoto?singerName=周杰伦"  alt="金莎" src="" width=100% height=100% >
							</li>
							<li>
								<span class="singer_li_hover"></span>
								<span class="singer_name_n">梁静茹</span>
								<img src="<%=path %>/load/download_singerPhoto?singerName=周杰伦"  alt="梁静茹" src="" width=100% height=100% >
							</li>
							<li>
								<span class="singer_li_hover"></span>
								<span class="singer_name_n">张惠妹</span>
								<img src="<%=path %>/load/download_singerPhoto?singerName=周杰伦"  alt="张惠妹" src="" width=100% height=100% >
							</li>
							<li>
								<span class="singer_li_hover"></span>
								<span class="singer_name_n">孙燕姿</span>
								<img src="<%=path %>/load/download_singerPhoto?singerName=周杰伦"  alt="孙燕姿" src="" width=100% height=100% >
							</li>
							<li>
								<span class="singer_li_hover"></span>
								<span class="singer_name_n">张靓颖</span>
								<img src="<%=path %>/load/download_singerPhoto?singerName=周杰伦"  alt="张靓颖" src="" width=100% height=100% >
							</li>
							<li>
								<span class="singer_li_hover"></span>
								<span class="singer_name_n">王菲</span>
								<img src="<%=path %>/load/download_singerPhoto?singerName=周杰伦"  alt="王菲" src="" width=100% height=100% >
							</li>
							<li>
								<span class="singer_li_hover"></span>
								<span class="singer_name_n">蔡依林</span>
								<img src="<%=path %>/load/download_singerPhoto?singerName=周杰伦"  alt="蔡依林" src="" width=100% height=100% >
							</li>
							<li>
								<span class="singer_li_hover"></span>
								<span class="singer_name_n">范玮琪</span>
								<img src="<%=path %>/load/download_singerPhoto?singerName=周杰伦"  alt="范玮琪" src="" width=100% height=100% >
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>