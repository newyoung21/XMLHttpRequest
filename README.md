## 封装原生AJAX

### 规定函数参数
```javascript
	
	data ={
		url: string,
		type: get | post, 
		param: {usrename:123},
		datatype: json | xml,
		async : true | false, (可选,默认为true)
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
			alert("注册失败");
		}
	})

```
