<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="/struts-tags" prefix="s" %>
<%
	String basePath = request.getContextPath();
	String path=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+basePath; 
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<link type="text/css" rel="stylesheet" href="<%=path%>/CSS/UserFriends.css"/>
		<link type="text/css" rel="stylesheet" href="<%=path%>/CSS/public/main.css">

		<title><s:property value="#user.userBaseDatum.name"/>_消息盒子</title>
	</head>
	<body>
		<div class="Home_page_nav" style="margin:30px auto 0;">
				<ul>
					<li><s:a href="<%=path%>" >首页</s:a> </li>
					<li ><a href="<%=path%>/user/space/<s:property value="#user.name"/>/">动态</a></li>
					<li><a href="<%=path%>/user/space/<s:property value="#user.name"/>/diary">日记</a></li>
					<li><a href="<%=path%>/user/space/<s:property value="#user.name"/>/smallSpeak">微说</a></li>
					<li>关系</li>
					<li style="border-bottom: 4px solid #DC3C00;"><a href="<%=path%>/user/user_myFlans">消息</a></li>
				</ul>
		</div>
		<div class="follw_box">
			
			<div class="friends_nav">
				<span >最新信息</span>
				<ul>
					<li><a style="color: #3fa7cb;text-decoration:none;display: block;" href="<%=path%>/user/user_SysMessage">消息</a></li>
					<li><a style="color: #3fa7cb;text-decoration:none;display: block;"  href="<%=path%>/user/user_myFlans">我的粉丝</a></li>
					<li><a style="color: #3fa7cb;text-decoration:none;display: block;" href="<%=path%>/user/user_myFollwer">关注的人</a></li>
					<li><a style="color: #3fa7cb;text-decoration:none;display: block;" href="<%=path%>/user/user_communMessage">私信</a></li>
					<li><a style="color: #3fa7cb;text-decoration:none;display: block;" href="<%=path%>/user/user_commentMessage">评论</a></li>
					<li>未关注人私信</li>
					<li>收藏</li>
				</ul>
			</div>

			<s:if test="#SystmeMessage">
				<%@ include file="/WEB-INF/jsp/SystemMessage.jsp"%>
				<div class="friends_nav" style="background:#FBF5EB;width:200px;">
					<fieldset class="S_line2" style="margin:20px 0 0;color:#423009;font-size:15px;">
						<legend class="tit S_txt1">消息箱使用小帮助</legend>
					</fieldset>
					<dl >
						<dt >
						<dd >什么是消息箱？</dd>
						<dt >
						<dd>是将@我的，评论，赞，私信等消息相关类服务综合在一起的消息中心，在这里可以看到所有的消息提示。</dd>
					</dl>
				</div>
			</s:if>
			<s:elseif test="myFlans">
				<%@ include file="/WEB-INF/jsp/MyFans.jsp"%>
				<div class="friends_nav" style="background:#FBF5EB;width:200px;">
					<fieldset class="S_line2" style="margin:20px 0 0;color:#423009;font-size:15px;">
						<legend class="tit S_txt1">广告位招租</legend>
					</fieldset>
					<dl >
						<dt >
						<dd >广告招租</dd>
						<dt >
						<dd></dd>
					</dl>
				</div>
			</s:elseif>
			<s:elseif test="comment">
				<%@ include file="/WEB-INF/jsp/CommentMessage.jsp"%>
				<div class="friends_nav" style="background:#FBF5EB;width:200px;">
					<fieldset class="S_line2" style="margin:20px 0 0;color:#423009;font-size:15px;">
						<legend class="tit S_txt1">广告位招租</legend>
					</fieldset>
					<dl >
						<dt >
						<dd >广告招租</dd>
						<dt >
						<dd></dd>
					</dl>
				</div>
			</s:elseif>
			<s:elseif test="commun">
				<%@ include file="/WEB-INF/jsp/CommunMessage.jsp"%>
				<div class="friends_nav" style="background:#FBF5EB;width:200px;">
					<fieldset class="S_line2" style="margin:20px 0 0;color:#423009;font-size:15px;">
						<legend class="tit S_txt1">广告位招租</legend>
					</fieldset>
					<dl >
						<dt >
						<dd >广告招租</dd>
						<dt >
						<dd></dd>
					</dl>
				</div>
			</s:elseif>
		</div>
	</body>
</html>