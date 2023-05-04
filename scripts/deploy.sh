echo '开始删除后端业务镜像和容器'

docker stop apt_threat_api

docker rm apt_threat_api

docker rmi apt_threat_api

echo '后端业务镜像和容器删除成功'

if [ "$1" = "base" ]; then

  echo '开始删除后端基础镜像'

  docker rmi apt_threat_api_base

  echo '删除基础镜像成功，开始构建后端基础镜像'

  docker build -f Dockerfile.base -t apt_threat_api_base .

  echo '后端基础镜像构建成功'

fi

echo '开始构建后端业务镜像'

docker build -t apt_threat_api .

echo '后端业务镜像构建成功'

echo  '开始跑后端容器'

docker run -itd \
  --restart=always \
  --network=box_net \
  --name=apt_threat_api \
  -p 7100:7001 \
  apt_threat_api

echo '后端容器运行成功'
