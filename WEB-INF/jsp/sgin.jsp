<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags" %>
<%
	String basePath = request.getContextPath();
	String path=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+basePath+"/myHome/"; 
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<link rel="stylesheet"  type="text/css" href="<%=path%>/CSS/public/main.css">
		<link rel="stylesheet"  type="text/css" href="<%=path%>/CSS/sgin.css">
		<script type="text/javascript" src="<%=path%>/scripts/jquery-1.10.1.js"></script>
		<script type="text/javascript" src="<%=path%>/JS/tool/span.js"></script>
		<script type="text/javascript" src="<%=path%>/JS/sgin.js"></script>
		<title>Viki 登录</title>
	</head>
	<body>
		<div class="sginNav">
			<div style="width:1150px;margin:0 auto;">
				<img alt="viki" src="<%=path%>/image/vikilogo.png" id="logo"> 
				<ul >
					<li><a href="<%=path%>">Viki 首页</a></li>
					<li><a href="<%=path%>/application">注册账号</a></li>
					<li>帮助</li>
					<li style="border-right: 1px solid #DDDDDD;">建议反馈</li>
				</ul>
			</div>
		</div>
		<div style="width:1200px;position: relative;height:500px">
		<div class="sginDisplay">
			<div class="displayImg"></div>
		</div>
		<div class="sginHead">
			<div  style="height:10px;"></div>
			<form action='<s:property value="#return"/>' name="sgin" method="get">
				<input type="text" class="input" style="margin-top: 152px" name="username">
				<input type="password" class="input" name="password">
				<input type="checkbox" id=weekExpiry name="weekexpiry" ><label for="weekExpiry" class="checkStatus" >一周内自动登录</label><br>
				<input type="checkbox" id=monthExpiry name="monthexpiry" > <label for="monthExpiry" class="checkStatus">一月内自动登录</label>
				<input type="button" id="sginAccount">
				<div id="sginStatus"><span></span></div>
			</form>
		</div>
		</div>
	</body>
</html>