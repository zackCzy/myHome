<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="/struts-tags" prefix="s" %>
<div class="user_point">
	<div
		style="border-bottom: 2px solid #EA1429; height: 50px; width: 560px; text-indent: 10px; line-height: 68px; margin: 0 auto; font-size: 15px; font-weight: bold; color: #423009;">
		消息
	</div>
	<ul style="width: 560px; height: 600px; margin: 30px auto 0">
		<!--  
		<li>
			<span style="background: url('/myHome/image/friend_message.png');"></span>
			<em>3月10日 04:20</em>
			<div class="point_title">
				未关注人私信
			</div>
			<div class="point_content">
				达人：你好，今天是你的达人好友:@Pomelo-X.. 的生日哦，他们正在期待你
			</div>
		</li>
		-->
		<s:if test="#commentMessage!=null"> 
			<li>
				<a class="read_comment" href="/myHome/user/user_commentMessage">
					<span style="background: url('/myHome/image/user_message.png');"></span>
					<em><s:property
							value="#commentMessage.date" /> </em>
					<div class="point_title">
						评论
					</div>
					<div class="point_content">
						<s:property
							value="comUser.userBaseDatum.name" />
						：
						<s:property
							value="#commentMessage.content" />
					</div>
				</a>
			</li>
		</s:if>
		<s:set  value="#systemMessage.size()"  var="scount"/>
		<s:if test="#systemMessage!=null&&!#systemMessage.visible">
			<li>
				<a class="read_comment" href="/myHome/user/user_myFlans">
					<span style="background: url('/myHome/image/systemMin.png');"></span>
					<em><s:property
							value="#systemMessage.date" /> </em>
					<div class="point_title">
						系统管理员
					</div>
					<div class="point_content">
						<s:property
							value="#systemMessage.messageTitle" />
						：
						<s:property
							value="#systemMessage.messageContent" />
					</div>
				</a>
			</li>
		</s:if>
		
		<!-- 
		<li>
			<span style="background: url('/myHome/image/person_good.png');"></span>
		</li>
		<li>
			<span style="background: url('/myHome/image/no_follw_person.png');"></span>
			<em>3月10日 04:20</em>
			<div class="point_title">
				关注人私信
			</div>
			<div class="point_content">
				达人：你好，今天是你的达人好友:@Pomelo-X.. 的生日哦，他们正在期待你
			</div>
		</li>
		 -->

	</ul>
</div>