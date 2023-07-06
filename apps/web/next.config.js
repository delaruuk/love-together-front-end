
module.exports = {
	reactStrictMode: false,
	experimental: {
		transpilePackages: [
			"ui",
			"models",
			"utils",
			"assets",
			"context",
			"firebase-config",
		],
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				port: "",
				pathname: "/**",
			},
		],
	},
	// Video player configuration
	webpack: (config) => {
		config.module.rules.push({
		  test: /\.(mp4|webm)$/i,
		  use: [
			{
			  loader: 'file-loader',
			  options: {
				publicPath: '/_next/static/videos/',
				outputPath: 'static/videos/',
				name: '[name].[ext]',
				esModule: false,
			  },
			},
		  ],
		});
		return config;
	},
};
