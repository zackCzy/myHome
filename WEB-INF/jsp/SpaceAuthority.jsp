<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String basePath = request.getContextPath();
	String path=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+basePath+"/myHome"; 
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>空间_访问受限</title>
	</head>
	<style type="text/css">
body,h1,input,a,div{
	margin: 0;
	border: 0 none;
	padding: 0;
}

body {
	background: url("${pageContext.request.contextPath}/image/sginBg.png");
}

.register_check {
	width: 800px;
	height: 380px;
	margin: 60px auto;
	background: #FAFAFA;
	border: 1px solid #DCDCDC;
	box-shadow: 6px 6px 4px rgba(0, 0, 0, 0.05), 10px 10px 6px
		rgba(0, 0, 0, 0.3);
}

h1,a {
	width: 50%;
	height: 30px;
	color: #787878;
	text-align: left;
	text-indent: 25px;
	line-height: 30px;
	font-size: 15px;
	display: block;
	text-decoration: none;
	float: left;
}

a {
	color: #423009;
	font-size: 23px;
	font-weight: bold;
	margin: 0;
	height: 50px;
}

a:hover {
	color: #5CAAE6;
	text-decoration: underline;
}

#space_possword {
	width: 170px;
	height: 20px;
	font-size: 15px;
	line-height: 15px;
	border: 1px solid #DEDEDE;
	margin: 10px 0 0 20px;
	padding: 5px 10px;
	line-height: 22px;
	float: left;
	color:#787878;
}

#space_possword:hover,#space_possword:focus {
	border: 1px solid #5CAAE6;
}

.register_check img {
	width: 180px;
	height: 180px;
	border-radius: 180px;
	border: 2px solid #5caae6;
	box-shadow: 1px 4px 4px rgba(0, 0, 0, 0.05), 2px 3px 5px
		rgba(0, 0, 0, 0.3);
	float: left;
	margin: 20px 0 0 30px;
}

#isOk_possword {
	width: 150px;
	height: 30px;
	background: #86BFEC;
	border-radius: 30px;
	border:1px solid #D8D8D8;
	margin: 20px 0 15px 35px;
	float: left;
	cursor: pointer;
	float: left;
		box-shadow: 3px 3px 2px rgba(0, 0, 0, 0.05), 5px 5px 3px
		rgba(0, 0, 0, 0.1);
}

#error_possword,#inut_possword{
	text-indent: 18px;
	font-size: 14px;
	width: 170px;
	height: 32px;
	position: relative;
	top: 154px;
	left: 448px;
	padding: 0 15px;
	line-height:32px;
	display: block;
	float: none;
}
</style>
	<body>
		<div class="register_check">
			<div
				style="margin: 0 0 10px; font-family: '微软雅黑', '宋体'; border-bottom: 4px solid #FF4700; font-size: 18px; font-weight: bold; color: #787878; width: 100%; height: 54px; background: url('${pageContext.request.contextPath}/image/tog_contact_bg.gif'); line-height: 56px; text-indent: 20px">
				空间_访问受限
			</div>
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

			<img src="${pageContext.request.contextPath}/load/download_getBigPhoto?id=1" />
			<s:form action="/user/space/%{#user.name}/spaceChackAuthority">
				<s:a>
					<s:property value="#user.userBaseDatum.name" />
					<hr style="width: 92%;" />
				</s:a>
				<h1>
					主人设置了访问权限
				</h1>
				<h1>
					您需要回答密码才能进入！
				</h1>
				<s:hidden name="spaceName" value="%{#user.name}" />
				<s:password  id="space_possword" name="spacePossWord" ></s:password>
				<s:hidden name="accessPath" value="%{#accessPath}" />
				<br />
				<s:submit value="确定" id="isOk_possword"></s:submit>
			</s:form>
		</div>
	</body>
</html>