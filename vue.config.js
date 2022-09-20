const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});

// module.exports = {
//   configureWebpack: {
//     devServer: {
//       headers: {
//          'Access-Control-Allow-Origin': '*',
// 	        'X-Content-Type-Options': "nosniff"
//       }
//     }
//   },
// }
