<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib uri="/struts-tags" prefix="s" %>
<div class="user_point">
	<div
		style="border-bottom: 2px solid #EA1429; height: 50px; width: 560px; text-indent: 10px; line-height: 68px; margin: 0 auto; font-size: 15px; font-weight: bold; color: #423009;">
		评论
	</div>
	<ul style="width: 560px; height: 600px; margin: 30px auto 0">
		<s:iterator value="#commentMessage" var="comMess">
			<s:if test="(userlog.visible&&!userlog.draft&&!userlog.rubbish)">
				<li style="height:100px;">
					<a class="read_comment" href="${pageContext.request.contextPath}/user/function_readDiary?userId=<s:property value="userlog.id"/>">
						<span><img width=51px height=51px  src="${pageContext.request.contextPath}/load/download_getSmallPhoto?id=<s:property value="()comUser.id!=#user.id) ? comUser.id:user.id"/>"></span>
						<div class="point_title" style="width:450px;">	
							<s:if test="(comUser.id!=#user.id)">
								<s:property value="comUser.userBaseDatum.name" />评论了@你的日记：&lt;<s:property value="userlog.logName" />&gt;
							</s:if>
							<s:else>
								你评论了@<s:property value="user.userBaseDatum.name" />的日记：&lt;<s:property value="userlog.logName" />&gt;
							</s:else>
						</div>
						<div class="point_content">
							<b style="color:#FF4700;">评论:</b>&nbsp;&nbsp;&nbsp;<s:property value="content" />
						</div>
						<em style="display: block;"><s:property value="date" /></em>
					</a>
				</li>
			</s:if>
		</s:iterator>
	</ul>
</div>