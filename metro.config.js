/* eslint-disable no-undef */
module.exports = {
	transformer: {
		assetPlugins: ['expo-asset/tools/hashAssetFiles'],
	},
	resolver: {
		extraNodeModules: {
			utils: `${__dirname}/src/utils`,
			components: `${__dirname}/src/components`,
			assets: `${__dirname}/src/assets`,
			screens: `${__dirname}/src/screens`,
			store: `${__dirname}/src/store`,
			constants: `${__dirname}/src/constants`,
		},
	},
};
