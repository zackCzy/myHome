<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="/struts-tags" prefix="s" %>
<%
	String basePath = request.getContextPath();
	String path=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+basePath+"/myHome/"; 
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<link rel="stylesheet" type="text/css" href="<%=path%>/CSS/public/main.css">
		<link rel="stylesheet" type="text/css" href="<%=path%>/CSS/readDiray.css">
		<script type="text/javascript" src="<%=path%>/JS/tool/span.js"></script>
		<script type="text/javascript" src="<%=path%>/scripts/jquery-1.10.1.js"></script>
		<script type="text/javascript" src="<%=path%>/JS/plugObject/notice.js"></script>
		<script type="text/javascript" src="<%=path%>/JS/tool/JQ_plugs.js"></script>
		<script type="text/javascript" src="<%=path%>/JS/readDiray.js"></script>
		<title><s:property value="#logUser.userBaseDatum.name"/>的空间</title>
	</head>
	<body>
		<%@ include file="/WEB-INF/jsp/head.jsp"%> 
		<h1><a title="返回<s:property value="#logUser.userBaseDatum.name"/>的空间" href="<%=path%>/user/space/<s:property value="#logUser.name"/>/"><s:property value="#logUser.userBaseDatum.name"/>的空间</a></h1>
		<div class="readArea" >
			<h2 style=" font-size: 20px;color: #454545;word-break: break-all;word-wrap: break-word;margin-bottom: 5px;height:30px;">
			<s:property value="#log.logName"/>
			<span id="modificationTime">
			<s:property value="#log.modifyDate"/>
			</span></h2>
			<s:property value="#log.logContent" escapeHtml="false"/>
			<div class="userAction">
				<a >浏览(<span><s:property value="#visitors.size()" /></span>)</a>
				<a href="#com">评论(<span id=count><s:property value="#log.com.size()"/></span>)</a>
				<s:if test="#authority==1">
					<a href="<%=path%>/user/function_modifyDiary?userId=<s:property value="userId" />">编辑</a>
					<a rel="<s:property value="userId" />"  onclick="removeLog('<s:property value="#logUser.name"/>',this)" >删除</a>
				</s:if>
			</div>
		</div>	
		<s:if test="#visitors.size()>0">
			<div id="visitor_display" >
				<b style="width:800px;margin:5px 0;display: block;color:#423009">最近访客</b>
				<hr style="width:800px;margin:5px 0;border:1px solid #787878;" >
				<ul >
					<s:iterator value="#visitors" var="visitor">
						<li title="<s:property value="userBaseDatum.name"/>">
							<a href="<%=path%>/user/space/<s:property value="name"/>/">
								<img  width=80px height=80px src="<%=path%>/load/download_getSmallPhoto?id=<s:property value="id"/>" />
								<span class="user_name"><s:property value="userBaseDatum.name"/></span>
							</a>
						</li>		
					</s:iterator>
				</ul>
				<div style="weith:100%;height:20px;display: block;"></div>
			</div>
		</s:if>
		
		<div class="comment">
			<h5>评论：</h5>
			<div id="commentArea" contenteditable="true"></div>
			<input type="button"  value="评论" id="sendComment" alt="<s:property value="#logid"/>">
			<div class="displayComment">
				<s:iterator value="#log.com" var="comment">	
					<div class="smallCom">
						<span>
							<a href="<%=path%>/user/space/<s:property value="comUser.name"/>/">
								<img  src="<%=path%>/load/download_getSmallPhoto?id=<s:property value="comUser.id"/>">
							</a>
						</span>
						<a href="<%=path%>/user/space/<s:property value="comUser.name"/>/" target="_blank">
							<s:property value="comUser.userBaseDatum.name"/>:
						</a>
						<div >
							<s:property value="content" />
						</div>
						<strong><s:property value="date"/>	
							<s:if test="#authority==1">
								<a rel='<s:property value="id"/>' class="remove_com">删除</a>
							</s:if>
						</strong>
					</div>
				</s:iterator>
			</div>
		</div>
	</body>
</html>