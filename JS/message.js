/**
 * 
 */
windowLoad(load);


function load(){
	$Base(".save").event("click", function(){
		stateAjax({
			method : 'post',
			url:"/myHome/user/check_update",
			head:{
					"Accept-Charset":"UTF-8"
			},	
			message :getObj(),
			async : true,
			run : function(text) {
				if(text.isEmpty()=="message is ok"){
					var temp=$Base(".savePoint").css({
						display:"block",
						background:"url(/myHome/image/reg_info.png) no-repeat 5px 4px"
					}).innerHTML("你的资料已经修改完成！");
					setTimeout(function(){
						temp.css({
							display:"none"
						});
					},4000);
				}else{
					var temp=$Base(".savePoint").css({
						display:"block",
						background:"url(/myHome/image/reg_error.png) no-repeat 5px 4px"
					}).innerHTML("保存失败,请刷新后再试！");
					setTimeout(function(){
						temp.css({
							display:"none"
						});
					},4000);
				}
			}
		});
	});

	$Base(".cus-sel-opt-panel span").event("click", function(evt){	
		var temp=$Base(this).getNext();		
		if(temp.css("display")=="none"){
			$Base(".cus-sel-opt-panel ul").hide();
			temp.show();
		}else{
			$Base(this).getNext().hide();
		}
	});

}


