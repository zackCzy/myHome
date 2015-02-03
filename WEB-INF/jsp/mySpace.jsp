<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<%@taglib uri="/myHome" prefix="mini"%>
<%
	String basePath = request.getContextPath();
	String path=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+basePath; 
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<link rel="stylesheet"  type="text/css" href="<%=path%>/CSS/public/main.css">
		<link rel="stylesheet" type="text/css" href="<%=path%>/CSS/myspace.css">
		<script type="text/javascript" src="<%=path%>/JS/tool/span.js"></script>
		<script type="text/javascript" src="<%=path%>/JS/tool/base.js"></script>
		<script type="text/javascript" src="<%=path%>/JS/tool/plug_Base.js"></script>
		<script type="text/javascript" src="<%=path%>/JS/tool/active_Base.js"></script>
		<script type="text/javascript" src="<%=path%>/JS/tool/Ajax.js"></script>
		<script type="text/javascript" src="<%=path%>/JS/space.js"></script>
		<title><s:property value="#user.userBaseDatum.name"/>的空间_Viki空间</title>
	</head>
	<body>
		<div style="width:1200px;margin:0 auto; position: relative;">
		<h1><a id="user_slef_id" rel="<s:property value="#user.id"/>" href="<%=path%>/user/user_space?acc=<s:property value="#user.name"/>"><span ><s:property value="#user.userBaseDatum.name"/></span>的空间</a></h1>
		<div class="userMessage">
			<div class="userHead"><img style="width:160px;height:140px;margin:0px auto;display: block;" alt="用户头像" src="<%=path%>/load/download_getBigPhoto?id=<s:property value="#user.id"/>"></div>
			<a class="Upload" href="<%=path%>/user/user_spaceUserPhoto">上传头像</a>
			<a id="username"><s:property value="#user.userBaseDatum.name"/></a>	
			<span>性别：<s:property value="#user.userBaseDatum.sex"/></span>
			<s:if test="#authority==1">
				<span>粉丝：<s:a action="user_myFlans"><s:property value="#user.fansUsers.size()"/></s:a></span>
				<span>关注：<s:a action="user_myFollwer" ><s:property value="#user.followUsers.size()"/></s:a></span>
			</s:if>
			<s:else>
				<span>粉丝：<a ><s:property value="#user.fansUsers.size()"/></a></span>
				<span>关注：<a><s:property value="#user.followUsers.size()"/> </a></span>
			</s:else>
			<hr style="background: #DDDDDD; margin: 4px; border: 1px solid #999999;">
			<s:if test="#authority==1">
				<ul>
					<li><s:a action="function_cteateDiary">写日记</s:a></li>
					<li><s:a action="user_draft">草稿箱</s:a></li>
					<li><s:a action="user_recycled">回收站</s:a></li>
					<li><s:a action="user_datum">设置</s:a></li>
					<li><a>建议</a></li>
				</ul>
			</s:if>
			<s:if test="#authority==0">
				<ul>
					<li><a href="#">查看主人资料</a></li>
					
					<li><s:a action="/user/user_space?">
							<s:param name="acc" >${sgin}</s:param>
					返回我的空间</s:a></li>
					<li ><s:a action="function_cteateDiary">发布我的日记</s:a></li>
					<li id="add_friend" style="line-height:25px;"><a><b style="color:#FF4700;font-size:22px;line-height:30px;">+</b>关注他(她)</a></li>
					<li ><a>建议</a></li>
				</ul>
			</s:if>
		</div>
		<div id="returnHead"></div>
		<div class="displayArea">
			<s:if test="#userlogs.size()<=0">		<%-- 如果用户没有内容 显示改内容 --%>	
				<div class="userNotice">
					<s:if  test="#authority==1">
						<h2>你还没有发布过内容哦！<s:a action="function_cteateDiary">发点什么吧!</s:a></h2>
					</s:if>
					<s:else>
						<h2>用户很懒,目前什么都没有发布!<a href="<%=path%>/user/function_cteateDiary">快去通知他吧</a></h2>
					</s:else>
				</div>
			</s:if>
			
			<s:iterator value="#userlogs" var="log"><%--显示用户内容 --%>	
					<div class="diaryArea">				
						<div class="dateElement">
							<span>
								<s:property value="modifyDate.getDate()<10? '0'+modifyDate.getDate():modifyDate.getDate()"/>
								<br>
								<b style="font-size: 13px;">
									<s:property value="modifyDate.getMonth()+1"/>/
									<s:property value="modifyDate.getYear()+1900"/>
								</b>
							</span>
						</div>
						<div class="diaryContent"><%--日记内容 --%>	
							<h2 ><s:property value="logName" default="未命名"/></h2>
							<s:if test="noHtmlLog.length()>250"><%--日记内容大于250字 --%>	
								<div style="width:625px;height:auto;text-indent:2em;padding:10px 20px"><s:property value="noHtmlLog" escape="true"/></div>		
							</s:if>	
							<s:else ><%--日记内容固定高度 --%>	
								<div style="width:100%;height:120px;text-indent:2em;"><s:property value="noHtmlLog" escape="true"/></div>		
							</s:else>							
							<div class="userAction">
								<a href="<%=path%>/user/function_readDiary?userId=<s:property value="id" />">阅读全文</a>
								<a class="mycomment">评论(<b ><s:property value="com.size()"/></b>)</a>
								<s:if test="#authority==1">
									<a href="<%=path%>/user/function_modifyDiary?userId=<s:property value="id" />">编辑</a>
									<a href="<%=path%>/user/function_removeDiary?userId=<s:property value="id" />">删除</a>
								</s:if>
							</div>
							
							<div class="comment" ><a name="com"></a>
								<input type="hidden" value="<s:property value="id" />" >
								<h5>评论：</h5>
								<div class="commentArea" contenteditable="true"></div>
								<input type="button"  value="评论" class="sendComment">
								<div class="displayComment">
									<s:iterator value="#log.com" var="comment">	
										<div class="smallCom">	
											<span><img  src="<%=path%>/load/download_getSmallPhoto?id=<s:property value="comUser.id"/>"></span><b><s:property value="comUser.UserBaseDatum.name"/>:</b><div ><s:property value="content" escapeHtml="false"/></div>
											<strong><s:property value="date"/>
												<s:if test="#authority==1">
													<a title='<s:property value="id"/>'>删除</a>
												</s:if>
											</strong>
										</div>
									</s:iterator>				
								</div>
								<b class="cut_out">↑&nbsp;收起</b>
							</div>
							
						</div>
						
						<input type="hidden" value="${id}"  id="space_user_id">
						<input type="hidden" value="${sgin}"  id="space_user_name">
					</div>
					<div style="clear: both;width:600px;"></div>
				
			</s:iterator>
			
		</div>
		</div>
	</body>
</html>