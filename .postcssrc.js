module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    'postcss-aspect-ratio-mini': {},
    'postcss-write-svg': {
      utf8: false,
    },
    "postcss-preset-env": {},
    'postcss-px-to-viewport': {
      viewportWidth: 375, // 视窗宽度,对应设计稿的宽度，移动端一般是 750px=375 * 2 换算公式：[ 100 * px = vw * 375  ]
      unitPrecision: 5, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      fontViewportUnit: 'vw', // 字体的预期单位
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: true, // 允许在媒体查询中转换`px` 例如 @keyframes 中的 px
    },
    'postcss-viewport-units': {
      filterRule: rule => rule.selector.indexOf('::after') === -1 && rule.selector.indexOf('::before') === -1 && rule.selector.indexOf(':after') === -1 && rule.selector.indexOf(':before') === -1
    },
    cssnano: {
      preset: 'advanced',
      'postcss-zindex': false,
    },
  },
};
