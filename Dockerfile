FROM node:10.9.0

ENV NAME cms-server
ENV PORT 3451
ENV NODE_ENV test
ENV MONGODB_CMS mongodb://localhost:27017/cms
ENV REDIS_CMS redis://:localhost:6379/0
ENV QINIU_BUCKET your_qiniu_bucket
ENV QINIU_HOST your_qiniu_host
ENV QINIU_ACCESS_KEY your_qiniu_access_token
ENV QINIU_SECRET_KEY your_qiniu_secret_key
ENV QQ_WEB_APPID your_qq_web_app_id
ENV QQ_WEB_APPKEY your_qq_web_app_key
ENV MAIL_HOST smtp.qq.com
ENV MAIL_PORT 465
ENV MAIL_USER your_mail_user
ENV MAIL_PASSWORD your_mail_password
 
COPY . /home/cms_server
WORKDIR /home/cms_server

RUN npm --registry=https://registry.npm.taobao.org --disturl=https://npm.taobao.org/dist install

EXPOSE 3451

CMD ["npm", "start"]
