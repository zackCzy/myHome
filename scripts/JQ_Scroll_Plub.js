$.fn.extend({mousewheel:function(a){$(this).each(function(b){if(navigator.userAgent.indexOf("MSIE")>0||navigator.userAgent.indexOf("Chrome")>0){this.onmousewheel=scrollF}else{this.addEventListener("DOMMouseScroll",scrollF,false)}})}});$.fn.extend({addScroll:function(b){if(b==null||!jQuery.isPlainObject(b)){b={background:"url('/myHome/image/trans.png') repeat scroll 0 0 rgba(0, 0, 0, 0)",right:0,width:"10px"}}b.position="absolute";b.top="0px";b["-moz-user-select"]="none";b["z-index"]=9999999;b["border-radius"]="25px";b.margin="0";b.border="0 none";b.padding="0";var a={background:"none repeat scroll 0 0 #ccc","border-radius":"25px",cursor:"pointer",display:"block",opacity:"0.9",position:"absolute",top:0,width:"100%",right:0,height:"50px",margin:"0",border:"0 none",padding:"0"};$(this).each(function(e){var c=document.createElement("div");var f=document.createElement("span");var d=parseInt($(this).css("height"));a.height=Math.min((d*d)/this.scrollHeight)+"px";$(f).css(a).appendTo(c).on("mousedown",scrollClick);b.height=$(this).css("height");$(c).css(b).append(f).appendTo(this).css({height:d});$(this).css({position:"relative",overflow:"hidden"}).hover(function(){if(navigator.userAgent.indexOf("MSIE")>0||navigator.userAgent.indexOf("Chrome")>0){document.onmousewheel=function(){return false}}else{document.addEventListener("DOMMouseScroll",stopEvent,false)}},function(){if(navigator.userAgent.indexOf("MSIE")>0||navigator.userAgent.indexOf("Chrome")>0){document.onmousewheel=function(){return true}}else{document.removeEventListener("DOMMouseScroll",stopEvent,false)}}).mousewheel(scrollF).scrollTop(22)})}});function scrollClick(h){var g=this;var c=h.clientY-this.offsetTop;var i=parseInt($(this.parentNode).css("height"));var a=$(this.parentNode.parentNode);var d=parseInt(a.css("height"));function f(){$(g).off("mousemove",b);$(g).off("mouseup",f);if(typeof g.releaseCapture!="undefined"){g.releaseCapture()}}function b(m){var l=m.clientY-c;if(l<0){l=0}else{if(l>i-g.offsetHeight){l=i-g.offsetHeight}}g.style.top=l+"px";var k=a.get(0);var j=(l*d/i)*(k.scrollHeight/i)+5;$(this.parentNode.parentNode).scrollTop(j);this.parentNode.style.top=j+"px";if(typeof g.setCapture!="undefined"){g.setCapture()}}$(g).on("mousemove",b);$(g).on("mouseup",f)}function scrollF(g){var d=$($(this).last().get(0).getElementsByTagName("span")[0]);var b=parseInt($(this).last().css("height"));var c=$(this);var a=parseInt(c.css("height"));var e=parseInt(d.css("top"))+(-(g.wheelDelta/40)*3||g.detail*3);var i=parseInt(d.get(0).offsetHeight);if(e<0){e=0}else{if(e>a-i){e=a-i+2}}d.css({top:e+"px"});var f=c.get(0);var h=(e*a/b)*(f.scrollHeight/b);$(this).scrollTop(h);this.children[this.children.length-1].style.top=h+"px"}function stopEvent(a){var b=a||window.event;if(b.preventDefault){b.preventDefault()}else{b.returnValue=false}return b};