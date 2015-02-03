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
		<link rel="stylesheet"  type="text/css" href="<%=path %>/CSS/public/main.css">
		<link rel="stylesheet"  type="text/css" href="<%=path %>/CSS/draftBox.css">
		<script type="text/javascript">
			BASE_PATH="<%=path %>";
		</script>
		<script type="text/javascript" src="<%=path %>/JS/tool/span.js"></script>
		<script type="text/javascript" src="<%=path %>/scripts/jquery-1.10.1.js"></script>
		<script type="text/javascript" src="<%=path %>/JS/plugObject/notice.js"></script>
		<script type="text/javascript" src="<%=path %>/JS/tool/JQ_plugs.js"></script>
		<script type="text/javascript" src="<%=path %>/JS/draftBox.js"></script>
		<title>${sgin}_的草稿箱</title>
	</head>
	<body>
		<%@ include file="/WEB-INF/jsp/head.jsp"%>
			<div class="draftBox">
				<h2 class="draft_title">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;草稿箱&nbsp;(&nbsp;<span><s:property value="#userlogs.size()"/> </span>&nbsp;)<a href="<%=path %>/user/function_cteateDiary">返回发布页</a></h2>
				<hr style="width:750px;margin:20px auto 0;border:1px solid #9EC8F5;">
				<div class="draftRow">
					<ul>
						<s:iterator value="#userlogs" var="log">	
							<li><b><s:property value="logName" default="未命名"/></b>
							<a class="recovery" href="<%=path %>/user/function_modifyDiary?userId=<s:property value="id" />">编辑</a>
							<a class="delectDraft" title="<s:property value="id" />">删除</a><span><s:property value="modifyDate.getMonth()+1"/>
							-<s:property value="modifyDate.getDate()"/> 
							<s:property value='modifyDate.getHours()<10? "0" +modifyDate.getHours():modifyDate.getHours()'/>:
							<s:property value='modifyDate.getMinutes()<10? "0" +modifyDate.getMinutes():modifyDate.getMinutes()'/></span></li>
						</s:iterator>
					</ul>
				</div>
			</div>
	</body>
</html>