import './main.scss';
import * as moment from 'moment';
import Loader from './layout/loader/loader';
import * as lazyImages from './components/lazy-image/lazy-image';
import Menu from './layout/menu/menu';
import './sockets';
console.log('Hello world from client!');
console.log(`The date is ${moment(Date.now()).format('DD MMMM YY')}`);

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
  const images = lazyImages.init();
  const logo = document.querySelector('#show-logo');
  if (logo) {
    logo.addEventListener('click', () => {
    document.querySelector('.animated-logo').classList.toggle('show');
  });
  }
});
