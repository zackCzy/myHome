<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib uri="/struts-tags" prefix="s" %>
<div class="user_point">
	<div
		style="border-bottom: 2px solid #EA1429; height: 50px; width: 560px; text-indent: 10px; line-height: 68px; margin: 0 auto; font-size: 15px; font-weight: bold; color: #423009;">
		评论
	</div>
	<ul style="width: 560px; height: 600px; margin: 30px auto 0">
		<s:iterator value="#communMessage" var="comMess">
				<li style="height:100px;">
					<a class="read_comment" href="/myHome/user/function_readDiary?userId=<s:property value="userlog.id"/>">
						<span><img width=51px height=51px  src="/myHome/load/download_getSmallPhoto?id=<s:property value="comUser.id"/>"></span>
						<div class="point_title" style="width:450px;">	
								<s:property value="comUser.userBaseDatum.name" />私信了你：
						</div>
						<div class="point_content">
							<b style="color:#FF4700;">内容:</b><s:property value="content" />
						</div>
						<em style="display: block;"><s:property value="date" /></em>
					</a>
				</li>
		</s:iterator>
	</ul>
</div>