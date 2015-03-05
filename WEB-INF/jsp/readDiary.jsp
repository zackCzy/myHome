<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@include file="../meta/indexMeta.jsp"%>
		<link rel="stylesheet" type="text/css" href="<%=path%>/CSS/public/main.css">
		<link rel="stylesheet" type="text/css" href="<%=path%>/CSS/readDiray.css">
		<script type="text/javascript">
			BASE_PATH="<%=path %>";
		</script>
		<script type="text/javascript" src="<%=path%>/JS/tool/span.js"></script>
		<script type="text/javascript" src="<%=path%>/scripts/jquery-1.10.1.js"></script>
		<script type="text/javascript" src="<%=path%>/JS/plugObject/notice.js"></script>
		<script type="text/javascript" src="<%=path%>/JS/tool/JQ_plugs.js"></script>
		<script type="text/javascript" src="<%=path%>/JS/readDiray.js"></script>
		<title><s:property value="#logUser.userBaseDatum.name"/>的空间</title>
	</head>
	<body>
		<%@ include file="/WEB-INF/jsp/head.jsp"%> 
		<h1 class="space_name"><a title="返回<s:property value="#logUser.userBaseDatum.name"/>的空间" href="<%=path%>/user/space/<s:property value="#logUser.name"/>/"><s:property value="#logUser.userBaseDatum.name"/>的空间</a></h1>
		<div class="readArea" >
			<h2 style=" font-size: 20px;color: #454545;word-break: break-all;word-wrap: break-word;margin-bottom: 5px;height:30px;">
			<s:property value="#log.logName"/>
			<span id="modificationTime">
			<s:property value="#log.modifyDate"/>
			</span></h2>
			<s:property value="#log.logContent" escapeHtml="false"/>
			
			<div class="userAction">
				<div class="bdsharebuttonbox" style="float: left;">
					<a href="#" class="bds_more" data-cmd="more"></a>
					<a title="分享到QQ空间" href="#" class="bds_qzone" data-cmd="qzone"></a>
					<a title="分享到新浪微博" href="#" class="bds_tsina" data-cmd="tsina"></a>
					<a title="分享到腾讯微博" href="#" class="bds_tqq" data-cmd="tqq"></a>
					<a title="分享到人人网" href="#" class="bds_renren" data-cmd="renren"></a>
					<a title="分享到微信" href="#" class="bds_weixin" data-cmd="weixin"></a>
				</div>
				<a >浏览(<span><s:property value="#visitors.size()" /></span>)</a>
				<a href="#commentArea">评论(<span id=count><s:property value="#log.com.size()"/></span>)</a>
				<s:if test="#authority==1">
					<a href="<%=path%>/user/function_modifyDiary?logId=<s:property value="logId" />">编辑</a>
					<a rel="<s:property value="userId" />"  onclick="removeLog('<s:property value="#logUser.name"/>',this)" >删除</a>
				</s:if>
			</div>
		</div>	
		<s:if test="#visitors.size()>0">
			<div id="visitor_display" >
				<b style="width:800px;margin:5px 0;display: block;color:#423009">最近访客</b>
				<hr style="width:800px;margin:5px 0;border:1px solid #787878;" >
				<ul >
					<s:iterator value="#visitors" var="visitor">
						<li title="<s:property value="userBaseDatum.name"/>">
							<a href="<%=path%>/user/space/<s:property value="name"/>/">
								<img  width=80px height=80px src="<%=path%>/load/download_getSmallPhoto?id=<s:property value="id"/>" />
								<span class="user_name"><s:property value="userBaseDatum.name"/></span>
							</a>
						</li>		
					</s:iterator>
				</ul>
				<div style="weith:100%;height:20px;display: block;"></div>
			</div>
		</s:if>
		

		<div class="comment" id="comment">
			<h5 style="height:40px;line-height:10px">评论：</h5>
			<div id="commentArea" contenteditable="true"></div>
			<input type="button"  value="评论" id="sendComment" alt="<s:property value="#logid"/>">
			<div class="displayComment">
				<s:iterator value="#log.com" var="comment">	
					<div class="smallCom">
						<span>
							<a target="_blank" href="<%=path%>/user/space/<s:property value="comUser.name"/>/">
								<img  src="<%=path%>/load/download_getSmallPhoto?id=<s:property value="comUser.id"/>">
							</a>
						</span>
						<a href="<%=path%>/user/space/<s:property value="comUser.name"/>/" target="_blank">
							<s:property value="comUser.userBaseDatum.name"/>:
						</a>
						<div >
							<s:property value="content" />
						</div>
						<strong>	
							<span class="reply_date"><s:property value="date"/></span>
							<a href="#comment" class="replyHyperlink" rel="<s:property value='comUser.spaceDatums.nickName'/>">
								<span  class="replyicon" title="回复" alt="<s:property value='id'/>" rel="<s:property value='user.id'/>"></span>
							</a>
							<s:if test="#authority==1">
								<a rel='<s:property value="id"/>' class="remove_com">删除</a>
							</s:if>
						</strong>
						 
						<s:iterator value="reviewewCom" var="comm">	
							<div class="reply">
								<span class="userPhoto">
									<img src='<%=path %>/load/download_getSmallPhoto?id=<s:property value='comUser.id'/>'>
								</span>
								<a href="<%=path%>/user/space/<s:property value="comUser.name"/>/" target="_blank"><s:property value='comUser.spaceDatums.nickName'/> 回复 <s:property value='user.spaceDatums.nickName'/></a>
								<div><s:property value='content'/></div>
								<strong>
									<span class="reply_date"><s:property value='date'/></span>
									<a href="#comment" class="replyHyperlink" rel="<s:property value='comUser.spaceDatums.nickName'/>">
										<span  class="replyicon" title="回复" alt="<s:property value='comment.id'/>" rel="<s:property value='user.id'/>"></span>
									</a>
								</strong>
							</div>
						</s:iterator>
					</div>
				</s:iterator>
			</div>
		</div>
	</body>
	<script>window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"share":{},"image":{"viewList":["qzone","tsina","tqq","renren","weixin"],"viewText":"分享到：","viewSize":"16"},"selectShare":{"bdContainerClass":null,"bdSelectMiniList":["qzone","tsina","tqq","renren","weixin"]}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];</script>
</html>