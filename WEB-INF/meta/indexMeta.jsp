<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	if(request.getServerName().indexOf("vikimicro")==-1){
		response.setStatus(301);
		response.setHeader( "Location", "http://vikimicro.com/"+request.getContextPath());
		response.setHeader( "Connection", "close" );
	}
 %>
<meta name="pragma" content="cache">
<meta name="cache-control" content="cache">
<meta name="Content-Type" content="text/html; charset=UTF-8">
<meta name="expires" content="0">
<meta name="keywords" content="viki,Viki微站,Viki音乐,Viki翻译,Viki空间,音乐,多语言翻译,微博,博客,说说">
<meta name="description" content="Viki微站是一个提供综合性一体，包括音乐，多语种翻译，个人博客空间等等服务的综合性平台，我们将为您提供一个私人的空间学习，与交流">
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?db267adaffd4571aa421d98f2dbb5ae0";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>