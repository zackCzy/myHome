/**
 * 
 */
$Base().extend([ 'Move', 'resizeCenter', 'center', 'getByClass' ],
		[ elementMove, resizeCenter, center, getByClass ]);

// $$$ 移动标签元素$$$------------------------------------------
function elementMove(activeE) {
	activeEs = activeE.length>0 ? activeE : [activeE];
	for ( var i = 0; i < this.element.length; i++) {
		for ( var j = 0; j < activeEs.length; j++) {
			clickMove(this.element[i], activeEs[j]);
		}
	}
	return this;
}
function clickMove(element, activeE) {

	if (!activeE)
		activeE = element;
	addEvent(activeE, 'mousedown', click);
	function click(e) {
		// 保存点击时坐标
		var diffY = e.clientY - element.offsetTop;
		var diffX = e.clientX - element.offsetLeft;
		function stop() {// 松开按键 停止默认行为
			removeEvent(document, 'mousemove', move);
			removeEvent(document, 'mouseup', stop);
			if (typeof element.releaseCapture != 'undefined') {
				element.releaseCapture();
			}
		}

		function move(e) { // 鼠标移动
			var top = e.clientY - diffY;
			var left = e.clientX - diffX;
			if (left < 0)
				left = 0;
			else if (left > viewInner().width - element.offsetWidth)
				left = viewInner().width - element.offsetWidth;
			if (top < 0)
				top = 0;
			else if (top > viewInner().height - element.offsetHeight)
				top = viewInner().height - element.offsetHeight;
			element.style['left'] = left + "px";
			element.style['top'] = top + "px";
			if (typeof element.setCapture != 'undefined') {
				element.setCapture();
			} 
		}
		addEvent(document, 'mousemove', move);
		addEvent(document, 'mouseup', stop);
	}
}

// 窗口改变元素居中
function center() {
	for ( var i = 0; i < this.element.length; i++) {
		centerF(this.element[i]);
	}
	return this;
};
// 浏览器大小改变元素居中
function resizeCenter(fn) {
	for ( var i = 0; i < this.element.length; i++) {
		var element = this.element[i];
		addEvent(window,'resize',function() {
			if (element.offsetWidth + element.offsetLeft > viewInner().width|| element.offsetHeight + element.offsetTop > viewInner().height)
				centerF(element);
					if(fn)fn();
				});
	}
	return this;
};
function getCenter(element) {
	var ht = element.offsetHeight == 0 ? parseInt(getStyle(element, 'height'))
			: element.offsetHeight;
	var wt = element.offsetWidth == 0 ? parseInt(getStyle(element, 'width'))
			: element.offsetWidth;
	element.style['top']  =((viewInner().height - ht) / 2 < 0 ? 0 : (viewInner().height - ht) / 2)+getScroll().top+'px';
	element.style['left']  =((viewInner().width  -wt) / 2 < 0 ? 0: (viewInner().width -wt) / 2)+getScroll().left+'px';
}
// 计算元素居中
function centerF(element) {
	var ht = element.offsetHeight == 0 ? parseInt(getStyle(element, 'height'))
			: element.offsetHeight;
	var wt = element.offsetWidth == 0 ? parseInt(getStyle(element, 'width'))
			: element.offsetWidth;
	var top = (viewInner().height - ht) / 2 < 0 ? 0
			: (viewInner().height - ht) / 2;
	var left = (viewInner().width  -wt) / 2 < 0 ? 0
			: (viewInner().width -wt) / 2;
	element.style['top'] = top+ 'px';
	element.style['left'] = left +'px';
}


// ------------------------$$$通过CSS选择符获取$$$$$$---------------------
function getByClass(css,startElement) {
	var cssArr = css.split(new RegExp('\\s+'));
	var elements = [ (startElement ? startElement:document) ];
	var tempss,temps;
	for ( var i = 0; i < cssArr.length; i++) {
		temps = [];
		switch (cssArr[i].charAt(0)) {
		case '#':
			for ( var n = 0; n < elements.length; n++) {
				if (temps[0])
					break;
				tempss = elements[n].getElementsByTagName('*');
				for ( var j = 0; j < tempss.length; j++) {
					if (tempss[j].id == cssArr[i].slice(1)) {
						temps.push( tempss[j]);
						break;
					}
				}
			}
			elements = temps;
			break;
		case '.':
			for ( var n = 0; n < elements.length; n++) {
				tempss = elements[n].getElementsByTagName('*');
				for ( var j = 0; j < tempss.length; j++) {
					if (tempss[j].className == cssArr[i].slice(1)) {
						temps.push(tempss[j]);
					}
				}
			}
			elements = temps;
			break;
		default:
			for ( var n = 0; n < elements.length; n++) {
				var arr = elements[n].getElementsByTagName(cssArr[i]);
				for ( var j = 0; j < arr.length; j++) {
					temps.push(arr[j]);
				}
			}
			elements = temps;
			break;
		}
	}
	this.element = elements;
	return this;
};
/**
 * <pre>设置属性为100%标签最小尺寸</pre>
 * 
 * */
function minSize(element,width, height,maxwidth,maxheight) {
	addEvent(window, 'resize', function(evt) {
		var node=element=='body' ? $Base().getTagName('body'):$Base(element);
		if (width) {
			if (viewInner().width < width)
				node.css({'width': width + 'px'});
			else
				node.css({'width':maxwidth?maxwidth:'100%'});
		}
		if(height){
			if (viewInner().hidth <height)
				node.css({'height': height + 'px'});
			else
				node.css({'height': maxheight?maxheight:'100%'});
		}
	});
}


// -------------------------------------------------------------------
