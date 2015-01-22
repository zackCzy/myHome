<%@page import="java.util.Calendar"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<title>Mini 用户注册</title>
		<meta http-equiv="keywords" content="Mini,用户,注册,登录" />
		<meta http-equiv="description" content="Mini用户注册" />
		<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
		<meta http-equiv="referer" content="${pageContext.request.contextPath}/application" />
		<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/CSS/public/main.css" />
		<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/CSS/userLogOn.css" />
		<script type="text/javascript" src="${pageContext.request.contextPath}/JS/tool/span.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/JS/tool/base.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/JS/tool/plug_Base.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/JS/tool/active_Base.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/JS/tool/Ajax.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/JS/RegisterUser.js"></script>

	</head>
	
	<body>
		<%@ include file="/WEB-INF/jsp/head.jsp" %>		
		<div class="logo">
			<b>Mini</b>账号注册	
		</div>	
		<div id="nav">
			<div class="navLine clearFix"">
				<ul class="navList clearFix">
					<li id="first" >
						<i>1</i>
						<span>设置登录账号</span>
					</li>
					<li id="two" style="position: relative;">
						<i>2</i>
						<span>填写账号信息</span>
						<div class="regload">
							正在注册请稍后…
						</div>
					</li>
					<li id="third">
						<i>3</i>
						<span>恭喜注册成功</span>
					</li>
				</ul>
			</div>
	
		</div>
		<form action="myHome/translator" method="post" class="formMssc" name="register">
			<input type="hidden" value="${token}"  name="token"/>
			<div class="setting clearFix" id="settingAccount">
				<div style="height:20px" ></div>
				<div class="area" style="margin-top:30px;">
					<span>所在国家/地区</span>
					<select name="country">
						<option value="CN" selected="selected" id="areaDefault" >
							中国大陆
						</option>
						<option value="HK">
							香港
						</option>
						<option value="MO">
							澳门
						</option>
						<option value="KO">
							韩国
						</option>
						<option value="JPN">
							日本
						</option>
						<option value="USA">
							美国
						</option>
						<option value="Ca">
							加拿大
						</option>
					</select>
				</div>
				<div class="area">
					<span>设置账号<b>*</b></span>
					<input type="text" name="user" maxlength=16/>
					<div id="userError"></div>
				</div>
				<div class="area">
					<span>设置密码<b>*</b></span>
					<input type="password" name="password" maxlength=16/>
					<div id="passError"></div>
				</div>
					
				<div class="area">
					<span>确认密码<b>*</b></span>
					<input type="password" name="passFixword" maxlength=16/>
					<div id="passFixError"></div>
				</div>
				<div class="area">
					<span>电子邮箱<b>*</b></span>
					<input type="text" name="email" />
					<div id="emailError"></div>
				</div>
													
				<div class="area">
						<span>验证码<b>*</b></span>
						<input type="text" name="code" id="code" maxlength=4/>
						<img src="${pageContext.request.contextPath}/user/check_mycode" id="imgCode" alt="点击刷新"/>
						<div id="codeError"></div>
				</div>
				<div class="check">
					<input type="checkbox"  name="protocol" />
					&nbsp;&nbsp;同意
					<a href="#">《Mini 服务协议》</a>
				</div>
				<div class="check">
					<input type="button" id="swtich" value="下一步" />
				</div>
			</div>

			<div class="setting" id="settingMessage">
				<div style="height:50px" ></div>
				<div class="message">
					<span>我是:</span>
					<div class="selectSex">
						<select name="sex" >
							<option selected="selected" value="男">男
							</option>
							<option value="女">女
							</option>
							<option value="保密">保密
							</option>
						</select>
					</div>
				</div>
				<div class="message" >
					<span>我的生日:</span>
					<div class="birArea">
						<select name="year" style="outline:none">
							<option selected="selected" value="1970" >1970</option>						
						</select>
					</div>
					<div class="birArea">
					<select name="month">
						<option selected="selected" value="1" >1</option>	
					</select>
					</div>
					<div class="birArea">
					<select name="day">
						<option selected="selected" value="1" >1</option>
					</select>
					</div>
				</div>			
				<div class="message">
					<span>我的身份:</span>
					<div class="selectSex" >
						<select name="vocation" >
							<option  selected="selected" value="未知">选择身份
							</option>
							<option value="白领">白领
							</option>
							<option value="IT人员">IT人员
							</option>
							<option value="医生">医生
							</option>
							<option value="学生">学生</option>
							<option value="自由职业">自由职业</option>
							<option value="其他">其他</option>
						</select>
					</div>
				</div>
				
				<div class="message">
					<span >个人说明:</span>
					<textarea rows="4" cols="25" name="info" maxlength="150"></textarea>
				</div>
				<div class="message" id="sendButton">
					<input type="button" id="sendMss"/>
				</div>

			</div>
			
			<div class="setting" id="welcome">
				<div style="height:10px;"></div>
				<p style="font-size:28px;margin:75px 0 0 30px;" id="statusMss"></p>
				<p style="font-size:20px; margin-top:70px;"  id="userMss"><p>
				<p style="font-size:16px;margin-top:30px;" id="pointMss"><p>
				<div class="contentReturn">
					<a id="returnHome" target="_parent"></a>
					
					<a href="${pageContext.request.contextPath}/home"  target="_parent">返回首页</a>
				</div>
			</div>
		</form>
	</body>
</html>