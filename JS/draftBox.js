/**
 * 
 */
windowLoad(load);

function load(){

	$Base(".delectDraft").event("click",function(){	
		send.call(this,"/myHome/user/function_removeDraft",'删除失败');
	});
}

function send(url,information){
	var that=this;
	stateAjax({
		url:url,
		method : 'get',
		async : true,
		message : {userId:this.getAttribute("title")},
		run:function(text){
			if(text.isEmpty()=='removeDraft user log ok'){			
				var temps=$Base(that).getParent().active({
					step:10,t:30,async:{h:0},
					fn:function (){
						temps.hide();
						$Base(".draft_title span").innerHTML($Base(".draft_title span").innerHTML()-1);
						notice("删除成功");
					}	
				});
			}else{notice(information);}
		}
	});	

}

