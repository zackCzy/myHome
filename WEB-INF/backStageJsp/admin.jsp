<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type"
			content="text/html; charset=ISO-8859-1">
		<title>Insert title here</title>
		<style type="text/css">
body,ul,li,table,th,tr,td{
	margin:0;
	padding:0;
	border:0 none;
}
.stage_head {
	width: 100%;
	height: 50px;
	min-width: 1000px;
}
.head_nav{
	width:1000px;
	height:50px;
	background:#DD5D25;
	margin:0 auto;
}
.head_nav ul{
	list-style:none;
}
.head_nav ul li{
	list-style:none;
}
.stage_body{
	width:100%;
	height:auto;
	min-width: 500px;
	background:#ececec;
}
.stage_body_table{
	width:1000px;
	min-height:500px;
	margin:0 auto;
	text-align:center;
	border:1px solid #787878;
}
</style>
	</head>
	<body>
		<div class="stage_head">
			<div class="head_nav">
				<ul>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</div>
		</div>
		<div class="stage_body">
			<table class="stage_body_table">
				<thead>
					<tr>
						<th>用户ID</th>
						<th>用户名</th>
						<th>用户状态</th>
						<th>注册时间</th>
						<th>是否在线</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<s:iterator value="#users" var="user">
						<tr>
							<td>
								<s:property value="id" default="未命名" />
							</td>
							<td>
								<s:property value="name" default="未命名" />
							</td>
							<td>
								<s:property value="Date"  />
							</td>
							<td>
								<s:property value="!active.isEmpty()? '未激活':'激活'"  />
							</td>
							<td>
								未知
							</td>
							<td><a href='../backStage/admin_removeUser?userName=<s:property value="name" default="未命名" />' target="_blank">删除</a></td>
						</tr>
					</s:iterator>
				</tbody>
			</table>
		</div>
	</body>
</html>