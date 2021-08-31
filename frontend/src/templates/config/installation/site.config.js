module.exports = {
  devEnv: 'true' === process.env.WEBPACK_DEV_SERVER,
  id: process.env.MEDIACMS_ID || 'mediacms-frontend',
  title: process.env.MEDIACMS_TITLE || 'MediaCMS Demo',
  url: process.env.MEDIACMS_URL || 'UNDEFINED_URL',
  api: process.env.MEDIACMS_API || 'UNDEFINED_API',
  theme: {
    mode: 'light', // Valid values: 'light', 'dark'.
    switch: {
      position: 'sidebar', // Valid values: 'header', 'sidebar'.
    },
  },
  logo: {
    lightMode: {
      svg: './static/images/logo_dark.svg',
      img: './static/images/logo_dark.png',
    },
    darkMode: {
      svg: './static/images/logo_light.svg',
      img: './static/images/logo_light.png',
    },
  },
  pages: {
    latest: {
      title: '最新',
    },
    featured: {
      title: '精选',
    },
    recommended: {
      title: '推荐',
    },
    members: {
      title: '成员',
    },
  },
  userPages: {
    liked: {
      title: '喜欢的媒体',
    },
    history: {
      title: '历史',
    },
  },
  taxonomies: {
    tags: {
      title: '标签',
    },
    categories: {
      title: '分类',
    },
  },
};
