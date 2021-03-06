<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@include file="../meta/indexMeta.jsp"%>
		<title>Viki-个人设置</title>
		<link rel="stylesheet" type="text/css" href="<%=path %>/CSS/public/main.css">
		<link rel="stylesheet" type="text/css" href="<%=path %>/CSS/message.css">
		<script type="text/javascript">
			BASE_PATH="<%=path %>";
		</script>
		<script type="text/javascript" src="<%=path %>/JS/tool/span.js"></script>
		<script type="text/javascript" src="<%=path %>/scripts/jquery-1.10.1.js"></script>
		<script type="text/javascript" src="<%=path %>/JS/plugObject/notice.js"></script>
		<script type="text/javascript" src="<%=path %>/JS/tool/JQ_plugs.js"></script>
		<script type="text/javascript" src="<%=path %>/JS/message.js"></script>
	</head>
	<body>
		<%@ include file="/WEB-INF/jsp/head.jsp"%>
		<div class="messCentent">
			<h1>个人设置</h1>			
			<div class="messNav">
				<div class="personal">
					<span id="userMessage">个人资料</span>
					<ul id="userMessList">
						<li><a href="<%=path %>/user/user_datum">基本资料</a></li>
						<li><a href="<%=path %>/user/user_dails">详细资料</a></li>
						<li><a href="<%=path %>/user/user_dails">兴趣爱好</a></li>
						<li><a href="<%=path %>/user/user_education">教育背景</a></li>
						<li><a href="<%=path %>/user/user_workDatum">工作信息</a></li>
						<li><a href="<%=path %>/user/user_userPhoto">头像设置</a></li>
					</ul>
				</div>
				<div class="personal">
					<span id="PrivacyStt">隐私设置</span>
					<ul id="PrivacySttList">
						<li><a href="<%=path %>/user/user_spaceDatum">我在空间</a></li>
						<li>我在词典</li>
						<li>我在相册</li>
						<li>我在论坛</li>
					</ul>
				</div>
			</div>
			
			<div class="message">
				<form action="" name="myform">
					<s:if test="#datum">
						<%@include file="/WEB-INF/jsp/UserDatum.jsp" %>
				   </s:if>
				   <s:if test="#dails">
						<%@include file="/WEB-INF/jsp/UserBaseDails.jsp" %>		
				   </s:if>
					<s:if test="#workDatum">
						<%@include file="/WEB-INF/jsp/workDatum.jsp" %>
				   </s:if>
					<s:if test="#education">
						<%@include file="/WEB-INF/jsp/education.jsp" %>
				   </s:if>
				   	<s:if test="#spaceDatum">
						<%@include file="/WEB-INF/jsp/SpaceDatum.jsp" %>
				   </s:if>
				   	<script type="text/javascript">
				   	$(".cus-sel-opt-ctn li").on("click", clickSelect);	
					function clickSelect() {
						$(this.parentNode).prev().html(this.innerHTML);
						$(this.parentNode).hide();
					}
					</script>
				</form>
				<s:if test="#userPhoto">
						<div class="UserPhotoMess">
							<h2>${sgin}_头像修改</h2>
							<s:action name="user_photo"  executeResult="true"  ></s:action>
						</div>
						<script type="text/javascript">
					   		$("#userMessList li:nth-child(6)").className("personal_hover");
						</script>
			    </s:if>
			</div>
		</div>
	</body>
</html>