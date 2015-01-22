/**
 * 
 */
$Base().extend([ 'active', 'shake' ], [ active, myShake ]);

function active(obj) {

	var step = obj['step'] ? obj['step'] : 10; // 动画步长

	var speed = obj['speed'] ? obj['speed'] : 6; // 缓冲大小

	var type = obj['type'] == 0 ? 'constant' : obj['type'] == 1 ? 'buffer'
			: 'buffer'; // 动画类型

	var t = obj['t'] ? obj['t'] : 30; // 动画时间

	var node, side, target, start, attr;

	var start = {};// 创建起始位置对象

	for ( var i = 0; i < this.element.length; i++) {

		node = this.element[i];
		// 执行动画前先关闭原先动画队列
		clearInterval(node.time);

		// 判断是否为多同步动画 将动画信息赋值async对象
		if (obj['attr']) {
			attr = queue == 'x' ? 'left'
					: queue == 'y' ? 'top'
					: queue == 'w' ? 'width'
					: queue == 'h' ? 'height'
					: queue == 'o' ? 'opacity'
					: queue == 's' ? 'scroll'
					: queue == 'mt' ? 'marginTop'
					: queue == 'ml' ? 'marginLeft'
					: queue == 'mb' ? 'marginBottom'
					: queue == 'mr' ? 'marginRight'
					: queue == 'pt' ? 'paddingTop'
					: queue == 'pl' ? 'paddingLeft'
					: queue == 'pb' ? 'paddingBottom'
					: queue == 'pr' ? 'paddingRight'
					: queue == 'r' ? 'transform'
					: 'left';
			target = obj['target'] != undefined ? obj['target']
						: obj['rise']+ (attr == 'opacity' ? getStyle(node, attr) * 100
						: attr == 'scroll' ? (document.documentElement.scrollTop || document.body.scrollTop)
						:attr=="transform"? parseInt(node.style.transform.substr(7))
						: parseInt(getStyle(node, attr)));
			var async = {};
			async[obj['attr']] = target;
		} else {
			var async = obj['async'];
		}

		node.num = 0;// 清空动画记录个数

		for ( var queue in async) {
			attr = queue == 'x' ? 'left'
					: // 动画方向
					queue == 'y' ? 'top'
					: queue == 'w' ? 'width'
					: queue == 'h' ? 'height'
					: queue == 'o' ? 'opacity'
					: queue == 's' ? 'scroll'
					: queue == 'mt' ? 'marginTop'
					: queue == 'ml' ? 'marginLeft'
					: queue == 'mb' ? 'marginBottom'
					: queue == 'mr' ? 'marginRight'
					: queue == 'mr' ? 'marginRight'
					: queue == 'pt' ? 'paddingTop'
					: queue == 'pl' ? 'paddingLeft'
					: queue == 'pb' ? 'paddingBottom'
					: queue == 'pr' ? 'paddingRight'
					: queue == 'r' ? 'transform'
					: 'left';
			// 动画初始值赋值
			start[attr] = obj['start'] != undefined ? obj['start']
							: (attr == 'opacity') ? getStyle(node, attr) * 100
							: attr == 'scroll' ? (document.documentElement.scrollTop || document.body.scrollTop)
							: attr=="r"? parseInt(node.style.transform.substr(7))
							: parseInt(getStyle(node, attr));

			// 动画起始点归位
			if (attr == 'opacity') {
				node.style[attr] = parseInt(start[attr]) / 100;
				node.style.filter = "alpha(opacity=" + start[attr] + ")";
			} else if (attr == 'scroll') {
				document.documentElement.scroTop = start[attr];
				document.body.scrollTop = start[attr];
			}else if(attr=="transform"){
				node.style.webkitTransform="rotate("+ start[attr]+"deg)";;
				node.style.MozTransform="rotate("+ start[attr]+"deg)";
				node.style.msTransform="rotate("+ start[attr]+"deg)";
				node.style.OTransform="rotate("+ start[attr]+"deg)";
				node.style.transform="rotate("+ start[attr]+"deg)";
			}else {
				try {
					node.style.attr = start[attr] + "px";
				} catch (e) {
					throw new Error(e);
				}

			}
			// 记录动画个数。已最后判断是否队列全部执行完毕
			node.num++;
		}

		node.time = setInterval(
				function() {

					node.count = 0;// 队列动画局部计数器
					for ( var queue in async) {// 循环执行队列中的动画

						attr = queue == 'x' ? 'left'
								: queue == 'y' ? 'top'
								: queue == 'w' ? 'width'
								: queue == 'h' ? 'height'
								: queue == 'o' ? 'opacity'
								: queue == 's' ? 'scroll'
								: queue == 'mt' ? 'marginTop'
								: queue == 'ml' ? 'marginLeft'
								: queue == 'mb' ? 'marginBottom'
								: queue == 'mr' ? 'marginRight'
								: queue == 'mr' ? 'marginRight'
								: queue == 'pt' ? 'paddingTop'
								: queue == 'pl' ? 'paddingLeft'
								: queue == 'pb' ? 'paddingBottom'
								: queue == 'r' ? 'transform'
								: 'left';
						target = async[queue];
						
						if (type == 'buffer') {
							step = attr == 'opacity' ? (target - parseFloat(getStyle(node, attr)) * 100)/ speed
									: attr == 'scroll' ? (target - (document.documentElement.scrollTop || document.body.scrollTop))/ speed
									: attr=="transform"? (target - parseInt(node.style.transform.substr(7)))/ speed
									: (target - parseInt(getStyle(node,attr)))/ speed;
							step = step > 0 ? Math.ceil(step) : Math.floor(step);
						} else if (start[attr] > target && step > 0) {
							step = -step; // 当初始值小于目标值时将step取负
						}

						//alert(parseInt(node.style.transform.substr(7)));
						// 执行动画
						position = attr == 'opacity' ? parseInt(getStyle(node,attr) * 100)+ step
									  : attr == 'scroll' ? (document.documentElement.scrollTop || document.body.scrollTop)+ step
									  : attr=="transform"? parseInt(node.style.transform.substr(7))+ step
									  : parseInt(getStyle(node, attr)) + step;
						position = start[attr] > target ? (position < target ? target:position)
									  : (position > target ? target : position);

						// 判断动画类型 为不同的动画进行赋值
						if (attr == 'opacity') {
							node.style[attr] = parseInt(position) / 100;
							node.style.filter = 'alpha(opacity='
									+ parseInt(position) + ')';
						} else if (attr == 'scroll') {
							document.documentElement.scrollTop = position;
							document.body.scrollTop = position;
						} else if(attr=="transform"){
							node.style.webkitTransform="rotate("+ position+"deg)";;
							node.style.MozTransform="rotate("+ position+"deg)";
							node.style.msTransform="rotate("+ position+"deg)";
							node.style.OTransform="rotate("+position+"deg)";
							node.style.transform="rotate("+ position+"deg)";
						}else {
							try {
								node.style[attr] = position + "px";
							} catch (e) {
							}

						}
						// 发生异常动画结束//针对某些浏览器 如： 谷歌透明度 360高度 获取问题
						//alert(attr+"---"+node[queue]+"----"+position)
						if (attr== 'scroll') {
							if ((document.documentElement.scrollTop || document.body.scrollTop) < 0) {
								document.documentElement.scrollTop = 0;
								document.body.scrollTop = 0;
							}
						} else {
							if (node[queue] != position)
								node[queue] = position;
							else {
								position = 0;
								target = 0;
							}
						}

						// 记录动画完成个数
						if (position == target) {
							node.count++;
						}
					}

					// 当动画完成个数等于动画个数 退出并判断是否需要执行其他函数？
					if (node.num == node.count) {
						if (obj['fn']) {
							obj['fn']();
						}
						clearInterval(node.time);
						node = null;
					}
				}, t);
	}
	return this;
}
function myShake(type,method) {
	for ( var i = 0; i < this.element.length; i++) {
		var position=getStyle(this.element[i],"position");

		if(position=="absolute"||position=="fixed"||position=="relative"){
			if(this.element[i].shakeTime!=undefined){
				clearInterval(this.element[i].shakeTime);
				$Base(this.element[i]).css({
					top : this.element[i].mT,
					left : this.element[i].mL
				});
			}
			this.element[i].mT =parseInt($Base(this.element[i]).css("top"));
			this.element[i].mL = parseInt($Base(this.element[i]).css("left"));
			var attr="position";
		}else{
			if(this.element[i].shakeTime!=undefined){
				clearInterval(this.element[i].shakeTime);
				$Base(this.element[i]).css({
					marginTop : this.element[i].mT,
					marginLeft : this.element[i].mL
				});
			}
			this.element[i].mT = $Base(this.element[i]).css("marginTop");
			this.element[i].mL = $Base(this.element[i]).css("marginLeft");
			var attr="margin";
		}
		if(method===0){
			shake(this.element[i], type,attr);
		}else{

			shake2(this.element[i], type,attr);
		}
	}
	return this;
}
function shake(element, type,attr) {
	
	var action = attr=="position" ? ['top','left']:[ "marginTop", "marginLeft" ], step = 10, timeout = 32;
	element.position = Math.floor(Math.random() * step);
	element.index = Math.floor(Math.random() * action.length);
	element["style"][action[element.index]] = "" + element.position
			+ "px";
	element.shakeTimer = setTimeout(function() {
		shake(element, type,attr);
	}, timeout);
	if(type!=null){
		addEvent(element, type, function() {
			clearTimeout(element.shakeTimer);
			$Base(element).css({
				"marginTop" : element.mT,
				"marginLeft" : element.mL
			});
		});
	}
}
function shake2(element,type,attr) {
	
	var action =['top','left'];
	element.postion = 0;
	var obj={};
	obj.top=element.mT;
	obj.left=element.mL;

	element.shakeTime = setInterval(function() {
		var atype=action[element.postion % 2];
		var index=(element.postion++) %4<2==0 ? parseInt(obj[atype])+"px" : parseInt(obj[atype])+4+"px";
		atype={};
		var temp=attr!="position" ? (element.postion % 2 ==0? "marginTop":"marginLeft"):(element.postion % 2 ==0? "left":"top");
		atype[temp]=index;
		$Base(element).css(atype);
		if (element.postion > 15) {
			clearInterval(element.shakeTime);
			var css1=action[0];
			var css2=action[1];

			element.postion = 0;
			if(typeof type=='function'){
				type();
			}
		}
	}, 32);
	if(typeof type=='String'){
		removeEvent(element, type, function(){
			clearInterval(element.shakeTime);
		});
	}
}
