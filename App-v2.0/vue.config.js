module.exports = {
    lintOnSave: false,

	devServer: {
		port: 8080,
		open: true,
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				ws: true,
				changeOrigin: true,
				pathRewrite: {
					// '^/api': '/api/v2'
					'^/api': '/'
				}
			}
		}
	}
    
};