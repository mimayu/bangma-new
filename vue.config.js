module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://www.51bangma.com',
                changeOrigin: true,
                secure: false,
                onProxyRes(proxyRes, req, res) {
                    var cookies = proxyRes.headers['set-cookie']
                    if (cookies == null || cookies.length == 0) {
                        delete proxyRes.headers['set-cookie']
                        return
                    }
                    for (var i = 0,n = cookies.length; i < n; i++) {
                        if(cookies[i].match(/^JSESSIONID=[^;]+;[\s\S]*Path=\/[^;]+/)){
                            cookies[i] = cookies[i].replace(/Path=\/[^;]+/,'Path=/');
                        }
                    }

                    proxyRes.headers['set-cookie'] = cookies;
                },
                historyApiFallback: true
            }
        }
    }
};