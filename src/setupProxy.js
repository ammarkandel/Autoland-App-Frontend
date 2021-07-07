require('dotenv').config();
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(createProxyMiddleware('/auth/signin', {
    target: `http://localhost:3001`,
  }));

  app.use(createProxyMiddleware('/auth/signup', {
    target: `http://localhost:3001`,
  }));
};
