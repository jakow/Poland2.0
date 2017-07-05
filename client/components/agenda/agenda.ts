// module level variables for determining the state of google api
import googleMapsApiAsync from '../../mixins/googleMapsApiAsync';

export default class Agenda {
  private eventElements: Element[];
  constructor(private container: Element) {
    this.eventElements = Array.from(container.querySelectorAll('.agenda-event'));
    for (const elem of this.eventElements) {
      console.log(elem);
    }
  }
}
