import './main.scss';
import * as moment from 'moment';
import Loader from './layout/loader/loader';
import * as lazyImages from './components/lazy-image/lazy-image';
import Menu from './layout/menu/menu';
import './sockets';
import {debounce} from 'lodash';

document.addEventListener('DOMContentLoaded', () => {

  const loader = new Loader(document.querySelector('.loader') as HTMLElement);
  const menu = new Menu();
  // loader.show();
  // const interval = setInterval ( () => {
  //   loader.progress += 10;
  //   if (loader.progress === 100) {
  //     clearInterval(interval);
  //   }
  // }, 300);

  loader.hide();
  lazyImages.init();
});

window.addEventListener('scroll', debounce(() => console.log(window.scrollY), 500));
