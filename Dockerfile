FROM dylanfoster/node:5
MAINTAINER Dylan Foster <dylan947@gmail.com>

COPY . /data/app
RUN rm -rf /data/app/admin/{app,bower_components,config,node_modules,public,tests,tmp,vendor} \
      && rm -rf /data/app/scripts
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]
