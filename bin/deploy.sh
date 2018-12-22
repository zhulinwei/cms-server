CONTAINER_NAME="cms-server"
CONTAINER_ID=$(docker ps -a | grep "${CONTAINER_NAME}" | awk '{print $1}') 
CONTAINER_PORT=3451
IMAGE_TAG=$1
IMAGE_NAME="registry.cn-hangzhou.aliyuncs.com/zhulinwei/cms_server:${IMAGE_TAG}"
if [ "${CONTAINER_ID}" != "" ];then
  docker stop ${CONTAINER_NAME}
  docker rm -f ${CONTAINER_NAME}
fi
 docker run -d -p ${CONTAINER_PORT}:${CONTAINER_PORT} --name ${CONTAINER_NAME} ${IMAGE_NAME}
