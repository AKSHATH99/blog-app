const { createProxyMiddleware } = require('http-proxy-middleware');


app.use(
    root.use(
  '/api',
  createProxyMiddleware({
    target: 'http://localhost:8000',
    changeOrigin: true,
    secure:false,
    headers:{
        'Access-Controll-Allow-Origin':"http://localhost:8000"
    }
  }),
)
);

app.listen(3000);