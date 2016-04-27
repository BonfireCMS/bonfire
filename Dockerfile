FROM dylanfoster/node:5
MAINTAINER Dylan Foster <dylan947@gmail.com>

COPY ./admin/dist /data/app/admin/dist
COPY ./content /data/app/content
COPY ./server /data/app/server
COPY ./config.js /data/app/config.js
COPY ./index.js /data/app/index.js
COPY ./package.json /data/app/package.json

RUN rm -rf /data/app/server/{scripts,test}

ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "start"]
