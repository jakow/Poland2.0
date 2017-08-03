import ProgressBar from './progress-bar';
import anime from 'animejs';
const BREAKPOINT = 768;

const animationParams = {
  progressTiming: 300,
  captionTiming: 600,

};

class Loader {
  public progressBar: ProgressBar;
  private element: HTMLElement;
  private progressElem: HTMLElement;
  private logo: SVGSVGElement;
  private container: HTMLElement;
  private caption: HTMLElement;
  private captionText: HTMLElement;
  private captionCover: HTMLElement;
  private isDesktop: boolean;

  // dimensions
  private distanceToCenter: number;
  private captionDistance: number;

  // list of resources
  private resources: string[] = [];

  constructor() {
    // create progressbar and obtain handles to elements
    if (document.readyState === 'interactive') {
      this.init();
    } else {
      document.addEventListener('DOMContentLoaded', () => this.init());
    }
  }

  public init() {
    this.element = document.querySelector('.loader') as HTMLElement;
    this.progressElem = this.element.querySelector('.loader__progress') as HTMLElement;
    this.progressBar = new ProgressBar(this.progressElem as HTMLElement);
    this.container = this.element.querySelector('.loader__container') as HTMLElement;
    this.logo = this.element.querySelector('.loader__logo svg') as SVGSVGElement;
    this.caption = this.element.querySelector('.loader__caption') as HTMLElement;
    this.captionText = this.element.querySelector('.loader__caption-text') as HTMLElement;
    this.captionCover = this.element.querySelector('.loader__caption-cover') as HTMLElement;

    this.computeDimensions();
    this.progressBar.onFinished = () => this.hide();
    this.loadResources();
  }

  public addResource(url: string) {
    this.resources.push(url);
  }

  // public set progress(value: number) {
  //   this.progressBar.progress = value;
  // }

  public get progress() {
    return this.progressBar.progress;
  }

  public show() {
    document.body.classList.add('prevent-scroll');
    setTimeout( () => this.showLogo());
    setTimeout( () => this.showProgressBar(), animationParams.progressTiming);
    setTimeout( () => this.showCaption(), animationParams.captionTiming);
  }

  public hide() {
    anime({
      targets: this.element,
      opacity: 0,
      duration: 300,
      easing: 'easeInOutQuart',
      delay: 0,
      complete: () => {
        this.element.style.display = 'none';
        document.body.classList.remove('prevent-scroll');
      },
    });
  }

  private async loadResources() {
    // the resources should be cacheable
    const nOfResources = this.resources.length;
    this.resources.map( (r) => fetch(r).then((response) => {
      this.progressBar.progress += 100 / nOfResources;
    }));
    // when all are done, the progress bar will resolve the on finished promise which will trigger
    // the 'hide' event
  }

  private computeDimensions() {
    this.isDesktop = window.innerWidth >= BREAKPOINT;
    const center = window.innerWidth / 2;
    const logo = this.logo.getBoundingClientRect();
    const caption = this.captionCover.getBoundingClientRect();
    if (this.isDesktop) {
      const logoCenter = (logo.left + logo.right) / 2;
      // find the center of the screen
      // find logo center
      this.distanceToCenter = center - logoCenter;
      this.captionDistance = logo.right - caption.right;
      this.container.style.left = `${this.distanceToCenter}px`;
      this.caption.style.transform = `translateX(${this.captionDistance}px)`;
    } else {
      this.captionDistance = logo.bottom - caption.bottom;
      this.caption.style.transform = `translateY(${this.captionDistance}px)`;
    }
  }

  private showCaption() {
    if (this.isDesktop) {
      anime({
        targets: this.container,
        translateX: -this.distanceToCenter,
        easing: 'easeInOutQuart',
        duration: 400,
      });

      anime({
        targets: this.captionText,
        translateX: -this.captionDistance,
        easing: 'easeInOutQuart',
        delay: 100,
        duration: 400,
      });
    } else {
      anime({
        targets: this.captionText,
        translateY: -this.captionDistance,
        easing: 'easeInOutQuart',
        duration: 400,
      });
    }
  }

  private showLogo() {
    this.logo.classList.add('show');
  }

  private showProgressBar() {
    this.progressElem.classList.add('show');
  }
}

const loader = new Loader();

export default loader;
