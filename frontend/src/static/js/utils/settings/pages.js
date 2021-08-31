let PAGES = null;

export function init(settings) {
  PAGES = {
    latest: {
      enabled: false,
      title: '最新',
    },
    featured: {
      enabled: false,
      title: '精选',
    },
    recommended: {
      enabled: false,
      title: '推荐',
    },
    members: {
      enabled: false,
      title: '成员',
    },
    liked: {
      enabled: false,
      title: '喜欢的',
    },
    history: {
      enabled: false,
      title: '历史',
    },
  };

  if (void 0 !== settings) {
    for (let k in PAGES) {
      if (void 0 !== settings[k]) {
        PAGES[k].enabled = true;

        if (void 0 !== settings[k].enabled && false === settings[k].enabled) {
          PAGES[k].enabled = false;
        }

        if ('string' === typeof settings[k].title) {
          PAGES[k].title = settings[k].title.trim();
        }
      }
    }
  }
}

export function settings() {
  return PAGES;
}
