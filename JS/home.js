$(function(){stopScroll();window.count=1;var b=parseInt($("#viki_scroll").css("height"));var g=document.documentElement.scrollHeight||document.body.scrollHeight;var a=true;$("#viki_bar").css({height:Math.min((b*b)/g)+"px"});document.documentElement.scrollTop=0;document.body.scrollTop=0;$(window).on("scroll",function(e){var j=document.documentElement.clientHeight||document.body.clientHeight;var l=document.documentElement.scrollTop||document.body.scrollTop;var k=document.documentElement.scrollHeight||document.body.scrollHeight;if(l<0||j+l+30>=k){return false}if(l>50){$(".display_info_bg").css({position:"fixed",top:"0",background:"#000",opacity:"0.8"})}else{$(".display_info_bg").css({position:"absolute",top:"50px",background:"#363636",opacity:"1"})}if(l>j+1700){}else{if(l>j){var m=Math.abs(Math.floor((l-j)/170-1));$(".divice-fea-left-grid").eq(m).fadeIn(1000).slideDown(1000)}}});$("#music_display_ul img").hover(function(){clearInterval(window.timeMusic)},function(){window.timeMusic=setInterval(function(){c()},6000)});$("#music_display_left").on("click",function(){clearInterval(window.timeMusic);c()});$("#music_display_right").on("click",function(){clearInterval(window.timeMusic);f()});$(window).resize(function(){if(viewInner().width<858){$("#viki_info").css({width:858+"px"})}else{$("#viki_info").css({height:viewInner().width/3.21+"px",width:100+"%"})}});$("#viki_bar").on("mousedown",h);try{addEvent(document,"DOMMouseScroll",d)}catch(i){}try{addEvent(document,"mousewheel",d)}catch(i){}window.timeMusic=setInterval(function(){c()},6000);function f(){if(!a){return false}a=false;$("#music_display_ul li:first").animate({width:0,paddingLeft:0,paddingRight:0,height:0,borderBottom:0,marginTop:100},1300,function(){$(this).appendTo("#music_display_ul").css({width:"330px",padding:"0 10px",height:"270px","margin-top":0,borderBottom:2});a=true})}function c(){if(!a){return false}a=false;$("#music_display_ul li:last").insertBefore("#music_display_ul li:first").css({width:0,padding:0,height:0,marginTop:100,borderBottom:0}).animate({width:330,paddingLeft:10,paddingRight:10,height:270,marginTop:0,borderBottom:"2px"},1300,function(){a=true})}function h(o){var n=this;var k=o.clientY-this.offsetTop;var p=parseInt($("#viki_scroll").css("height"));var l=document.documentElement.clientHeight||document.body.clientHeight;function m(){removeEvent(n,"mousemove",j);removeEvent(n,"mouseup",m);if(typeof n.releaseCapture!="undefined"){n.releaseCapture()}}function j(s){var r=s.clientY-k;if(r<0){r=0}else{if(r>p-n.offsetHeight){r=p-n.offsetHeight}}n.style.top=r+"px";var q=(r*l/p)*((document.documentElement.scrollHeight||document.body.scrollHeight)/p);document.documentElement.scrollTop=q;document.body.scrollTop=q;if(typeof n.setCapture!="undefined"){n.setCapture()}}addEvent(n,"mousemove",j);addEvent(n,"mouseup",m)}function d(j){var m=$("#viki_bar");var o=parseInt($("#viki_scroll").css("height"));var l=document.documentElement.clientHeight||document.body.clientHeight;var n=parseInt(m.css("top"))+(-(j.wheelDelta/40)*3||j.detail*3);var e=m.get(0).offsetHeight;if(n<0){n=0}else{if(n>l-e){n=l-e}}m.css({top:n+"px"});var k=(n*l/o)*((document.documentElement.scrollHeight||document.body.scrollHeight)/o);document.documentElement.scrollTop=k;document.body.scrollTop=k}});