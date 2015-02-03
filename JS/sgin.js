/**
 * 
 */
$(function(){
	$("#sginAccount").click(function(){
		var _that=this;
		this.disabled=true;
		var _docForm=document.forms['sgin'];
		var action=_docForm.action;
		var span=$("#sginStatus span").html('正在登录').css({marginRight:'200px'});
		var Status=$("#sginStatus").css({background:"url(/myHome/image/loading4.gif) no-repeat 180px 0"}).show(200);
		var expiry=_docForm.monthexpiry.checked ? 30:_docForm.weekexpiry.checked ? 7 :0;
		$.ajax({
			url : "/myHome/user/check_login",
			type : 'post',
			data : {
				'user.name' : _docForm.username.value,
				'user.password' : _docForm.password.value,
				'expiry':expiry},
			success : function(text) {
				_that.disabled=false;
				if (text.isEmpty()=="sgin is error") {
					Status.css({background:"url(/myHome/image/pointError.png) no-repeat 90px 0"});
					span.text("用户名密码错误").css({marginRight:'100px'});
				} else {
					_docForm.password.value=text;
					Status.css({background:"url(/myHome/image/pointYes.png) no-repeat 110px 0"});
					span.html("登录成功").css({marginRight:'120px'});
					if(action.indexOf("null")!=-1){
						_docForm.action=action.replace("null",_docForm.username.value);
					}else if(_docForm.action.length<=0){
						_docForm.action="/myHome";
					}else {
						var url=window.location.href;
						window.location.href=url;
						return null;
					}
					document.forms['sgin'].submit();
				}
			}
		});
	});
});