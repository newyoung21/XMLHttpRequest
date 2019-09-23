//封装原生AJAX
/*定义接受的参数
	data ={
		url: string,
		type: get | post, 
		param: {usrename:123},
		datatype: json | xml,
		async : true | false, (默认为true)
		jsonp: callback,
		jsonpCallback: 默认为你添加一个函数名，
		success: function(res),
		error: function()
	}*/
function ajax(data) {
	
	var xhr;
	// 兼容IE浏览器
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}
	data.async = data.async || true;
	//把提交格式转化为小写字符
	var type = data.type.toLocaleLowerCase();

	//定义接受提交参数数组
	var params = [];

	//获取data.param的所有key值
	var key = Object.keys(data.param);
	for (var i = 0; i < key.length; i++) {
		//把每一个参数添加到数组中
		 params.push(key[i] + '=' + data.param[key[i]]);
	}
	//把数组拼接成表单提交格式字符串
	params = params.join('&');

	//判断是否是jsonp
	if(data.datatype == 'jsonp'){
		var jsonp = data.jsonp || 'callback',
			jsonpCallback = data.jsonpCallback || 'myjsonp'+ new Date().getTime(),
			src = data.url+"?"+params+"&"+jsonp+"="+jsonpCallback,
			// src = params ? (data.url+"&"+params) : data.url,
			script = document.createElement('script');
		window[jsonpCallback] = function(res){
			console.log(res);
			data.success(res)
		}
		script.src = src;
		document.body.appendChild(script);
	}else{

		//判断请求方法
		if (type == 'get') {
			var url = data.url +"?"+params;
			
			xhr.open(type, url, data.async);
			xhr.send();
		} else {
			xhr.open(type, data.url, data.async);
			xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			xhr.send(params);
		}

		//链接服务器成功执行函数

		xhr.onreadystatechange = function(){
			if(this.readyState == 4){
				if(this.status == 200){
					if(data.datatype == 'json' || data.datatype == 'html' || data.datatype == 'text'){
						var res = this.response;
					}else if(data.datatype == 'xml'){
						var res = this.responseXML;
					}
					data.success(res);
				}else{
					data.error();
				}
			}
		}
	}
	

}
