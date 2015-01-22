<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="/struts-tags"  prefix="s"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<script type="text/javascript" src="/myHome/scripts/jquery-1.7.2.js"></script>
		<link type="text/css" rel="stylesheet" href="/myHome/CSS/public/main.css">
		<link type="text/css" rel="stylesheet" href="/myHome/CSS/HomePage.css">
		<title>Insert title here</title>
	</head>
	<body>

		<div style="width: 1000px; margin: 0 auto;">
			<div class="Home_page_nav">
				<ul>
					<li>首页</li>
					<li>动态</li>
					<li>日记</li>
					<li>关系</li>
					<li>消息</li>
				</ul>
			</div>
			
			<div class="mypage_img">
				<img width=1000px height=300px; alt="bg" src="/myHome/image/1.jpg" id="music_img_bg">
			</div>
			<div class="my_Info_display">
				<div class="user_page_photo">	
					<img width=180px height=180px alt="用户头像" src="http://localhost:1050/myHome/load/download_getBigPhoto?id=1">
					<ul>
						<li><strong>10</strong>关注</li>
						<li><strong>10</strong>粉丝</li>
						<li><strong>10</strong>日记</li>
					</ul>
				</div>
				<div class="home_user_message" >
					<span style="font: 20px/30px 'Microsoft Yahei';color: #423009;">Czy丶陈</span>
					<span style="font: 13px/30px 'Microsoft Yahei';color: #808080;">Thanks your smile, had been flurried my time passage. </span>
					<span style="font: 13px/30px 'Microsoft Yahei';color: #6C6351;">| 广东、珠海 |</span>
					<input type="button" value="编辑个人资料">
				</div>
			</div>
			<div class="home_content_display">

			</div>
		</div>
	</body>
</html>