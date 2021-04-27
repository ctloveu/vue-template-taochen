var express = require('express')
var proxy = require('http-proxy-middleware')
var app = express()
app.use(express.static('./dist'))

app.use('/api', proxy({
    target: 'http://localhost:8083',
    changeOrigin: true,
    ws: true,
    pathRewrite: {
        '^/api': ''
    }
}))

app.listen(9036)
