ARG NODE_VERSION=18.7.0


FROM node:${NODE_VERSION}

RUN apt-get update && apt-get install -y \
    libnss3\
    libatk1.0-0\
    libatk-bridge2.0-0\
    libcups2\
    libdrm2\
    libxkbcommon0\
    libxcomposite1\
    libxdamage1\
    libxfixes3\
    libxrandr2\
    libgbm1\
    libasound2


WORKDIR /app/server

COPY ../package*.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]