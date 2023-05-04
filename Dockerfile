
FROM apt_threat_api_base

WORKDIR /opt/node_app

COPY . .

CMD yarn migrations &&  yarn start