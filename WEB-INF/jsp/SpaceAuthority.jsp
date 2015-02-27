<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<%
	String basePath = request.getContextPath();
	String path=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+basePath; 
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@include file="../meta/indexMeta.jsp"%>
		<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
		<link rel="stylesheet" href="${pageContext.request.contextPath}/CSS/SpaceAuthority.css">
		<title>空间_访问受限</title>
	</head>
	<body>
		<div class="register_check">
			<h1 class="title">
				空间_访问受限
			</h1>
			<s:if test="!errors.passwordError[0].equals('')">
				<div id="error_possword" style="color: #FF4700;background: url('${pageContext.request.contextPath}/image/reg_error.png') no-repeat;">
					<s:property value="errors.passwordError[0]" />
				</div>
			</s:if>
			<s:else>
				<div id="inut_possword" style="color: #47B642;background: url('${pageContext.request.contextPath}/image/reg_info.png') no-repeat;">
					请输入密码
				</div>
			</s:else>
			<div class="span3">
				<div class="userPhoto">
					<img src="${pageContext.request.contextPath}/load/download_getBigPhoto?id=1" />
				</div>
			</div>
			<div class="span7">
				<form action="user/space/<s:property value="user.name"/>/spaceChackAuthority" method="get">
					<s:a>
						<s:property value="#user.userBaseDatum.name" />
					</s:a>
					<hr style="width:100%;" />
					<h2>
						主人设置了访问权限
					</h2>
					<h2>
						您需要回答密码才能进入！
					</h2>
					<s:hidden name="spaceName" value="%{#user.name}" />
					<s:password id="space_possword" name="spacePossWord"></s:password>
					<s:hidden name="accessPath" value="%{#accessPath}" />
					<div class="inOk-wrap">
						<input type="submit" value="确定" id="isOk_possword" >
					</div>
				</form>
			</div>
		</div>
	</body>
</html>