## 封装原生AJAX

### 规定函数参数
```javascript
	
	data ={
		url: string,
		type: get | post, 
		param: {usrename:123},
		datatype: json | xml | text | html |jsonp ,
		async : true | false, (默认为true)
		success: function(res),
		error: function()
	}

```
### 调用函数

```javascript
	
	ajax({
		url: './index.php',
		type: 'post',
		param: param,
		datatype: 'json',
		async: true,
		success: function(data){
			var data = JSON.parse(data),
			// do something ...
		},
		error: function(){
			alert("错误");
		}
	})

```

### 目录

	* index.html 是表单提交例子
	* movecat.html 是跨域请求豆瓣电影API例子
	* ajax.js 封装原生ajax

