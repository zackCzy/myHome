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
		<link type="text/css" rel="stylesheet" href="<%=path %>/CSS/public/main.css">
		<link type="text/css" rel="stylesheet" href="<%=path %>/CSS/HomePage.css">
		<script type="text/javascript">
			BASE_PATH=<%=path %>
		</script>
		<script type="text/javascript" src="<%=path %>/JS/tool/span.js"></script>
		<script type="text/javascript" src="<%=path %>/scripts/jquery-1.10.1.js"></script>
		<script type="text/javascript" src="<%=path %>/JS/plugObject/Texi.js"></script>
		<script type="text/javascript" src="<%=path %>/JS/plugObject/notice.js"></script>
		<script type="text/javascript" src="<%=path %>/JS/tool/JQ_plugs.js"></script>
		<script type="text/javascript" src="<%=path %>/JS/tool/json2.js"></script>
		<title><s:property value="#user.userBaseDatum.name"/>_的主页</title>
	</head>
	<body>
		<%@include file="../memberJsp/login.html" %>
		<input type="hidden" value='<s:property value="#user.id"/>' id="space_user_id">
		<input type="hidden" value='<s:property value="#authority"/>' id="authority">
		<input type="hidden" value='<s:property value="#type"/>' id="type">
		<div id="returnHead"></div>
		<div class="hint"></div>
		<div style="width: 1000px; margin: 0 auto;">
			<div class="Home_page_nav">
				<ul>
					<li><a href="<%=path %>" >首页</a> </li>
					<li style="border-bottom: 4px solid #DC3C00;">动态</li>
					<li><a href="<%=path %>/user/space/<s:property value="#user.name"/>/diary">日记</a></li>
					<li><a href="<%=path %>/user/space/<s:property value="#user.name"/>/smallSpeak">微说</a></li>
					<li>关系</li>
					<li><a href="<%=path %>/user/user_SysMessage">消息</a></li>
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
					<s:a action="user_userPhoto" id="modify_user_photo" target="_blank">修改头像</s:a>			
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
					<a  href="<%=path %>/user/user_datum" id="user_message_bt" style="float: right;" target="_blank">编辑个人资料</a>
					<span style="font: 13px/30px 'Microsoft Yahei';color: #808080;">
						<s:property value="#user.userBaseDatum.info" default="--"/>
					</span>
					<a  id="user_message_bt" style="float: right;">查看今日</a>	
					<span style="font: 13px/30px 'Microsoft Yahei';color: #6C6351;">
						<s:property value="#user.userBaseDatum.addr.equals('请选择,请选择') ?未知: #user.userBaseDatum.addr"/>
					</span>		
				</div>
			</div>
					<div class="home_content_display">
						<div style="float: left;" id="addContent">
							<div style="width: 640px;height:20px; margin:15px 0 20px 15px;background: url('<%=path %>/image/iconbtn.png') no-repeat;"></div>
							<div contenteditable="true" id="shuoshuo">&nbsp;&nbsp;</div>
							<div style="width: 640px;height:50px; margin:0 0 20px 15px;">
								<input alt="${token}" type="button" style="border-radius:15px;cursor:pointer;float:right;width:100px; height:30px;background: #5CAAE6" value="发表" onclick="sendSmallSpeak(this)">
							</div>	
						</div>
						<s:iterator value="#dynamic" var="newLog" >
							<div class="con_user_box">
								<a href="<%=path %>/user/space/<s:property value="user.name"/>/">
									<img class="user_photo" width="40" height="40" src="<%=path %>/load/download_getSmallPhoto?id=<s:property value="user.id"/>" />
								</a>
								<span><s:property value="modifyDate"/></span>
								<a class="user_name" href="<%=path %>/user/space/<s:property value="user.name"/>/" target="_blank"><s:property value="user.userBaseDatum.name"/></a>
								<s:if test="smallSpeak">
									<a target="_blank">
										<div class="content_user_li">
											<div> <s:property value="noHtmlLog" /></div>
										</div>
									</a>
								</s:if>
								<s:else>
									<a href="<%=path %>/user/function_readDiary?logId=<s:property value="id" />" target="_blank">
										<div class="content_user_li">
											<strong class="logTitle">《<s:property value="logName" />》</strong>
											<br>
											<div><s:property value="noHtmlLog.substring(0,noHtmlLog.length()>350 ? 350 : noHtmlLog.length())"/></div>
										</div>
									</a>
								</s:else>	
								<div class="comment_box">
									<span alt=" <s:property value="id" />" class="remove_log">删除</span>
									<span class="view_com"  alt="<s:property value="id" />">
									评论(<b><s:property value="commentNum" default="0"/></b>)
									</span>
									<span>浏览(<s:property value="visibleNum" default="0"/>)</span>
								</div>
								<div class="comment">
									<h5>评论：</h5>
									<div class="commentArea" contenteditable="true"></div>
									<input class="sendComment" type="button" value="评论" alt="<s:property value="id"/>">
									<div class="displayComment"></div>
									<div class="load_box">正在拼了命的,为您加载!</div>
									<b class="cut_out">↑ 收起</b>
								</div>		
							</div>
						</s:iterator>
					</div>
					<div class="load_user_contenr">
					<div class="point_load_status" >
						<span >正在努力加载</span>	
					</div>
				</div>
			<script type="text/javascript" src="<%=path %>/JS/HomePage.js"></script>	
		</div>
	</body>
</html>