<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String basePath = request.getContextPath();
	String path=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+basePath; 
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<title>Viki Home</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="new,新闻,music,音乐,translator,翻译">
		<link rel="stylesheet" type="text/css" href="CSS/public/main.css" />
		<link rel="stylesheet" type="text/css" href="CSS/home.css" />
		<script type="text/javascript" src="JS/tool/span.js"></script>
		<script type="text/javascript" src="scripts/jquery-1.10.1.js"></script>
		<script type="text/javascript" src="JS/home.js"></script>
	</head>
	<body style="background: #9ED034;overflow: hidden;" onselectstart="return false" class="unselect">
		<div id="viki_scroll" class="unselect">
			<span id="viki_bar" class="unselect"></span>
		</div>
			<ul class="display_info">
				<li class="unselect" >
					<img src="<%=path %>/images/home/header-bg.jpg"  width=100% height=100%; style="position: fixed;top:0;left:0">
					<div  class="viki_info unselect" id="viki_info">
						<img class="unselect" height=100% width=40% style="float: left;" src="<%=path %>/images/home/about-divice.png">
						<img class="unselect" height=80% width=40% style="float: right;margin:5% 2% 0;" src="<%=path %>/images/home/info.png">
					</div>
				</li>
				<li style="background: url('<%=path %>/image/bg_noise.jpg');height:1800px;text-align: center;border-bottom:8px solid #333;" id="music_display">
					<div style="width:100%;height:34px;padding:3px;">
			 			<span style="cursor:pointer;border:1px solid #787878;margin:0px auto; font-size:17px;font-weight: 700;line-height:30px;display: block;background: #88AF31;border-radius:25px;width:250px;height:30px;text-align: center;'">VIKI Space info </span>
			 		</div>
			 		<div class="music_display" >
						<span id="music_display_left" class="unselect"></span>
						<span id="music_display_right" class="unselect"></span>
						<div style="width:1022px;height:300px;margin:0 auto;overflow: hidden;" class="unselect">
							<ul id="music_display_ul" class="unselect">
								<li class="unselect">
									<img src="<%=path %>/images/home/music.png"  width=90% height=80%; id="music_info">
									<span>viki music</span>
								</li>
								<li class="unselect">
									<img src="<%=path %>/images/home/music2.png"  width=90% height=80%; id="music_info">
									<span>viki music</span>
								</li>
								<li class="unselect"><img src="<%=path %>/images/home/space.png"  width=90% height=80%; id="music_info">
									<span>viki V说</span>
								</li>
								<li class="unselect">
									<img src="<%=path %>/images/home/space1.png"  width=90% height=80%; id="music_info">
									<span>viki V说</span>
								</li>
								<li class="unselect">
									<img src="<%=path %>/images/home/space2.png"  width=90% height=80%; id="music_info">
									<span>viki V说</span>
								</li>
								<li class="unselect"><img src="<%=path %>/images/home/space3.png"  width=90% height=80%; id="music_info">
									<span>viki V说</span>
								</li>
							</ul>
						</div>
					</div>
						
					<div class="divice-fea-left-grid">
						<h3>
						ViKi 微空间简介
						</h3>
						<p>VIKI 微空间 是一个为用户提供一个自我自主空间的网站。我们希望能够为每一位用户提供一个能够自我学习，自主交流、媒体娱乐、网络社交的综合性个人主页。</p>
						<img src="<%=path %>/images/home/slide-1.png" style="float: right;">
					</div>
					<div class="divice-fea-left-grid" style="height:150px;">
						<h3>
						Brief introduction of VIKI micro space
						</h3>
						<p>VIKI micro space is a self independent space for the user of the site. We hope to provide a self learning for every user, independent communication, media and entertainment, social networking and comprehensive personal homepage.</p>
					</div>
					<div class="divice-fea-left-grid">
						<h3>
						ViKi 音乐
						</h3>
						<p>VIKI 音乐为您收集了14万首歌曲资源，在这你能免费收听到高质量的音乐资源，也能通过互动与好友进行分享！</p>
					</div>
					<div class="divice-fea-left-grid">
						<h3>
						ViKi Music
						</h3>
						<p>VIKI music collection 140,000 song resources for you, in this you can be free to listen to the music of high quality resources, can also share through interaction with friends!</p>
					</div>
					<div class="divice-fea-left-grid">
						<h3>
						ViKi 翻译
						</h3>
						<p>使用VIKI 翻译你能在这进行外语翻译的学习，VIKI翻译支持15种国内外语种 可以进行准确的发音，与翻译。借助谷歌API让翻译更加精准。</p>
						<img src="<%=path %>/images/home/slide-2.png" style="float: right;">
					</div>
					<div class="divice-fea-left-grid">
						<h3>
						ViKi Translation
						</h3>
						<p>You can use VIKI translation of foreign language translation in this study, the VIKI interpreter supports 15 kinds of domestic and foreign languages can be accurate pronunciation, and translation. With the help of Google API make translation more accurate.</p>
					</div>
					<div class="divice-fea-left-grid">
						<h3>
						ViKi 空间
						</h3>
						<p>VIKI 为您提供了一个集博客、微博客一体的个人空间系统，在这你能与好友分享心情、撰写日记、好友互动。</p>
						
					</div>
					<div class="divice-fea-left-grid">
						<h3>
						ViKi Space
						</h3>
						<p>VIKI provides a set of blog, micro blog one of personal space system for you, in this you can share feelings with friends, friends, writing diary interaction.</p>
					</div>
				</li>
				<li class="unselect" style="overflow:hidden; width:100%;height:100%;background: url('<%=path %>/images/miniMusic/p1756682152-2.jpg') no-repeat fixed 50% 0 rgb(255, 255,255);">		
					
			</ul>

		<div class="display_info_bg" style="z-index: 5" >
			<div style="margin:38px 60px;;width:150px; height:45px;float: left;" class="unselect">
				<img src="<%=path %>/image/vikilogo.png" alt="viki"  class="unselect">
			</div>				
			<ul class="viki_index_nav unselect" >
				<li style="background: #9ED034;color: #E3FFFF" id="info" class="unselect">简介</li>
				<li id="music" class="unselect"><a href="<%=path %>/music">Music</a></li>
				<li id="transtror" class="unselect"><a href="<%=path %>/translator">翻译</a></li>
				<li id="space" class="unselect"><a  href="<%=path %>/user/space/${sgin==null? 'null':sgin}/">V说</a></li>			
			</ul>		
		</div>
	
	</body>
</html>
