import './main.scss';
import * as moment from 'moment';
import * as Headroom from 'headroom.js';
import jump from 'jump.js';
import {debounce} from 'lodash';
import Loader from './layout/loader/loader';
import Menu from './layout/menu/menu';
import * as lazyImages from './components/lazy-image/lazy-image';
import {animatedHashAnchors, initHashNavigation, JUMP_OPTIONS} from './clientUtils';

document.addEventListener('DOMContentLoaded', () => {
  const loader = new Loader(document.querySelector('.loader') as HTMLElement);
  loader.hide();
  const menu = new Menu();
  const siteHeader = document.querySelector('.site-header');
  const headroom = new Headroom(siteHeader, {
    offset: 70,
    onUnpin: function() { // tslint:disable-line
      if (menu.isOpen) {
        this.elem.classList.remove(this.classes.unpinned);
        this.elem.classList.add(this.classes.pinned);
      } else {
        this.elem.classList.add(this.classes.unpinned);
        this.elem.classList.remove(this.classes.pinned);
      }
    },
  });
  headroom.init();
  lazyImages.init();
  animatedHashAnchors(() => { if (menu.isOpen) { menu.close(); }});
  initHashNavigation();
});