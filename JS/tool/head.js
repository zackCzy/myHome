/**
 * 
 */




minSize("#head", 1000);
function notice(text, fun) {
	var temp = $Base("#point").setCenter().css({
		top : getScroll().top + 'px'
	}).show().active({
		step : 10,
		t : 30,
		async : {
			o : 100,
			h : 130
		},
		fn : function() {
			setTimeout(function() {
				temp.active({
					step : 10,
					t : 30,
					async : {
						o : 0,
						h : 0
					},
					fn : function() {
						temp.hide();
						if (typeof fun == 'function')
							fun();
					}
				});
			}, 1000);
		}
	});
	$Base("#point_cont").innerHTML(text);
}
addEvent(window, "resize", function() {
	$Base("#point").css({
		top : getScroll().top + 'px'
	});
});
addEvent(window, "scroll", function() {
	$Base("#point").css({
		top : getScroll().top + 'px'
	});
});
$Base('.music').hover(function() {
	$Base('#mini').css({
		background : '#3FA7CB'
	});
	$Base('.musicDisplay').css({top:"40px"}).active({
		step : 10,
		t : 30,
		async : {
			h : 500
		}
	});
	if(navigator.userAgent.indexOf("MSIE")>0||navigator.userAgent.indexOf("Chrome")>0){
		document.onmousewheel = function()
		{return false;};
	}
	else{document.addEventListener("DOMMouseScroll",stopScroll ,false);
	}
}, function() {
	$Base('#mini').css({
		background : '#E4E4E4'
	});
	var temp = $Base('.musicDisplay').active({
		step : 10,
		t : 30,
		async : {
			h : -0
		},fn:function(){
			 temp.css({top:"-50px"});
			 if(navigator.userAgent.indexOf("MSIE")>0||navigator.userAgent.indexOf("Chrome")>0)
			 {document.onmousewheel = function(){return true;};}
			 else{document.removeEventListener("DOMMouseScroll",stopScroll ,false);}
		}
	});
});
$Base('.headUser')
		.hover(
				function() {
					$Base('#head .headUser ul').show().active({
						t : 30,
						step : 10,
						async : {
							o : 100,
							h : 160
						}
					});
					$Base('#head .headUser i')
							.css({background : '/myHome/image/arrow2.png) no-repeat 10px 18px'});
				},
				function() {
					var login = document.getElementById("loginStatus");
					$Base('#head .headUser i')
							.css({background : "/myHome/image/arrow.png) no-repeat 10px 17px"});
					var list = $Base('#head .headUser ul').active({
						t : 30,
						step : 10,
						async : {
							o : 0,
							h : 0
						},
						fn : function() {
							list.hide();
						}
					});
				});
function stopScroll(event) {
	stopEvent(event);
}
