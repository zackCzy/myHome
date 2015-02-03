/**
 * stateAjax({
		url:地址,
		method : 'get||post',
		async : true, 是否同步
		message : {userId:this.getAttribute("title")}, 提交信息
		run:function(text){
			<!-- 回调信息 -->
		}
	});	
 */
//------------------------------------------------------------------------------------------------------------------
function getRequest() {

	if (window.XMLHttpRequest) {
		return new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		var version = [ "MSXML2.XMLHttp6.0", "MSXML2.XMLHttp3.0",
				"MSXML2.XMLHttp","Msxml2.XMLHTTP","Microsoft.XMLHTTP"];
		for ( var i = 0; i < version.length; i++) {
			try {		
				return new ActiveXObject(version[i]);
			} catch (e) {
				// //跳过
			}
		}
		
	}
}
function stateAjax(obj) {
	var requset = getRequest();
	var data = '';
	var messageData = null;

	// 转换提交的数据
	if (obj.message) {
		(function() {
			for ( var i in obj.message) {
				data += ('&' + i + '=' + obj.message[i]);
			}
		})();
	}
	// 判断提交方式

	if (obj.method == 'get') {
		if (obj.url.indexOf('?') == -1&&obj.message)
			obj.url += "?";
		obj.url += data;
	} else if (obj.method == 'post') {
		messageData = data.substring(1, data.length);
	}
	// 获取数据方法
	function getData() {
		if (requset.readyState == 4) {
			if (requset.status == 200) {
				// alert(ajax.responseText);
				obj.run(requset.responseText);
			} else {
				// alert(ajax.responseText+"-----"+ajax.status+"----"+ajax.statusText);
				if (obj.success)
					obj.success('错误编号：' + requset.status + '---- 错误信息：'
							+ requset.statusText);
			}
		}
	}
	// 判断是否同步

	if (obj.async === true) {
		requset.onreadystatechange = function() {
			getData();
		};
	}

	// 发送提交请求
	requset.open(obj.method, obj.url, obj.async);
	if (messageData)
		requset.setRequestHeader('Content-Type',
				'application/x-www-form-urlencoded;charset=UTF-8');
	if (obj.head) {
		var head=obj.head;
		for ( var h in head) {
			requset.setRequestHeader(h, head[h]);
		}
	}
	requset.send(messageData);
	// 判断是否同步

	if (obj.async === false) {
		getData();
	}
	data = null;
}