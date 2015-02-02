<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib uri="/struts-tags" prefix="s" %>
<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/jquery-1.10.1.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/JS/plugObject/notice.js" ></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/JS/tool/JQ_plugs.js" ></script>
<div class="user_point">
	<div
		style="border-bottom: 2px solid #EA1429; height: 50px; width: 560px; text-indent: 10px; line-height: 68px; margin: 0 auto; font-size: 15px; font-weight: bold; color: #423009;">
		<s:property value="#title"/>
	</div>
	<ul style="width: 560px; height: 600px; margin: 30px auto 0">
		<s:iterator value="#flans" var="flan">
			<li>
				<span ><img width=51px height=51px  src="${pageContext.request.contextPath}/load/download_getSmallPhoto?id=<s:property value="id"/>"></span>
				<a style="text-decoration: none;color:#3CBCE7"  class="flans_message" href="${pageContext.request.contextPath}/user/space/<s:property value="name"/>/" target="_blank"><s:property value="name"/> </a>
				<input type="button" class="flans_follws_bt" value="<s:property value="#title=='我的粉丝'? '加入黑名单':'取消关注'"/>" alt="<s:property value="id"/>" onclick="removeFirend(this,this.alt,this.value)">
			</li> 
		</s:iterator>
	</ul>
	<script type="text/javascript" >
	    function removeFirend(that,id,method){
		    $.ajax({
				url:"${pageContext.request.contextPath}/friends/friends_"+(method=='加入黑名单'? 'removeFlans': 'removeFollow'),
				method : 'get',
				data : {removeUserid:id},
				success:function(text){
					if(text=="remove is ok"){
						$.notice("Viki提醒您！","取消关注成功");
						$(that.parentNode).slideUp(300,function(){
							$(this).remove();
						});
					}
				}
			});
	    }
	</script>
</div>