<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<link type="text/css" rel="stylesheet"  href="/myHome/CSS/SearchSpace.css">
		<script type="text/javascript" src="${pageContext.request.contextPath}/JS/tool/base.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/JS/tool/plug_Base.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/JS/tool/active_Base.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/JS/tool/span.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/JS/searchSpace.js"></script>
		<title>Insert title here</title>
	</head>
	<body>
		<%@ include file="/WEB-INF/jsp/head.jsp"%>
		<div class="search_message_area">
			<div class="cus-sel-opt-panel">
					<span>找人</span>
					<ul class="cus-sel-opt-ctn">
						<li >找人</li>
						<li >V说</li>
						<li >博客</li>
					</ul>
			</div>
			<input type="text" />
			<input type="button" />
		</div>
		<div class="display_stand">
			<div class="search_display_list">
			123
			</div>
		</div>
	</body>
</html>