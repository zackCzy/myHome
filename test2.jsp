<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html >
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>Insert title here</title>
		<script type="text/javascript">
		function musicBox(){
			return ${id};
		}
	/*
	    function thisMovie(movieName) {
		    if (window.document[movieName]) {
		        return window.document[movieName];
		    } else if (navigator.appName.indexOf("Microsoft Internet") == -1) {
		        if (document.embeds && document.embeds[movieName]) return document.embeds[movieName];
		    } else {
		        return document.getElementById(movieName);
		    }
		}
		function toASS(value) {
			alert("123");
		    thisMovie("Externa").toASS('hahaqq');
		}
		function A(){
			return "haha";
		}
		onclick="toASS()"
	 */
</script>
	</head>
	<body>

		<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
			codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0"
			width="235" height="37">
			<param name="quality" value="high" />
			<param value="#FFFFFF" name="bgcolor">
			<param value="transparent" name="wmode">
			<param name="allowScriptAccess" value="always" />
			<param name="movie" value="MiniMusic.swf" />
			<param value="userName=zhangwan" name="flashvars">
			<embed src="MiniMusic.swf" quality="high"
				pluginspage="http://www.macromedia.com/go/getflashplayer"
				type="application/x-shockwave-flash" width="235" height="37"
				id="Externa" flashvars="userName=zhangwan">
			</embed>
		</object>
	
	</body>
</html>