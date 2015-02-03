<style type="text/css">
#login_view {
	position: absolute;
	top: 50px;
	left: 200px;
	width: 330px;
	height: 300px;
	background: none repeat scroll 0 0 rgba(145, 105, 105, 0.86);
	z-index: 9999;
	box-shadow: 0 6px 4px rgba(0, 0, 0, 0.05), 0 7px 5px rgba(0, 0, 0, 0.3);
	border: 1px solid #a7a7a7;
	border-radius: 15px;
	color: #FCFCFC;
	display: none;
}
#login_view #close_login {
	float: right;
	width: 26px;
	height: 26px;
	color: #FF4700;
	position: relative;
	right: 15px;
	top: 9px;
	margin: 0;
	padding: 0;
	line-height: 0;
	display: block;
	text-align: center;
	line-height: 26px;
	cursor: pointer;
	font-weight: 700;
}
#login_view #close_login:hover {
	color: #FF0000;
}
#lock {
	display: none;
	position: absolute;
	background: #000;
	opacity: 0;
	filter: alpha(opacity =         0);
	z-index: 500;
}
#login_move {
	cursor: move;
}
#login_button {
	width: 200px;
	height: 35px;
	margin: 25px 55px;
	background: none repeat scroll 0 0 #A9C50B;
	cursor: pointer;
	font-size: 14px;
	vertical-align: middle;
	border-radius: 3px;
	font-family: inherit;
	color: #fff;
	letter-spacing: 1em;
	text-indent: 1em;
	text-shadow: 0 6px 4px rgba(0, 0, 0, 0.05), 0 7px 5px rgba(0, 0, 0, 0.3);
}
#login_view input:focus,#login_view input:hover {
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px
		rgba(102, 175, 233, 0.6);
	border: 1px solid #90C1ED;
}

#login_view span {
	width: 70px;
	display: block;
	height: 36px;
	float: left;
	line-height: 36px;
	text-align: right;
	margin-right: 15px;
	margin-bottom: 25px;
}
.login_area{
	margin-right:25px;
}
</style>
<div id="lock"></div>
	<div id="login_view" >
		<span id="close_login">○</span>
		<div id="login_move" style="width:90%;margin:10px auto;color:#FFFFFF;" >Mini登录</div>
		<hr style="width:90%;margin:10px auto 10px;"/>
		<div style="width:275px;height:250px;margin-left:5%">
		<span style="font-size:14px;">用户名:</span>
		<input type="text" id="miniMusic_userName">
		<span style="font-size:14px;">密码:</span>
		<input type="password" id="miniMusic_password">
		<label class="pro-user-checkbox">
			<input class="J-user-isauto" type="checkbox" id="is_auto">
			7天内自动登录
		</label>
		<input type="button" id="login_button" value="登录">
	</div>	
</div> 
<script type="text/javascript">
		$(function(){
			function login(){
				$('#miniMusic_userName').val("");
				$('#miniMusic_password').val("");
				$('#login_view').setCenter().show(300);
				$('#lock').lock(0.8,300);
			}
			try {	
			$('#headLogin').click(login);
			$('#login_view').move($("#login_move").get(0));
			$("#close_login").click(function() {
				$('#lock').unlock();
				$('#login_view').hide(300);
			});
			$("#login_button").click(function() {
				var that=this;	
				var _$this=$(this);	
				_$this.val("正在登录…");
				this.disabled=true;
				stateAjax({url : "/myHome/user/check_login",
				method : 'post',async : true,message : {'user.name' : $Base('#miniMusic_userName').value(),
				'user.password' : $Base('#miniMusic_password').value(),
				'expiry':document.getElementById("is_auto").checked ? 7:0
				},
				run : function(text) {		
					try {
						var json=JSON.parse(text);
						var temp=$Base(".user_message").removeAll();
						temp.innerHTML("");
						_$this.val("登录成功");
						var userphoto=document.createElement("img");
						userphoto.setAttribute("width","25px");
						userphoto.setAttribute("height","25px");
						userphoto.setAttribute("src","/myHome/load/download_getSmallPhoto?id="+json.id);
						temp.innerHTML("<strong><a  href='/myHome/user/space/"+json.name+"/'</a>"+ json.name+"</strong>");		
						temp.appendChild(userphoto);
						$('#lock').unlock();
						$('#login_view').hide(300);
					} catch (e) {
						_$this.val("登录失败");
					}
					that.disabled=false;
				}});
			});
		} catch (e) {
		}
	});
	
</script>	