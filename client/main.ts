import './main.scss';
import * as moment from 'moment';
import Menu from './components/menu/menu';
import * as lazyImages from './components/lazy-image/lazy-image';
console.log('Hello world from client!');
console.log(`The date is ${moment(Date.now()).format('DD MMMM YY')}`);

document.addEventListener('DOMContentLoaded', () => {
  const images = lazyImages.init();
  document.querySelector('#show-logo').addEventListener('click', () => {
    document.querySelector('.animated-logo').classList.toggle('show');
  });
});


