/**
 * 
 */
windowLoad(load);

function load() {
	function Check() {
		var str = [ , , , ,];

		Check.prototype.checkAccount = function(user) {
			if(nameflag){
				$Base('#userError').css({
					'background' : 'url(image/loading2.gif) no-repeat 5px 5px'
				}).innerHTML("");
				str[0] = user.value.length>13? Point.USER_LENGTH_ERROR:new RegExp("([^0-9A-Za-z]+)", "igm").test(user.value) ? Point.USER_UNLAWFUL_ERROR
						: user.value.replace(new RegExp('\\s*', "img"), "") == "" ? Point.USER_EMPTY_ERROR
								: user.value.length < 8 ? Point.USER_NUMBER_ERROR
										: new RegExp("([A-Za-z]+[0-9]+)|([0-9]+[A-Za-z])", "igm")
												.test(user.value) ? ""
												: Point.USER_ACCOUNT_ERROR;
				if (str[0] == "") {
					stateAjax({
						url : "/myHome/user/check_account",
						method : 'get',
						async : true,
						message : {name: user.value},
						run : function(text) {
							if (text.isEmpty() == "username is exsit") {
								nameflag=false;
								str[0] = Point.USER_ACCOUNT_EXEISTS;
							}
							$Base('#userError').css(getResult(str[0])).innerHTML(str[0]);
						}
					});
				} else {
					$Base('#userError').css(getResult(str[0])).innerHTML(str[0]);
				}
			}else {
				str[0] = Point.USER_ACCOUNT_EXEISTS;
				$Base('#userError').css(getResult(str[0])).innerHTML(str[0]);
			}
			return str[0];
		};
		Check.prototype.checkPass = function(value) {
			str[1] =new RegExp("[A-Za-z0-9]{16}", "igm").test(value) ? Point.PASS_FORMAT_ERROR: value.length<8 ? Point.PASS_NUMBER_ERROR :  value == "" ? Point.PASS_EMPTY_ERROR
					: "";
			return str[1];
		};
		Check.prototype.checkPassFix = function(value, element) {
			str[2] = value == "" ? Point.PASS_EMPTY_ERROR
					: value.length < 8 ? Point.PASS_NUMBER_ERROR
							: value != element.value ? Point.PASS_DIFFER_ERROR : "";

			return str[2];
		};
		Check.prototype.checkEmail = function(value) {
			if(emailflag){
				str[3] = value == "" ? Point.USER_EMAIL_NULL: !new RegExp("\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*").test(value)? Point.USER_EMAIL_ERROR:"";
				if (str[3] == "") {
					stateAjax({
						url : "/myHome/user/check_email",
						method : 'get',
						async : true,
						message : {email: value},
						run : function(text) {
							if (text.isEmpty() == "email is exsit") {
								str[3] = Point.USER_EMAIL_EXEISTS;
								emailflag=false;
							}
							$Base('#emailError').css(getResult(str[3])).innerHTML(str[3]);
						}
					});
				} else {
					$Base('#emailError').css(getResult(str[3])).innerHTML(str[3]);
				}
			}
			return str[3];
		};
		Check.prototype.checkCode = function(code, fn) {
			if(codeflag){
				$Base('#codeError').css({
					'background' : 'url(image/loading2.gif) no-repeat 5px 5px'
				}).innerHTML("");
				stateAjax({
					url : "/myHome/user/check_code",
					method : 'get',
					async : true,
					message : {
						code: code.value.toUpperCase()
					},
					run : fn
				});
			}
		};

		Check.prototype.check = function(account, pass, passfix,email, code, fn) {
			str[0] == undefined ? this.checkAccount(arguments[0]) : str[0];
			str[1] == undefined ? this.checkPass(arguments[1].value) : str[1];
			str[2] == undefined ? this.checkPassFix(arguments[2].value) : str[2];
			str[3] == undefined ? this.checkEmail(arguments[2].value) : str[3];
			if (str[0] != "") {
				account.focus();
			} else if (str[1] != "") {
				pass.focus();
			} else if (str[2] != "") {
				passfix.focus();
			}else if (str[3] != "") {
				email.focus();
			}  else {
				this.checkCode(code, fn);
			}
		};
	}
	function getResult(value) {
		return value == "" ? {
			'background' : 'url(image/pointYes.png) no-repeat 5px 5px'
		} : {
			'background' : 'url(image/pointError.png) no-repeat 5px 5px'
		};
	}
	var C = new Check;
	var nameflag=true;
	var codeflag=true;
	var emaiflag=true;
	$Base('#imgCode').event('click', function() {
		this.src = "/myHome/user/check_mycode?ran=" + Math.random();
	});
	$Base("textarea").empty();
	document.getElementById("areaDefault").setAttribute("selected", "selected");
	document.forms['register'].protocol.checked="";
	// 账号输入
	$Base().getName('input', 'user').getLost(function() {
		this.style.border = '1px solid #FF4700';
		$Base('#userError').css({
			'background' : 'url(image/pointAlert.png) no-repeat 5px 5px'
		}).innerHTML(Point.USER_POINT_INPUT);
	}, function() {
		this.style.border = '1px solid #DEDEDE';
		C.checkAccount(this);
	}).event("change",function(){
		nameflag=true;
	}).get(0, true).value = "";

	// 第一次密码判断
	$Base().getName('input', 'password').getLost(function() {
		this.style.border = '1px solid #FF4700';
		$Base('#passError').css({
			'background' : 'url(image/pointAlert.png) no-repeat 5px 5px'
		}).innerHTML(Point.PASS_POINT_INPUT);
	}, function() {
		this.style.border = '1px solid #DEDEDE';
		var str = C.checkPass(this.value);
		$Base('#passError').css(getResult(str)).innerHTML(str);
	}).get(0, true).value = "";

	// 第二次密码判断
	$Base().getName('input', 'passFixword').getLost(function() {
		this.style.border = '1px solid #FF4700';
		$Base('#passFixError').css({
			'background' : 'url(image/pointAlert.png) no-repeat 5px 5px'
		}).innerHTML(Point.PASS_POINT_INPUT);
	}, function() {
		this.style.border = '1px solid #DEDEDE';
		var str = C.checkPassFix(this.value, document.forms['register'].password);
		$Base('#passFixError').css(getResult(str)).innerHTML(str);
	}).get(0, true).value = "";
	
	// 邮箱判断
	$Base().getName('input', 'email').getLost(function() {
		this.style.border = '1px solid #FF4700';
		$Base('#emailError').css({
			'background' : 'url(image/pointAlert.png) no-repeat 5px 5px'
		}).innerHTML(Point.USER_EMAIL_INPUT);
	}, function() {
		this.style.border = '1px solid #DEDEDE';
		var str = C.checkEmail(this.value);
		$Base('#emailError').css(getResult(str)).innerHTML(str);
	}).event("change",function(){
		emailflag=true;
	}).get(0, true).value = "";
	// 验证码判断
	$Base().getName('input', 'code').getLost(function() {
		this.style.border = '1px solid #FF4700';
		$Base('#codeError').css({
			'background' : 'url(image/pointAlert.png) no-repeat 5px 5px'
		}).innerHTML(Point.CODE_POINT_INPUT);
	}, function() {
		this.style.border = '1px solid #DEDEDE';
		var str = C.checkCode(this, function(text) {
			text = text.isEmpty() == "code is yes" ? "" : Point.CODE_ERROR;
			$Base('#codeError').css(getResult(text)).innerHTML(text);
		});
	}).event("change",function(){
		codeflag=true;
	}).get(0, true).value = "";
	// 下一步填写信息
	$Base('#swtich')
			.event('click',function() {C.check(document.forms['register'].user,
						document.forms['register'].password,
						document.forms['register'].passFixword,
						document.forms['register'].email,
						document.forms['register'].code,
						function(text) {
								text = text.isEmpty() == "code is yes" ? "": Point.CODE_ERROR;
								$Base('#codeError').css(getResult(text)).innerHTML(text);							
								if (document.forms['register'].protocol.checked&&text=="") {
								var temp = $Base('#settingAccount').active({step : 10,t : 30,
										async : {x : -700,o : 0},fn : function() {temp.hide();
											temp2.get(0,true).style.top = '0';}});		
								var temp2 = $Base('#settingMessage').css({'left' : viewInner().width+ "px"}).show().active(
										{step : 10,t : 30,fn : function() {$Base('#two').get(0,true).id = "first";},
												async : {x : 0,o : 100}});
								}});
					});

	$Base('#sendMss').event('click',
					function() {
						var temp3 = $Base('.regload').show();
						var birthdays=document.forms['register'].year.value+"-"+document.forms['register'].month.value+"-"+document.forms['register'].day.value;
						stateAjax({
							url : "/myHome/user/check_register",
							method : 'post',
							head:{
								"Accept-Charset":"UTF-8"
							},
							async : true,
							message : {
								code : document.forms['register'].code.value.toUpperCase(),
								'ubm.addr' : document.forms['register'].country.value,
								'user.name' : document.forms['register'].user.value,
								'user.password' : document.forms['register'].password.value,
								'ubm.sex' : document.forms['register'].sex.value,
								'ubm.birthday':birthdays,
								'ubm.voc' : document.forms['register'].vocation.value,
								token : document.forms['register'].token.value,
								'ubm.info': document.forms['register'].info.value,
								'ubm.email':document.forms['register'].email.value
							},
							run : function(text) {
								temp3.hide();
								var temp2 = $Base('#welcome');
								var temp = $Base('#settingMessage').active({
									step : 10,t : 30,
									async : {x : -700,o : 0},
									fn : function() {
										temp.hide();
										temp2.get(0, true).style.top = '0';}});
								
								temp2.css({'left' : viewInner().width + "px"})
										.show().active(
												{step : 10,t : 30,
													fn : function() {
														$Base('#third').get(0,true).id = "first";},
													async : {o : 100,x : 0}});
								if (text.isEmpty() == "register is ok") {
									temp2.css({
												'background' : "url(image/ok.png) no-repeat 50px 30px"
											});
									document.getElementById('statusMss').innerHTML = '恭喜，您注册成功！';
									document.getElementById('userMss').innerHTML = "您的用户名为&nbsp;"
											+ document.forms['register'].user.value
											+ "&nbsp;已经成功注册Mini账户";
									document.getElementById('pointMss').innerHTML = Point.SYSTEM_LOGIN_OK;								
									var home = document.getElementById("returnHome");
									home.innerHTML = "完善信息";
									home.href="/myHome/user/user_message";
								} else {
									temp2.css({'background' : "url(image/no.png) no-repeat 50px 30px"});
									document.getElementById('statusMss').innerHTML = '您注册失败！';
									document.getElementById('userMss').innerHTML = Point.SYSTEM_LOGIN_NO;
									document.getElementById('pointMss').innerHTML = "注册网站会员，您将拥有更高的权限和专属特权";
									var home = document.getElementById("returnHome");
									home.innerHTML = "重新注册";
									home.href="/myHome/application";
								}
							}
						});
					});
	
	var year=document.forms['register'].year;	
	for ( var int = 1971; int <=new Date().getFullYear(); int++) {
		 var op=document.createElement("option");
		 op.setAttribute("value",int);
		 op.innerHTML=int.toString();
		 year.appendChild(op);
	}
	year=null;
	var month=document.forms['register'].month;
	for ( var int = 2; int <=12; int++) {
		 var op=document.createElement("option");
		 op.setAttribute("value",int);
		 op.innerHTML=int.toString();
		 month.appendChild(op);
	}
	int=null;
	month=null;
	addEvent(document.forms['register'].day,"click", function(){		
		var month=document.forms['register'].month.value;
		var nowday=(month==1||month==3||month==5||month==7||month==8||month==10||month==12) ? 31:month==2 ? 28: 30;
		var year=document.forms['register'].year.value;
		if(month==2&&((year%4==0&&year%100!=0)||(year%100==0&&year%400==0))){
			nowday= 29;			
		}	
		//alert(nowday);
		var day=this.children.length+1;
		if(day<=nowday){
			for ( var int = day; int <=nowday; int++) {
				var op=document.createElement("option");
				op.setAttribute("value",int+"");
				op.innerHTML=int.toString();
				this.appendChild(op);
			}
		}else{
			for ( var int = nowday; int <day-1; int++) {
				this.removeChild(this.children[nowday]);
			}
		}
	});
	
};
Point = {
	PASS_POINT_INPUT : "请输入你的密码",
	PASS_EMPTY_ERROR : '密码不能为空',
	PASS_NUMBER_ERROR : "密码不允许少于8个字",
	PASS_DIFFER_ERROR : "前后密码不一致,确认后请重新输入",
	PASS_FORMAT_ERROR:"密码必须是少于16位的字母和数字组成",
	
	USER_EMPTY_ERROR : '账号不能为空',
	USER_NUMBER_ERROR : "账号不允许少于8个字",
	USER_UNLAWFUL_ERROR : '你输入的账号含有非法字符',
	USER_POINT_INPUT : "请输入你的账号",
	USER_ACCOUNT_ERROR : "请输入由字母和数字组成的账号",
	USER_ACCOUNT_EXEISTS : "用户已存在！",
	USER_LENGTH_ERROR:"请输入小于12个字的用户名",

	CODE_POINT_INPUT : "请输入验证码",
	CODE_ERROR : "验证码输入有误",
		
	SYSTEM_LOGIN_NO:"很抱歉！服务器繁忙，请稍后再试！",
	SYSTEM_LOGIN_OK: "可至账户设置中完善修改账户信息，完善后可用于登录，找回密码等！",
		
	USER_EMAIL_NULL:"电子邮箱不能为空",
	USER_EMAIL_ERROR:"您输入邮箱不合法",
	USER_EMAIL_INPUT : "请输入你邮箱地址",
	USER_EMAIL_EXEISTS : "该邮箱已被注册"
};
