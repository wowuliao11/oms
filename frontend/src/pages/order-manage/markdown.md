 import {Link } from 'react-router-dom'
 Link to='/'
 history 
 location
 match

 /products/:id ?
 this.props.match.params.id


localhost:3000/posts/2018/05?sortBy=news&approved=true


npm i query-string
import queryString from 'query-string;
const Posts = ({match,location}) => {
 const result	 = queryString.parse(location.search)
	
	return (
		<div>
			...
		</div>	
	)
}

result = { approved: true, sortBy: 'news' }


history.go()
history.goForward()
history.push() 会向浏览器历史添加地址
history.replace() 替换当前的页面 没有历史记录


实现程序性的导航
this.props.history.push("/products")
this.props.history.replace("/products")登录页






