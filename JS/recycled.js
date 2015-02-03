/**
 * 
 */

$(function(){
	$(".delectDraft").click(function(){
		send.call(this,BASE_PATH+"/user/function_removeRubbish",'删除失败','removeRubbish user log ok',true);
	});
	$(".recovery").click(function(){
		send.call(this,BASE_PATH+"/user/function_recoveryRubbish",'回收失败','recoveryRubbish user log ok',false);
	});
	$(".draftRow").addScroll();
});

function send(url,information,point,type){
	var that=this;
	$.ajax({
		url:url,
		method : 'get',
		data : {userId:this.getAttribute("title")},
		success:function(text){
			if(text.isEmpty()==point){			
				$(that.parentNode).animate({
					height:0
					},350,function (){
						$(".draft_title span").html(parseInt($(this).text())-1);
						$(this).remove();
						if(type)
							$.notice("viki提醒您","删除成功",2000);
						else
							$.notice("viki提醒您","回收成功",2000);
				});
			}else{
				$.notice(information);
				
			}
		}
	});	
}