// module level variables for determining the state of google api
import googleMapsApiAsync from '../../mixins/googleMapsApiAsync';
import anime = require('animejs');
import jump from 'jump.js';
import {debounce} from 'lodash';
import {HEADER_HEIGHT, headerAwareTargetOffset} from '../../clientUtils';

const TRANSITION_DURATION = 350; // ms
const SCROLL_DURATION = 500; // ms
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

    // add a map if not already added
    if (!el.dataset.hasMap) {
      this.addMap(el);
    }
    // animate height of the element
    anime({
      targets: detailsContainer,
      height,
      easing: 'easeInOutSine',
      duration: TRANSITION_DURATION,
    });

    jump(el, {
      offset: headerAwareTargetOffset(el),
      duration: SCROLL_DURATION,
    });
  }

  private close(el: HTMLElement) {
    const detailsContainer = el.querySelector(DETAILS_CONTAINER_SELECTOR);
    anime({
      targets: detailsContainer,
      height: 0,
      easing: 'easeInOutSine',
      duration: TRANSITION_DURATION,
    });
    // scroll to top
    jump(el, {
      offset: headerAwareTargetOffset(el),
      duration: SCROLL_DURATION,
    });
  }

  private async addMap(el: HTMLElement) {
    // el.dataset
    // initialise a google map on the element
    // first, wait for the Google Maps API to load
    try {
      const mapEl = el.querySelector(MAP_SELECTOR) as HTMLElement;
      const maps = await googleMapsApiAsync();
      const address = JSON.parse(mapEl.dataset.location) as ServerSideAddress;
      const position = new maps.LatLng(address.geo[1], address.geo[0]);
      const map = new maps.Map(mapEl, {
        center: position,
        scrollwheel: false,
        mapTypeId: maps.MapTypeId.ROADMAP,
        zoomControl: true,
        zoom: 17,
      });
      const marker = new maps.Marker({
        map,
        position,
      });
      el.dataset.hasMap = 'true';
    } catch (e) {
      // show a toast or sth
      // map will remain in loading state, maybe add an 'X'
      console.error('Failed to show map');
      // and retry next time
    }
  }

  private detailsHeight(containerEl: HTMLElement) {
    const details = containerEl.querySelector(DETAILS_SELECTOR) as HTMLElement;
    const {top, bottom} = details.getBoundingClientRect();
    return bottom - top;
  }

  private adjustHeight = () => {
    const items = document.getElementsByClassName(EXPANDED_CLASS);
    const length = items.length;
    for (let i = 0; i < length; ++i) {
      const item = items[i];
      const detailsContainer = item.querySelector(DETAILS_CONTAINER_SELECTOR) as HTMLElement;
      const height = this.detailsHeight(detailsContainer);
      anime({
        targets: detailsContainer,
        height,
        duration: 1,
      });
    }
  }
}

interface ServerSideAddress {
  country: string;
  name: string;
  number: number;
  postcode: string;
  state: string;
  street1: string;
  street2: string;
  suburb: string;
  geo: number[];
}
