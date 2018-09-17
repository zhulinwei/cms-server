# image_tag=$1
# container_name=cms_server
# image_name=registry.cn-hangzhou.aliyuncs.com/zhulinwei/cms_server:latest
# server_port=3451
# data_dir="/home/cms_server/"
# container_id=$(docker ps -a | grep "${container_name}" | awk '{print $1}')
# echo ${container_id}
# if [ "${container_id}" != "" ];then
#   docker stop ${container_name}
#   docker rm ${container_name}
#   docker rmi  ${image_name}
# fi
#  docker run -d -p ${server_port}:${server_port} --name ${container_name} ${image_name}
# 
CONTAINER_NAME="cms_server"
CONTAINER_ID=$(docker ps -a | grep "${CONTAINER_NAME}" | awk '{print $1}') 
CONTAINER_PORT=3451
IMAGE_TAG=$1
IMAGE_NAME="registry.cn-hangzhou.aliyuncs.com/zhulinwei/cms_server:${IMAGE_TAG}"
if [ "${CONTAINER_ID}" != "" ];then
  docker stop ${CONTAINER_NAME}
  docker rm -f ${CONTAINER_NAME}
fi
 docker run -d -p ${CONTAINER_PORT}:${CONTAINER_PORT} --name ${CONTAINER_NAME} ${IMAGE_NAME}


