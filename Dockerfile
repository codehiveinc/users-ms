FROM node:20.15.0-alpine3.19

# Create app directory
WORKDIR /app

EXPOSE 3000

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