<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<style  type="text/css" >
	*:focus{outline:none;}
	#loginUi {
		width: 435px;
		height: 365px;
		background: url("${pageContext.request.contextPath}/image/loginUI.png") no-repeat;
		position: absolute;
		display: none;
		z-index: 10000;
	}
	#loginUi h3 {
		margin: 0 auto 23px;
		width: 359px;
		height: 50px;
		cursor: move;
	}
	.point{
		width:279px;
		height:50px;
		display: block;
		margin:0 auto;
		text-align: center;
		line-height:40px;
		color:#FF5350;
		font-weight: bold;
		font-size:14px;
	}
	#loginUi .userLogin,#loginUi .passLogin {
		width: 320px;
		margin: 0 auto 31px;
		height: 30px;
	}
	#loginUi .sbuttonLogin {
		width: 330px;
		margin: 50px auto 20px;
	}
	
	#loginUi .loginFoot {
		text-align: right;
		font-size: 13px;
		color: #bbb;
	}
	#loginUi  .loginFoot a {
		color: #ECECEC;
		text-decoration: none;
	}
	
	#loginUi  .loginFoot a:hover {
		text-decoration: underline;
	}
	
	#loginUi .sendLogin,#loginUi .cancelLogin {
		width: 144px;
		height: 50px;
	}
	
	#loginUi .sendLogin {
		margin: 0 0 0 15px;
		background: url(${pageContext.request.contextPath}/image/login_button.png) no-repeat;
		cursor: pointer;
	}
	
	#loginUi .sendLogin:hover {
		background: url(${pageContext.request.contextPath}/image/login_button2.png) no-repeat;
	}
	
	#loginUi .cancelLogin {
		margin-left: 10px;
		background: url(${pageContext.request.contextPath}/image/login_button3.png) no-repeat;
		cursor: pointer;
	}
	
	#loginUi .cancelLogin:hover {
		background: url(${pageContext.request.contextPath}/image/login_button4.png) no-repeat;
	}
	
	#loginUi .textLogin {
		width: 230px;
		height: 30px;
		padding: 0 10px;
		line-height: 35px;
		font-size: 17px;
		letter-spacing: 1px;
		font-weight: bold;
		color: #097BD8;
		border: 0;
		margin-left: 65px;
		background: #f8f8f8;
	}
	#lock {
		display: none;
		position: absolute;
		background: #000;
		opacity:0;
		filter:alpha(opacity=0);
		z-index: 500;
	}
</style>
<div id="loginUi">
	<h3 id="loginMove"></h3>
	<span class="point"></span>
	<form action="${pageContext.request.contextPath}/translator" method="get" name="sgin">
		<div class="userLogin">
			<input type="text" name="userText" class="textLogin" id="userText">
		</div>
		<div class="passLogin">
			<input type="password" name="passwordText" class="textLogin"
				id="passwordText" />
		</div>
		<div class="sbuttonLogin">
			<input type="button" name="sendLogin" value="" class="sendLogin"
				id="sendlLogin" />
			<input type="button" name="cancelLogin" value="" class="cancelLogin"
				id="cancelLogin" />
		</div>
		<div class="loginFoot">
			<a href="#">忘记密码了?</a>&nbsp;|&nbsp;
			<a href="${pageContext.request.contextPath}/user_log_on">注册新账号</a>&nbsp;|&nbsp;
			<a href="#">建议反馈</a>&nbsp;&nbsp;
		</div>
	</form>
</div>
<div id="lock"></div>
<script type="text/javascript">
	// 进行登录	
	$Base('#headLogin').event('click', function() {
		$Base('#userText').empty();
		$Base('#passwordText').empty();
		$Base('#lock').lock().active({
			attr : 'o',target : 30,t : 30,step : 10});
		$Base('#loginUi').center().show();
	});
	// 浏览器大小被改变
	$Base('#loginUi').resizeCenter(function() {
		$Base('#lock').css({
			'height' : (viewInner().height+getScroll().top + 'px'),
			'width' : (viewInner().width +getScroll().left+ 'px')
		});
	}).Move(document.getElementById("loginMove"));
	// 取消登陆
	$Base('#loginUi #cancelLogin').event("click", function() {
		$Base('#lock').active({
			attr : 'o',target : 0,t : 30,step : 10,
			fn : function() {$Base('#lock').unlock();}});
		$Base('#loginUi').hide();
	});
	$Base("#sendlLogin").event("click",function() {
		var that=this;
		var temp=$Base(".point").css({background : "url(${pageContext.request.contextPath}/image/pointAlert.png) no-repeat 35px 10px",color:"#A9C50B"}).innerHTML("正在登录……");
		if(!that.time){
			that.time=setTimeout(function(){
				stateAjax({url : "${pageContext.request.contextPath}/user/check_login",
				method : 'post',async : true,message : {'user.name' : document.forms['sgin'].userText.value,
				'user.password' : document.forms['sgin'].passwordText.value},
				run : function(text) {
					if (text.isEmpty()!="sgin is error") {
						document.forms['sgin'].passwordText.value=text;
						$Base(".point").css({background : "url(${pageContext.request.contextPath}/image/pointYes.png) no-repeat 35px 10px",color:"#A9C50B"}).innerHTML("登录成功……");
						setTimeout(function(){document.forms['sgin'].submit();}, 500);
					} else {
						temp.css({background : "url(${pageContext.request.contextPath}/image/pointError.png) no-repeat 35px 10px",color:"#FF5350"}).innerHTML("用户名、密码不正确!");
						setTimeout(function(){temp.css({background : ""}).innerHTML("");}, 1000);
					}
					that.time=null;
				}
				});
			},500);
		}
	});
</script>