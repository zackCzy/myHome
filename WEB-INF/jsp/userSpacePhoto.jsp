<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<style type="text/css">
.body,h2{
	margin:0;
	border:0 none;
	padding:0;
}
.UserPhotoMess{
	width:600px;
	height:500px;
	margin:40px auto 0;
	text-align: center;
}
</style>
<title>${sgin}_头像修改</title>
</head>
<body>
	<%@ include file="/WEB-INF/jsp/head.jsp"%>	
	<div class="UserPhotoMess">
					<h2>${sgin}_头像修改</h2>
					<iframe align="top" width="790px" height="670px" src="user_photo"></iframe>
	</div>
</body>
</html>