FROM node:latest
COPY . .
RUN npm ci
CMD npm run build && npm run start