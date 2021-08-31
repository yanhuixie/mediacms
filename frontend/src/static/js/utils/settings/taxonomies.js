let TAXONOMIES = null;

export function init(settings) {
  TAXONOMIES = {
    tags: {
      enabled: false,
      title: '标签',
    },
    categories: {
      enabled: false,
      title: '分类',
    },
  };

  if (void 0 !== settings) {
    for (let k in TAXONOMIES) {
      if (void 0 !== settings[k]) {
        TAXONOMIES[k].enabled = true;

        if (void 0 !== settings[k].enabled && false === settings[k].enabled) {
          TAXONOMIES[k].enabled = false;
        }

        if ('string' === typeof settings[k].title) {
          TAXONOMIES[k].title = settings[k].title.trim();
        }
      }
    }
  }
}

export function settings() {
  return TAXONOMIES;
}
