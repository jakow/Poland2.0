import * as Swiper from 'swiper';
import Agenda from '../../components/agenda/agenda';
import Form from '../../components/form/form';
import {contactFormConstraints} from '../../layout/contact-form/contact-form';
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

  const agenda = new Agenda(document.querySelector('.agenda'));
  const contactForm = new Form(document.getElementById('contact-form') as HTMLFormElement, contactFormConstraints);
});
