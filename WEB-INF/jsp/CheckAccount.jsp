<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="refresh" content="5;url='/myHome/'">
		<title>viki_验证账号</title>
	</head>
	<style type="text/css">
body,h1{
	margin: 0;
	border: 0 none;
	padding: 0;
}
body{
	background: url("/myHome/image/sginBg.png");
}
.register_check {
	width: 800px;
	height: 300px;
	margin: 60px auto;
	background: #FAFAFA;
	border:1px solid #DCDCDC;
	box-shadow: 6px 6px 4px rgba(0, 0, 0, 0.05), 10px 10px 6px rgba(0, 0, 0, 0.3);
}
h1,a{
	margin:30px auto;
	width:100%;
	height:30px;
	color:#787878;
	text-align: left;
	text-indent:20px;
	line-height:30px;
	font-size:18px;
	display: block;
}
</style>
	<body>
		<div class="register_check">
			<div style="font-family: '微软雅黑','宋体';border-bottom:4px solid #FF4700;font-size:18px;font-weight:bold; color:#787878;width:100%;height:56px;background: url('/myHome/image/tog_contact_bg.gif');line-height:56px;text-indent: 20px">
				viki_系统通知
			</div>
			<h1>${state}</h1>
			<a href="/myHome/">如页面没有跳转，点击此链接返回主页</a>
		</div>
	</body>
</html>