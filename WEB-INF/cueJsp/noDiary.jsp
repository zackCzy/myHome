<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="/struts-tags" prefix="s" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/CSS/public/main.css">
		<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/CSS/noDiary.css">
		<script type="text/javascript" src="${pageContext.request.contextPath}/JS/tool/span.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/jquery-1.10.1.js"></script>
		<title>Viki 提示</title>
	</head>
	<body>
		<%@ include file="/WEB-INF/jsp/head.jsp"%> 
		<div class="pointBox">
			 <h2>
			 	<span class="icon">!</span>
			 	<span>文章可能已经被删除</span>
			 </h2>
		</div>
	</body>
</html>