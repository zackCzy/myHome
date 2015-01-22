/**
 * 
 */
//windowLoad(load);
$(function(){
	$("#sginAccount").click(function(){
		var _that=this;
		this.disabled=true;
		var _docForm=document.forms['sgin'];
		var action=_docForm.action;
		var span=$("#sginStatus span").html('正在登录').css({marginRight:'200px'});
		var Status=$("#sginStatus").css({
			background:"url(/myHome/image/loading4.gif) no-repeat 180px 0"}).show(200);
		var expiry=_docForm.monthexpiry.checked ? 30:_docForm.weekexpiry.checked ? 7 :0;
		stateAjax({url : "/myHome/user/check_login",
			method : 'post',async : true,message : {
				'user.name' : _docForm.username.value,
				'user.password' : _docForm.password.value,
				'expiry':expiry},
			run : function(text) {
				_that.disabled=false;
				if (text.isEmpty()=="sgin is error") {
					Status.css({background:"url(/myHome/image/pointError.png) no-repeat 90px 0"});
					span.innerHTML("用户名密码错误").css({marginRight:'100px'});
					Status.hide(300);
				} else {
					_docForm.password.value=text;
					Status.css({background:"url(/myHome/image/pointYes.png) no-repeat 110px 0"});
					span.html("登录成功").css({marginRight:'120px'});
					console.log(action.indexOf("null"));
					if(action.indexOf("null")){
						_docForm.action=action.replace("null",_docForm.username.value);
						console.log(_docForm.username.value);
					}else if(_docForm.action.length<=0){
						_docForm.action="/myHome";
					}
					document.forms['sgin'].submit();
				}
			}
		});
	});
});
//function load(){
//	$Base("!sgin").empty();
//	$Base("#sginAccount").event("click", function(){
//		var span=$Base("#sginStatus span").innerHTML('正在登录').css({marginRight:'200px'});
//		var Status=$Base("#sginStatus").css({
//				background:"url(/myHome/image/loading4.gif) no-repeat 180px 0"}).show();
//		var that=this;
//		if(!that.time){
//			that.time=setTimeout(function(){
//				var expiry=document.forms['sgin'].monthexpiry.checked ? 30:document.forms['sgin'].weekexpiry.checked ? 7 :0;
//				stateAjax({url : "/myHome/user/check_login",
//					method : 'post',async : true,message : {
//						'user.name' : document.forms['sgin'].username.value,
//						'user.password' : document.forms['sgin'].password.value,
//						'expiry':expiry},
//					run : function(text) {
//						if (text.isEmpty()=="sgin is error") {
//							Status.css({background:"url(/myHome/image/pointError.png) no-repeat 90px 0"});
//							span.innerHTML("用户名密码错误").css({marginRight:'100px'});
//							setTimeout(function(){
//								Status.hide();}, 1000);
//						} else {
//							document.forms['sgin'].password.value=text;
//							Status.css({background:"url(/myHome/image/pointYes.png) no-repeat 110px 0"});
//							span.innerHTML("登录成功").css({marginRight:'120px'});
//							if(document.forms['sgin'].action.indexOf("null")){
//								document.forms['sgin'].action=document.forms['sgin'].action.replace("null",document.forms['sgin'].username.value);
//							}
//							if(document.forms['sgin'].action.length<=0){
//								document.forms['sgin'].action="/myHome";
//							}
//							setTimeout(function(){document.forms['sgin'].submit();}, 500);
//						}
//						that.time=null;
//					}
//				});
//			},500);
//		}		
//	});
//}