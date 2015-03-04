/**
 * 
 */
$(function(){
	
	$(".cus-sel-opt-panel span").on("click", function(evt){	
		var temp=$(this).next();		
		if(temp.css("display")=="none"){
			$(".cus-sel-opt-panel ul").slideUp(300);
			temp.slideDown(300);
		}else{
			temp.slideUp(300);
		}
	});
	$(".cus-sel-opt-ctn li").on("click", clickSelect);	
	$("#search_bt").on("click", function(){
		var _type=$(".cus-sel-opt-panel span").text().isEmpty();
		_type=_type=="找人"? "user":_type=="V说"? "smallSpeak":_type=="博客"? "log":"";
		document.forms['searchSpace'].action+=_type;
		document.forms['searchSpace'].submit();
	});
	try {
		var searchName=document.getElementsByName("searchName")[0].value;
		var shtml=$(".selectStrong").html().replace(searchName,'<b class="select_red">'+searchName+'</b>');
		$(".selectStrong").html(shtml);
	} catch (e) {
		// TODO: handle exception
	}
	
});
function clickSelect() {
	$(this.parentNode).prev().html(this.innerHTML);
	$(this.parentNode).hide(300);
}