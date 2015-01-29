/**
 * 
 */
$(load);
$.ajaxSetup({
	accepts:{
		"Accept-Charset":"utf-8"
	}
});

function load(){
	$(".save").on("click", function(){
		$.ajax({
			type : 'post',
			url:"/myHome/user/check_update",
			data :getObj(),
			success : function(text) {
				if(text.isEmpty()=="message is ok"){
					var temp=$(".savePoint").css({
						display:"block",
						background:"url(/myHome/image/reg_info.png) no-repeat 5px 4px"
					}).text("你的资料已经修改完成！");
					setTimeout(function(){
						temp.css({
							display:"none"
						});
					},4000);
				}else{
					var temp=$(".savePoint").css({
						display:"block",
						background:"url(/myHome/image/reg_error.png) no-repeat 5px 4px"
					}).text("保存失败,请刷新后再试！");
					setTimeout(function(){
						temp.css({
							display:"none"
						});
					},4000);
				}
			}
		});
	});

	$(".cus-sel-opt-panel span").on("click", function(evt){	
		var $this=$(this).next();		
		if($this.css("display")=="none"){
			$(".cus-sel-opt-panel ul").hide();
			$this.show();
		}else{
			$this.hide();
		}
	});

}


