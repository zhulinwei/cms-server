# cms-server

## 简介
cms-server是基于koa实现的内容管理系统后台接口
> * 前台页面：https://github.com/zhulinwei/cms-client
> * 演示地址：http://www.51linwei.top

## 组成
> * 1.用户系统
> * 2.统计系统
> * 3.任务系统
> * 4.通知系统
> * 5.博客系统

## 功能介绍

### 用户系统
用户分为游客、用户、管理员不同角色，每种角色有不同权限：
1. 游客：浏览
2. 用户：留言
3. 管理员：删除留言、发布文章、发布任务

### 统计系统
完成用户数量、文章分布等统计任务

### 任务系统
发布并分配任务

### 通知系统
错误警报、用户留言等通知

#### 博客系统
文章发布

## 启动
1. npm start
2. pm2 start bin/pm2.json
3. docker build -t cms-server; docker run -d cms-server

## 环境变量
|name|descript|demo|
|----|--------|----|
|NAME|项目名称|cms-server|
|PORT|项目端口|3451|
|NODE_ENV|项目环境|.|
|HOSTNAME|host名称|localhost|
|QINIU_HOST|七牛地址|.|
|QINIU_BUCKET|七牛空间|.|
|QINIU_ACCESS_KEY|七牛编号|.|
|QINIU_SECRET_KEY|七牛秘钥|.|
|QQ_WEB_APPID|QQ应用编号|.|
|QQ_WEB_APPKEY|QQ应用秘钥|.|
|MAIL_HOST|邮件地址|smtp.qq.com|
|MAIL_PORT|邮件端口|465|
|MAIL_USER|邮件账号|.|
|MAIL_PASSWORD|邮件密码|.|
|REDIS_CMS|Redis数据库URL|redis://localhost:6379/0|
|MONGODB_CMS|MongoDB数据库URL|mongodb://localhost:27017|

## 数据库设计

### 任务表task
|属性|类型|描述|
|----|----|----|
|_id|ObjectId|任务编号|
|name|String|任务名称|
|status|Int|任务状态|
|nominee|String|执行人|
|createTime|Date|创建时间|
|updateTime|Date|更新时间|

### 博客目录表blog_catalog
|属性|类型|描述|
|----|----|----|
|_id|ObjectId|目录编号|
|name|String|目录名称|
|weight|Int|目录权重|
|createTime|Date|创建时间|
|updateTime|Date|更新时间|

### 博客文章表blog_article
|属性|类型|描述|
|----|----|----|
|_id|ObjectId|编号|
|title|String|文章题目|
|isTop|Boolean|文章置顶|
|author|String|文章作者|
|outline|String|文章简介|
|content|String|文章内容|
|thumbnail|String|文章缩略图|
|catalogId|ObjectId|所属目录|
|readCount|Int|阅读人数|
|commentsCount|Int|评论人数|
|createTime|Date|创建时间|
|updateTime|Date|更新时间|

### 管理员表admin
|属性|类型|描述|
|----|----|----|
|_id|ObjectId|管理编号|
|name|String|用户名字|
|roles|Array|角色列表|
|password|String|用户密码|
|descript|String|职能描述|
|loginIp|String|登录IP|
|loginCount|String|登录次数|

### 角色表role
|属性|类型|描述|
|----|----|----|
|_id|ObjectId|角色编号|
|name|String|角色名称|
|permissions|Array|资源列表|

### 许可表permission
|属性|类型|描述|
|----|----|----|
|_id|ObjectId|许可编号|
|action|String|操作种类|
|source|String|资源路径|

### 日志表log
|属性|类型|描述|
|----|----|----|
|_id|ObjectId|日志编号|
|username|String|用户名称|
|type|String|日志类型|
|action|String|操作种类|
|source|String|资源路径|
|ip|String|操作IP|
|params|String|请求参数|
|result|String|操作结果|

### 菜单秒menu
|属性|类型|描述|
|----|----|----|
|_id|ObjectId|菜单编号|
|name|String|菜单名称|
|url|String|菜单路径|
|icon|String|菜单图标|
|type|String|菜单类型|
|parentId|ObjectId|父级菜单|
|createTime|Date|创建时间|
|updateTime|Date|更新时间|

