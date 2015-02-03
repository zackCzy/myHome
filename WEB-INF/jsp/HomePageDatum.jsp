<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="/struts-tags"  prefix="s"%>
<%
	String basePath = request.getContextPath();
	String path=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+basePath+"/myHome/"; 
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<link type="text/css" rel="stylesheet" href="<%=path %>/CSS/public/main.css">
		<link type="text/css" rel="stylesheet" href="<%=path %>/CSS/HomePage.css">
		<script type="text/javascript" src="<%=path %>/JS/tool/span.js"></script>
		<script type="text/javascript" src="<%=path %>/scripts/jquery-1.10.1.js"></script>
		<script type="text/javascript" src="<%=path %>/JS/tool/JQ_plugs.js"></script>
		<script type="text/javascript" src="<%=path %>/JS/tool/Ajax.js"></script>
		<script type="text/javascript" src="<%=path %>/JS/tool/json2.js"></script>
		<title><s:property value="#user.userBaseDatum.name"/>_的主页</title>
	</head>
	<body>
		<%@include file="../memberJsp/login.html" %>
		<input type="hidden" value='<s:property value="#user.id"/>' id="space_user_id">
		<div id="returnHead"></div>
		<div class="hint"></div>
		<div style="width: 1000px; margin: 0 auto;">
			<div class="Home_page_nav">
				<ul>
					<li><a href="<%=path %>" >首页</a> </li>
					<li ><a href="<%=path %>/user/space/<s:property value="#user.name"/>/diary">日记</a></li>
					<li ><a href="<%=path %>/user/space/<s:property value="#user.name"/>/smallSpeak">微说</a></li>
					<li style="border-bottom: 4px solid #DC3C00;"><a href="<%=path %>/user/space/<s:property value="#user.name"/>/datum">资料</a></li>		
				</ul>
				<div style="float: right;height:50px;vertical-align: middle;">
					<div class="search_user_i">
						<input  maxlength="40" autocomplete="off" node-type="searchInput" type="text" style="margin:0;width:139px;height:15px;float: left;">
						<span></span>
					</div>
					<div class="user_message">
						<s:if test="#session.sgin==null">
							<div class="login_area">
								<a id="headLogin">登录</a>&nbsp;|
								<a href="<%=path %>/application" target="_blank" >注册</a>
							</div>
						</s:if>
						<s:else>
							<strong><a  href="<%=path %>/user/space/${sgin}/">${sgin}</a></strong>			
							<img width="25px" height="25px" src="<%=path %>/load/download_getSmallPhoto?id=${id}" >				
						</s:else>		
					</div>
				</div>
				<%@include file="../plugs_jsp/music_jsp.jsp" %>
			</div>
			
			<div class="mypage_img">
				<img width=1000px height=300px; alt="bg" src="<%=path %>/image/1.jpg">
			</div>
			<div class="my_Info_display">
				<div class="user_page_photo">	
					<s:if test="#authority==1">
						<s:a action="user_userPhoto" id="modify_user_photo" target="_blank">修改头像</s:a>
					</s:if>	
					<img width=180px height=180px alt="用户头像" src="<%=path %>/load/download_getBigPhoto?id=<s:property value="#user.id"/>"/>
					
					<ul>		
						<li><a href="<s:url action="user_myFollwer" />"><strong><s:property value="#user.followUsers.size()"/></strong>关注</a></li>
						<li><a href="<s:url action="user_myFlans" />"><strong><s:property value="#user.fansUsers.size()"/></strong>粉丝</a></li>
						<li><a href="<%=path %>/user/space/<s:property value="#user.name"/>/diary">
						<strong><s:property value="#logcount"/></strong>日记</a></li>
					</ul>
				</div>
				<div class="home_user_message" >
					<span style="font: 20px/30px 'Microsoft Yahei';color: #423009;"><s:property value="#user.userBaseDatum.name"/></span>
					<s:if test="#authority==1">
						<a  href="<%=path %>/user/user_datum" id="user_message_bt" style="float: right;" target="_blank">编辑个人资料</a>
						<span style="font: 13px/30px 'Microsoft Yahei';color: #808080;">
							<s:property value="#user.userBaseDatum.info" default="--"/>
						</span>
						<a  id="user_message_bt" style="float: right;">查看今日</a>
					</s:if>
					<s:else>
						<a   id="user_message_bt" style="float: right;" target="_blank" onclick="addFollow(this)" rel="<s:property value="#user.id"/>">添加好友关注</a>
						<span style="font: 13px/30px 'Microsoft Yahei';color: #808080;">
							<s:property value="#user.userBaseDatum.info" default="-------"/>
						</span>
						<a  id="user_message_bt" style="float: right;" rel="<s:property value="#user.id"/>" onclick="removeFollow(this)">加入黑名单</a>
						<script type="text/javascript">
							function addFollow(evt){
								stateAjax({
									url:"<%=path %>/friends/friends_addFirend",
									method : 'get',
									async : true,
									message : {
										'addUserId':evt.rel
									},
									run:function(text){
									    if("you login has expired"){
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
							    stateAjax({
									url:"${pageContext.request.contextPath}/friends/friends_removeFollow",
									method : 'get',
									async : true,
									message : {removeUserid:evt.rel},
									run:function(text){
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
					<span style="font: 13px/30px 'Microsoft Yahei';color: #6C6351;">
						<s:property value="#user.userBaseDatum.addr.equals('请选择,请选择') ? '-----------': #user.userBaseDatum.addr"/>
					</span>		
				</div>
			</div>
			<%@include file="SpaceUserMessage.jsp" %>	
		</div>
	</body>
</html>