<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="/struts-tags"  prefix="s"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<link type="text/css" rel="stylesheet" href="/myHome/CSS/public/main.css">
		<link type="text/css" rel="stylesheet" href="/myHome/CSS/HomePage.css">
		<script type="text/javascript" src="${pageContext.request.contextPath}/JS/tool/span.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/jquery-1.10.1.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/JS/tool/JQ_plugs.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/JS/tool/Ajax.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/JS/tool/json2.js"></script>
		<title><s:property value="#user.userBaseDatum.name"/>_的主页</title>
	</head>
	<body>
		<%@include file="../memberJsp/loginM.jsp" %>
		<div class="contentPoint" id="point">
			<span
				style="color: #FF4700; margin: 25px 0 0; line-height: 20px; height: 20px; display: block;">viki
				提示您!</span>
			<div id="point_cont"></div>
		</div>
		<input type="hidden" value='<s:property value="#user.id"/>' id="space_user_id">
		<div id="returnHead"></div>
		<div class="hint"></div>
		<div style="width: 1000px; margin: 0 auto;">
			<div class="Home_page_nav">
				<ul>
					<li><s:a href="/myHome" >首页</s:a> </li>
					<li ><a href="/myHome/user/space/<s:property value="#user.name"/>/diary">日记</a></li>
					<li ><a href="/myHome/user/space/<s:property value="#user.name"/>/smallSpeak">微说</a></li>
					<li style="border-bottom: 4px solid #DC3C00;"><a href="/myHome/user/space/<s:property value="#user.name"/>/datum">资料</a></li>		
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
								<a href="${pageContext.request.contextPath}/application" target="_blank" >注册</a>
							</div>
						</s:if>
						<s:else>
							<strong><a  href="${pageContext.request.contextPath}/user/space/${sgin}/">${sgin}</a></strong>			
							<img width="25px" height="25px" src="/myHome/load/download_getSmallPhoto?id=${id}" >				
						</s:else>		
					</div>
				</div>
				<%@include file="../plugs_jsp/music_jsp.jsp" %>
			</div>
			
			<div class="mypage_img">
				<img width=1000px height=300px; alt="bg" src="/myHome/image/1.jpg">
			</div>
			<div class="my_Info_display">
				<div class="user_page_photo">	
					<s:if test="#authority==1">
						<s:a action="user_userPhoto" id="modify_user_photo" target="_blank">修改头像</s:a>
					</s:if>	
					<img width=180px height=180px alt="用户头像" src="/myHome/load/download_getBigPhoto?id=<s:property value="#user.id"/>"/>
					
					<ul>		
						<li><a href="<s:url action="user_myFollwer" />"><strong><s:property value="#user.followUsers.size()"/></strong>关注</a></li>
						<li><a href="<s:url action="user_myFlans" />"><strong><s:property value="#user.fansUsers.size()"/></strong>粉丝</a></li>
						<li><a href="/myHome/user/space/<s:property value="#user.name"/>/diary">
						<strong><s:property value="#logcount"/></strong>日记</a></li>
					</ul>
				</div>
				<div class="home_user_message" >
					<span style="font: 20px/30px 'Microsoft Yahei';color: #423009;"><s:property value="#user.userBaseDatum.name"/></span>
					<s:if test="#authority==1">
						<a  href="/myHome/user/user_datum" id="user_message_bt" style="float: right;" target="_blank">编辑个人资料</a>
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
									url:"/myHome/friends/friends_addFirend",
									method : 'get',
									async : true,
									message : {
										'addUserId':evt.rel
									},
									run:function(text){
									    if("you login has expired"){
									    	login();
									    }else if(text=="{'add':'ok'}"){
											notice("关注成功");
										}else{
											notice("关注失败");
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
											notice("成功加入黑名单");
										}else{
											notice("加入黑名单失败");
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
			<script type="text/javascript">
			function login(){
				$Base('#miniMusic_userName').empty();
				$Base('#miniMusic_password').empty();
				$Base('#login_view').setCenter().show();
				$Base('#lock').lock().active({
					attr : 'o',target : 30,t : 30,step : 10});
				
			}
					try {
		// 进行登录	
		$Base('#headLogin').event('click', login);
		// 浏览器大小被改变
		$Base('#login_view').resizeCenter(function() {
			$Base('#lock').css({
				'height' : (viewInner().height+getScroll().top + 'px'),
				'width' : (viewInner().width +getScroll().left+ 'px')
			});
		});
		// 取消登陆
		$Base('#close_login').event("click", function() {
			$Base('#lock').active({
				attr : 'o',target : 0,t : 30,step : 10,
				fn : function() {$Base('#lock').unlock();}});
			$Base('#login_view').hide();
		});
		$Base("#login_button").event("click",function() {
			var that=this;		
			$Base(that).value("正在登录…");
			this.disabled=true;
			stateAjax({url : "/myHome/user/check_login",
			method : 'post',async : true,message : {'user.name' : $Base('#miniMusic_userName').value(),
			'user.password' : $Base('#miniMusic_password').value(),
			'expiry':document.getElementById("is_auto").checked ? 7:0
			},
			run : function(text) {		
				try {
					var json=JSON.parse(text);
					var temp=$Base(".user_message").removeAll();
					temp.innerHTML("");
					$Base(that).value("登录成功");
				
					var userphoto=document.createElement("img");
					userphoto.setAttribute("width","25px");
					userphoto.setAttribute("height","25px");
					userphoto.setAttribute("src","/myHome/load/download_getSmallPhoto?id="+json.id);
				
					temp.innerHTML("<strong><a  href='/myHome/user/space/"+json.name+"/'</a>"+ json.name+"</strong>");		
					temp.appendChild(userphoto);
					$Base('#lock').active({
						attr : 'o',target : 0,t : 30,step : 10,
						fn : function() {$Base('#lock').unlock();}});
					$Base('#login_view').hide();
				} catch (e) {
					$Base(that).value("登录失败");
				}
				that.disabled=false;
			}});
		});
	} catch (e) {
	}
			</script>	
		</div>
	</body>
</html>