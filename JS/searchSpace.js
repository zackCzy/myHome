/**
 * 
 */
windowLoad(function(){
	$Base(".cus-sel-opt-panel span").event("click", function(evt){	
		var temp=$Base(this).getNext();		
		if(temp.css("display")=="none"){
			$Base(".cus-sel-opt-panel ul").hide();
			temp.show();
		}else{
			$Base(this).getNext().hide();
		}
	});
	$Base(".cus-sel-opt-ctn li").event("click", clickSelect);	
	$Base("#search_bt").event("click", function(){
		var type=$Base(".cus-sel-opt-panel span").innerHTML();
		type=type=="找人"? "user":type=="V说"? "smallSpeak":type=="博客"? "log":"";
		document.forms['searchSpace'].action+=type;
		document.forms['searchSpace'].submit();
	});
});
function clickSelect() {
	$Base(this.parentNode).getPrevious().innerHTML(this.innerHTML);
	$Base(this.parentNode).hide();
}