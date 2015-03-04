/**
 * 
 */
window.onload=function(){	
	addEvent(document,"keypress", box);
	addEvent(document,"keydown", box);
};
function box(){
	window.parent.box();
}