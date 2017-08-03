import * as Swiper from 'swiper';
import Agenda from '../../components/agenda/agenda';

document.addEventListener('DOMContentLoaded', () => {
  const banner = document.querySelector('.banner');
  const bannerSlider = new Swiper(banner.querySelector('.banner__slider'), {
      loop: true,
      autoplay: 2000,
      speed: 500,
      pagination: '.swiper-pagination',
      lazyLoading: true,
      a11y: true,
    });
  const agendaContainer = document.querySelector('.agenda');
  if (agendaContainer) {
    const agenda = new Agenda(agendaContainer);
  }
});
