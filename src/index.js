/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd';
import { addLocaleData, IntlProvider } from 'react-intl';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './index.less';

// get language
const lang = (navigator.language || navigator.browserLanguage).toLowerCase();
let appLocale;

if (lang.includes('zh')) {
  const appLocaleData = require('react-intl/locale-data/zh');
  const zhMessages = require('./locales/zh');

  appLocale = Object.assign({}, {
    messages: {
      ...zhMessages,
    },
    antd: null,
    locale: 'zh-CN',
    data: appLocaleData,
  });
} else {
  const antdEn = require('antd/lib/locale-provider/en_US');
  const appLocaleData = require('react-intl/locale-data/en');
  const enMessages = require('./locales/en');

  appLocale = Object.assign({}, {
    messages: {
      ...enMessages,
    },
    antd: antdEn,
    locale: 'en-US',
    data: appLocaleData,
  });
}
addLocaleData(appLocale.data);

ReactDOM.render(
  <LocaleProvider locale={appLocale.antd}>
    <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
      <App />
    </IntlProvider>
  </LocaleProvider>,
  document.getElementById('root')
);
registerServiceWorker();
