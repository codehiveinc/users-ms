FROM node:20.15.0-alpine3.19

# Create app directory
WORKDIR /app

RUN npm install -g typescript@5.5.3

# Install app dependencies
COPY package.json ./

RUN npm install

# Bundle app source
COPY . .

# Build the app
RUN npm run build

# prisma generate
RUN npx prisma generate

# Serve the app
CMD ["npm", "start"]
