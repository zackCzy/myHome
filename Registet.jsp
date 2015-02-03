<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<link rel="stylesheet" type="text/css"
			href="/myHome/CSS/public/main.css" />
		<link rel="stylesheet" type="text/css" href="/myHome/CSS/register.css" />
		<script type="text/javascript" src="/myHome/JS/tool/span.js"></script>
		<script type="text/javascript" src="/myHome/JS/tool/base.js"></script>
		<script type="text/javascript" src="/myHome/JS/tool/plug_Base.js"></script>
		<script type="text/javascript" src="/myHome/JS/tool/active_Base.js"></script>
		<script type="text/javascript" src="/myHome/JS/tool/Ajax.js"></script>
		<script type="text/javascript" src="/myHome/JS/register.js"></script>
		<title>Mini_注册</title>
	</head>
	<body>
		<div style="margin: 30px auto; width: 1000px;">
			<h1>
				账号注册
			</h1>
			<div class="register_box">
				<div class="register_nav">
					<ul>
						<li >
							<b>1</b>确认用户协议
						</li>
						<li>
							<b>2</b>设置登录账号
						</li>
						<li>
							<b>3</b>填写基本信息
						</li>
						<li>
							<b>4</b>注册账号成功
						</li>
					</ul>
				</div>
				<div style="margin:14px 0;height: 547px; width: 3px; float: left;border-right: 2px dashed #CCC;">

				</div>
				<div class="mini_register_rm">
					<div class="mini_rules">
						<br>
						<h3 style="text-align: center;">《 微博服务使用协议 》</h3>	<br>
						<p>
						&nbsp;&nbsp;北京微梦创科网络技术有限公司、微梦创科网络科技（中国）有限公司及相关关联企业（以下合称"微梦公司"）同意按照本协议的规定及其不时发布的操作规则提供基于互联网以及移动网的新浪网微博客服务（以下称"微博服务"），为获得微博服务，微博服务使用人（以下称"用户"）应当基于了解本协议全部内容，在独立思考的基础上认可、同意本协议的全部条款并按照页面上的提示完成全部的注册程序。用户在进行注册程序过程中点击"同意"
						按钮即表示用户完全接受《新浪网络服务使用协议》、《微博服务使用协议》、《微博社区公约（试行）》及微梦公司公示的各项规则、规范。 1.2
						用户注册成功后，微梦公司将为用户基于微博服务使用的客观需要而在申请、注册微博服务时，按照注册要求提供的帐号开通微博服务，用户有权在微梦公司为其开通、并同意向其提供服务的基础上使用微博服务。该用户帐号和密码由用户负责保管；用户使用微博服务过程中，须对自身使用微博服务的行为，对任何由用户通过微博服务服务发布、公开的信息，及对由此产生的任何后果承担全部责任。用户提交、发布或显示的信息将对其他微博服务用户及第三方服务及网站可见(用户可通过设置功能自行控制、把握可查阅其信息的帐号类型)。
						</p>
							<br>
						<p>
						  &nbsp;&nbsp;用户同意，对于微梦公司向用户提供的下列产品或者服务的质量缺陷本身及其引发的任何损失，微梦公司无需承担任何责任： 7.5.1
						微梦公司向用户免费提供的微博服务； 7.5.2 微梦公司向用户赠送的任何产品或者服务； 7.5.3
						微梦公司向收费微博服务用户附赠的各种产品或者服务。 7.6
						用户知悉并同意，微梦公司可能会与第三方合作向用户提供产品（包括但不限于游戏、第三方应用等）并由第三方向用户提供该产品的升级、维护、客服等后续工作，由该等第三方对该产品的质量问题或其本身的原因导致的一切纠纷或用户损失承担责任，用户在此同意将向该第三方主张与此有关的一切权利和损失。
							<br><br>
						<p>
						&nbsp;&nbsp;微博依据并贯彻中华人民共和国法律法规、政策规章及司法解释之要求，包括但不限于《全国人民代表大会常务委员会关于加强网络信息保护的决定》、《最高人民法院最高人民检察院适用法律若干问题的解释》等文件精神，制定《
						微博服务使用协议 》。 11.2 本协议的订立、执行和解释及争议的解决均应适用中国法律并受中国法院管辖。 11.3
						如双方就本协议内容或其执行发生任何争议，双方应尽量友好协商解决；协商不成时，任何一方均可向微梦公司所在地的人民法院提起诉讼。 12.
						其他规定 12.1 本协议构成双方对本协议之约定事项及其他有关事宜的完整协议，除本协议规定的之外，未赋予本协议各方其他权利。 12.2
						如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款仍应有效并且有约束力。 12.3
						本协议中的标题仅为方便而设，在解释本协议时应被忽略。
						</p>
					</div>
					<div class="mini_user_base_datum" >
						<input type="hidden" value="${token}"  name="token"/>
						<table style="margin:70px 100px;" width=350px height=300px>
							<tr>
								<td style="text-align: right;">登录账号<b>*</b></td>
								<td style="position: relative;">
									<input type="text" id="user_account"/>
									<div class="point_info"></div>
								</td>
							</tr>
							<tr>
								<td style="text-align: right;">电子邮箱<b>*</b></td>
								<td style="position: relative;">
									<input type="text" id="user_email"/>
									<div class="point_info"></div>
								</td>
							</tr>
							<tr>
								<td style="text-align: right;">密码<b>*</b></td>
								<td style="position: relative;">
									<input type="text" id="user_possword"/>
									<div class="poss_point_info" id="poss_point_info">
										<span>安全级别</span><b id="grade_one"></b><b id="grade_two"></b><b id="grade_three"></b><em></em><br>
										<strong style="width:16px;height:16px;margin:5px 0 0 15px;color:#666;" id="number_ok">○</strong><strong style="margin-top:5px;">8-20个字符</strong><br>
										<strong style="width:16px;height:16px;margin:5px 0 0 15px;color:#666;" id="format_ok">○</strong><strong style="margin-top:5px;">包含字母和数字组成和非空字符</strong>
									</div>
									<div class="point_info" id="poss_point_info2"></div>
								</td>
							</tr>
							<tr>
								<td style="text-align: right;">确认密码<b>*</b></td>
								<td  style="position: relative;">
									<input type="text" id="user_possword_fixwrod"/>
									<div class="point_info"></div>
								</td>
							</tr>
							<tr>
								<td style="text-align: right;">验证码<b>*</b></td>
								<td  style="position: relative;"width=80px>
									<input type="text" style="width:80px;float: left;" id="user_code"/>
									<img width=100px height=35px style="margin-left:15px;background: #ff0000;display: block;float: left;" src="${pageContext.request.contextPath}/user/check_mycode" id="imgCode" alt="点击刷新"/>
								</td>
							</tr>
						</table>
					</div>
				</div>
				<div class="register_bt" >
					<input type="button" value="下一步"/>
				</div>
			</div>
		</div>
	</body>
</html>