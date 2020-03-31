
// ref: https://umijs.org/config/
const port = 7010;

export default {
  proxy: {
    "/app/": {
      "target": `http://localhost:${port}/`,
      "changeOrigin": true,
    },
  },
  treeShaking: true,
  // routes: [
  //   {
  //     path: '/',
  //     component: '../layouts/index',
  //     routes: [
  //       { path: '/', component: '../pages/index' }
  //     ]
  //   }
  // ],
  disableCSSModules: true,
  publicPath: '../public/',
  history: 'hash',
  hash: true,
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: '个人复式记账',
      dll: true,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
}
