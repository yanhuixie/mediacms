import React, { createContext } from 'react';
import { config as mediacmsConfig } from '../settings/config.js';

const config = mediacmsConfig(window.MediaCMS);

const links = config.url;
const theme = config.theme;
const user = config.member;

const hasThemeSwitcher = theme.switch.enabled && 'header' === theme.switch.position;

function popupTopNavItems() {
  const items = [];

  if (!user.is.anonymous) {
    if (user.can.addMedia) {
      items.push({
        link: links.user.addMedia,
        icon: 'video_call',
        text: '上传媒体',
        itemAttr: {
          className: 'visible-only-in-small',
        },
      });

      if (user.pages.media) {
        items.push({
          link: user.pages.media,
          icon: 'video_library',
          text: '我的媒体',
        });
      }
    }

    items.push({
      link: links.signout,
      icon: 'exit_to_app',
      text: '注销',
    });
  }

  return items;
}

function popupMiddleNavItems() {
  const items = [];

  if (hasThemeSwitcher) {
    items.push({
      itemType: 'open-subpage',
      icon: 'brightness_4',
      iconPos: 'left',
      text: '切换主题',
      buttonAttr: {
        className: 'change-page',
        'data-page-id': 'switch-theme',
      },
    });
  }

  if (user.is.anonymous) {
    if (user.can.login) {
      items.push({
        itemType: 'link',
        icon: 'login',
        iconPos: 'left',
        text: '登录',
        link: links.signin,
        linkAttr: {
          className: hasThemeSwitcher ? 'visible-only-in-small' : 'visible-only-in-extra-small',
        },
      });
    }

    if (user.can.register) {
      items.push({
        itemType: 'link',
        icon: 'person_add',
        iconPos: 'left',
        text: '注册',
        link: links.register,
        linkAttr: {
          className: hasThemeSwitcher ? 'visible-only-in-small' : 'visible-only-in-extra-small',
        },
      });
    }
  } else {
    items.push({
      link: links.user.editProfile,
      icon: 'brush',
      text: '编辑个人信息',
    });

    if (user.can.changePassword) {
      items.push({
        link: links.changePassword,
        icon: 'lock',
        text: '修改密码',
      });
    }
  }

  return items;
}

function popupBottomNavItems() {
  const items = [];

  if (user.is.admin) {
    items.push({
      link: links.admin,
      icon: 'admin_panel_settings',
      text: 'MediaCMS 后台管理',
    });
  }

  return items;
}

export const HeaderContext = createContext({
  hasThemeSwitcher,
  popupNavItems: {
    top: popupTopNavItems(),
    middle: popupMiddleNavItems(),
    bottom: popupBottomNavItems(),
  },
});

export const HeaderConsumer = HeaderContext.Consumer;