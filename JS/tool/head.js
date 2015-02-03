/**
 * 
 */


$('.headUser').hover(function() {
	$('ul',this).stop(true).slideDown(350);
	$('i',this).css({transform : "rotate(0deg)"});
},
function() {
	var login = document.getElementById("loginStatus");
	$('i',this).css({transform : "rotate(180deg)"});
	$('ul',this).stop(true).slideUp(350);
});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            

