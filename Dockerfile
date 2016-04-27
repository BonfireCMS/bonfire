FROM dylanfoster/node:5
MAINTAINER Dylan Foster <dylan947@gmail.com>

COPY . /data/app
RUN rm -rf /data/app/admin/{tests,tmp}
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]
