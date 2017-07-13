// module level variables for determining the state of google api
import googleMapsApiAsync from '../../mixins/googleMapsApiAsync';
import anime = require('animejs');
import {debounce} from 'lodash';

const TRANSITION_DURATION = 350; // ms
const BUTTON_SELECTOR = '.agenda-event__expand-details';
const DETAILS_CONTAINER_SELECTOR = '.agenda-event__details-container';
const DETAILS_SELECTOR = '.agenda-event__details';
const MAP_SELECTOR = '.agenda-event__map';
const EXPANDED_CLASS = 'agenda-event--expanded';

export default class Agenda {

  constructor(private container: Element) {

    container.addEventListener('click', (ev) => {
      const target = ev.target as Element;
      // find the parent anchor element
      let agendaElement = null;
      if (target.matches(BUTTON_SELECTOR)) {
        agendaElement = target.parentElement;
      } else if (target.parentElement.matches(BUTTON_SELECTOR)) {
        agendaElement = target.parentElement.parentElement;
      } else {
        return;
      }
      ev.preventDefault();
      // assume that the button is direct child of the agenda element to be expanded
      this.toggleAgenda(agendaElement);

    });
    window.addEventListener('resize', debounce(this.adjustHeight, 300));
  }

  private toggleAgenda(el: HTMLElement) {
    const expanded = el.classList.contains(EXPANDED_CLASS);
    if (!expanded) {
      el.classList.add(EXPANDED_CLASS);
      this.expand(el);
    } else {
      el.classList.remove(EXPANDED_CLASS);
      this.close(el);
    }
  }

  private async expand(el: HTMLElement) {
    const detailsContainer = el.querySelector(DETAILS_CONTAINER_SELECTOR) as HTMLElement;
    const height = this.detailsHeight(detailsContainer);
    const mapEl = el.querySelector(MAP_SELECTOR);
    anime({
      targets: detailsContainer,
      height,
      easing: 'easeInOutSine',
      duration: TRANSITION_DURATION,
    });
    if (!el.dataset.hasMap) {
      el.dataset.hasMap = 'true';
      // el.dataset
      // initialise a google map on the element
      // first, wait for the Google Maps API to load
      const maps = await googleMapsApiAsync();
      const map = new maps.Map(mapEl, {
        center: new maps.LatLng(-25.363, 131.044),
        scrollwheel: false,
      });
    }
  }

  private close(el: HTMLElement) {
    const detailsContainer = el.querySelector(DETAILS_CONTAINER_SELECTOR);
    anime({
      targets: detailsContainer,
      height: 0,
      easing: 'easeInOutSine',
      duration: TRANSITION_DURATION,
    });
    console.log('close');
  }

  private detailsHeight(containerEl: HTMLElement) {
    const details = containerEl.querySelector(DETAILS_SELECTOR) as HTMLElement;
    const {top, bottom} = details.getBoundingClientRect();
    return bottom - top;
  }

  private adjustHeight() {
    const items = document.querySelectorAll(EXPANDED_CLASS);
    const length = items.length;
    for (let i = 0; i < length; ++i) {
      const item = items[i];
      const detailsContainer = item.querySelector(DETAILS_CONTAINER_SELECTOR) as HTMLElement;
      const height = this.detailsHeight(detailsContainer);
      anime({
        targets: item,
        height,
        duration: 1,
      });
    }
  }
}
