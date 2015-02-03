/**
 * 
 */
windowLoad(load);
function load(){
	$Base(".delectDraft").event("click",function(){
		send.call(this,"/myHome/user/function_removeRubbish",'删除失败','removeRubbish user log ok',true);
	});
	$Base(".recovery").event("click",function(){
		send.call(this,"/myHome/user/function_recoveryRubbish",'回收失败','recoveryRubbish user log ok',false);
	});
}

function send(url,information,point,type){
	var that=this;
	stateAjax({
		url:url,
		method : 'get',
		async : true,
		message : {userId:this.getAttribute("title")},
		run:function(text){
			if(text.isEmpty()==point){			
				var temps=$Base(that).getParent().active({
					step:10,t:30,async:{h:0},
					fn:function (){
						temps.hide();
						$Base(".draft_title span").innerHTML($Base(".draft_title span").innerHTML()-1);
						if(type){notice("删除成功");}
						else {
							notice("回收成功");
						}
					}	
				});
			}else{notice(information);}
		}
	});	
}