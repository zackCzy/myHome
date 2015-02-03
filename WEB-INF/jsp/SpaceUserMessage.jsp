<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib uri="/struts-tags"  prefix="s"%>
<div class="home_content_display" style="background: #F1F1F1;">
	<div class="user_space_message">
	<div style="width:100%;height:10px;"></div>
	<div class="space_title">
		<strong style="color:#423009;font-size:22px;display: block;line-height:30px;text-align: left;text-indent: 40px;">空间主人信息</strong>
		<hr/>
	</div>
	<div class="row_message_area">
		<span>昵称：</span>
		<Strong><s:property value="#user.userBaseDatum.name"/> </Strong>
	</div>
	<div class="row_message_area">
		<span>性别：</span>
		<Strong><s:property value="#user.userBaseDatum.sex"/></Strong>
	</div>
	<div class="row_message_area">
		<span>城市：</span>
		<Strong><s:property value="#user.userBaseDatum.addr.equals('请选择,请选择') ? '未知城市': #user.userBaseDatum.addr" default="(^-^) 想知道就来问我吧！"/></Strong>
	</div>
	<div class="row_message_area">
		<span>生日：</span>
		<Strong><s:property value="#user.userBaseDatum.birthday" default="(^-^) 想知道就来问我吧！"/></Strong>
	</div>
	<div class="row_message_area">
		<span>血型：</span>
		<Strong><s:property value="#user.userBaseDatum.bloodGroup" default="(^-^) 想知道就来问我吧！"/></Strong>
	</div>
	<div class="row_message_area">
		<span>职业：</span>
		<Strong><s:property value="#userBaseDails.voc" default="(^-^) 想知道就来问我吧！"/></Strong>
	</div>
	<div class="row_message_area">
		<span>教育水平：</span>
		<Strong><s:property value="#userBaseDails.education" default="(^-^) 想知道就来问我吧！"/></Strong>
	</div>
	<div class="row_message_area">
		<span>婚姻情况：</span>
		<Strong><s:property value="#userBaseDails.maritalStatus" default="(^-^) 想知道就来问我吧！"/></Strong>
	</div>
	<div class="row_message_area">
		<span>工作单位：</span>
		<Strong><s:property value="#unitDatum.workUnit" default="(^-^) 想知道就来问我吧！"/></Strong>
	</div>
	<div class="row_message_area">
		<span>性格：</span>
		<Strong><s:property value="#userBaseDails.personality" default="(^-^) 想知道就来问我吧！"/></Strong>
	</div>
	<div class="row_message_area">
		<span>个性签名：</span>
		<Strong><s:property value="#userBaseDails.motto" default="(^-^) 用户很懒，什么都没留下！"/></Strong>
	</div>
	<div class="row_message_area">
		<span>个人说明：</span>
		<Strong><s:property value="#userBaseDatum.info" default="(^-^) 用户很懒，什么都没留下！"/></Strong>
	</div>
</div>
</div>
