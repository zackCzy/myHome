<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="/struts-tags"  prefix="s"%>
<%
	String basePath = request.getContextPath();
	String path=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+basePath; 
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		 <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
		<link type="text/css" rel="stylesheet" href="<%=path%>/CSS/public/main.css">
		<link type="text/css" rel="stylesheet" href="<%=path%>/CSS/HomePage.css">
		<script type="text/javascript">
			BASE_PATH="<%=path%>";
		</script>
		<script type="text/javascript" src="<%=path%>/JS/tool/span.js"></script>
		<script type="text/javascript" src="<%=path%>/scripts/jquery-1.10.1.js"></script>
		<script type="text/javascript" src="<%=path%>/JS/plugObject/Rollchart.js"></script>
		<script type="text/javascript" src="<%=path%>/JS/plugObject/Texi.js"></script>
		<script type="text/javascript" src="<%=path%>/JS/plugObject/notice.js"></script>
		<script type="text/javascript" src="<%=path%>/JS/tool/JQ_plugs.js"></script>
		<script type="text/javascript" src="<%=path%>/JS/tool/json2.js"></script>
		<title><s:property value="#user.userBaseDatum.name"/>_的主页</title>
	</head>
	<body>
		<%@include file="../memberJsp/login.html" %>
		<input type="hidden" value='<s:property value="#user.id"/>' id="space_user_id">
		<input type="hidden" value='<s:property value="#authority"/>' id="authority">
		<input type="hidden" value='<s:property value="#type"/>' id="type">
		<div id="returnHead"></div>
		<div class="content">
			<div class="Home_page_nav">
				<div class="head-nav">
					<span class="nav-box"></span>
					<ul>
						<li><a href="<%=path%>" >首页</a> </li>
						<s:if test="#authority==1">
							<li style="<s:property value="#type==2? 'border-bottom: 4px solid #DC3C00;':''"/>"><a href="<%=path%>/user/space/<s:property value="#user.name"/>/">动态</a></li>
							<li style="<s:property value="#type==1? 'border-bottom: 4px solid #DC3C00;':''"/>"><a href="<%=path%>/user/space/<s:property value="#user.name"/>/diary">日记</a></li>
							<li style="<s:property value="#type==4? 'border-bottom: 4px solid #DC3C00;':''"/>"><a href="<%=path%>/user/space/<s:property value="#user.name"/>/smallSpeak">微说</a></li>
							<li><a>关系</a></li>
							<li><a href="<%=path%>/user/user_SysMessage">消息</a></li>
						</s:if>
						<s:else>
							<li style="<s:property value="#type==1? 'border-bottom: 4px solid #DC3C00;':''"/>"><a href="<%=path %>/user/space/<s:property value="#user.name"/>/diary">日记</a></li>
							<li style="<s:property value="#type==4? 'border-bottom: 4px solid #DC3C00;':''"/>"><a href="<%=path %>/user/space/<s:property value="#user.name"/>/smallSpeak">微说</a></li>
							<li style="<s:property value="#type==3? 'border-bottom: 4px solid #DC3C00;':''"/>"><a href="<%=path %>/user/space/<s:property value="#user.name"/>/datum">资料</a></li>
						</s:else>
					</ul>
				</div>
				<div  class="seach-user">
					<div class="search_user_i">
						<input  maxlength="40" autocomplete="off" node-type="searchInput" type="text" placeholder="请输入查询内容">
						<span></span>
					</div>
					<div class="user_message">
						<s:if test="#session.sgin==null">
							<div class="login_area">
								<a id="headLogin">登录</a>&nbsp;|
								<a href="<%=path%>/application" target="_blank" >注册</a>
							</div>
						</s:if>
						<s:else>
							<img src="<%=path%>/load/download_getSmallPhoto?id=${id}" >				
							<strong><a  href="<%=path%>/user/space/${sgin}/">${sgin}</a></strong>			
						</s:else>		
					</div>
				</div>
				<%@include file="../plugs_jsp/music_jsp.jsp" %>
			</div>
			
			<div class="mypage_img">
					<img width=100% height=300px; alt="bg" src="<%=path%>/image/1.jpg">
			</div>
			<div class="my_Info_display">
				<div class="user_page_photo">	
					<s:a action="user_userPhoto" id="modify_user_photo" target="_blank">修改头像</s:a>			
					<img alt="用户头像" src="<%=path%>/load/download_getBigPhoto?id=<s:property value="#user.id"/>"/>			
					<ul>		
						<li><a href="<s:url action="user_myFollwer" />"><strong><s:property value="#user.followUsers.size()"/></strong>关注</a></li>
						<li><a href="<s:url action="user_myFlans" />"><strong><s:property value="#user.fansUsers.size()"/></strong>粉丝</a></li>
						<li><a href="<%=path%>/user/space/<s:property value="#user.name"/>/diary">
						<strong><s:property value="#logcount"/></strong>日记</a></li>
					</ul>
				</div>
				<div class="home_user_message" >
					<div class="home_user_message_left">
						<span class="user-info"><s:property value="#user.userBaseDatum.name"/></span>
						<span style="font: 13px/30px 'Microsoft Yahei';color: #808080;">
								<s:property value="#user.userBaseDatum.info" default="--"/>
						</span>
						<span style="font: 13px/30px 'Microsoft Yahei';color: #6C6351;">
							<s:property value="#user.userBaseDatum.addr.equals('请选择,请选择') ?未知: #user.userBaseDatum.addr"/>
						</span>	
					</div>	
					<s:if test="#authority==1">
							<a  href="/myHome/user/user_datum" class="user_message_bt"  target="_blank">编辑个人资料</a>
							<a  class="user_message_bt">查看今日</a>
					</s:if>
					<s:else>
						<a class="user_message_bt" target="_blank" onclick="addFollow(this)" rel="<s:property value="#user.id"/>">添加好友关注</a>
						<a class="user_message_bt" rel="<s:property value="#user.id"/>" onclick="removeFollow(this)">加入黑名单</a>
						<script type="text/javascript">
							function addFollow(event){
								$.ajax({
									url:"<%=path%>/friends/friends_addFirend",
									type : 'get',
									data : {
										'addUserId':event.getAttribute("rel")
									},
									success:function(text){
									    if(text=="you login has expired"){
									    	login();
									    }else if(text=="{'add':'ok'}"){
											$.notice("Viki提醒您","关注成功");
										}else{
											$.notice("Viki提醒您","关注失败");
										}
									}
								});
							};
							function removeFollow(evt){			
							    $.ajax({
									url:"<%=path%>/friends/friends_removeFollow",
									type : 'get',
									data : {removeUserid:evt.getAttribute("rel")},
									success:function(text){
										if(text=="you login has expired"){
									    	login();
									    }else if(text=="remove is ok"){
											$.notice("Viki提醒您","成功加入黑名单");
										}else{
											$.notice("Viki提醒您","加入黑名单失败");
										}
									}
								});
							}
						</script>
					</s:else>
				</div>
			</div>		
<%-- 判断是否设置自动播放歌曲 --%>
<s:if test="#user.spaceDatums.isMusic">
		<script type="text/javascript">
				window.isMusic=true;
		</script>
</s:if>
