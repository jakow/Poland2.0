import anime from 'animejs';
import {throttle} from 'lodash';

interface Options {
  color: string;
  trailColor: string;
  barWidth: 200;
  pathWidth: number;
  trailWidth: number;
  barClassName: string;
  valueClassName: string;
}

const defaultOptions: Options = {
  color: "#888",
  trailColor: "#f0f0f0",
  barWidth: 200,
  pathWidth: 1,
  trailWidth: 1,
  barClassName: 'loader__progress-bar',
  valueClassName: 'loader__progress-value',
};

export default class ProgressBar {
  public onFinished?: () => void;
  private opts: Options;
  private val: number;
  private barElem: HTMLElement;
  private valueElem: HTMLElement;
  private svg: SVGSVGElement;
  private pathElem: SVGPathElement;
  private trailElem: SVGPathElement;

  // animation properties
  private pathAnim: anime.AnimeProps;
  private valueAnim: anime.AnimeProps;
  private counter: {val: number};

  constructor(private container: HTMLElement, opts?: Partial<Options>) {
    this.opts = {...defaultOptions, ...opts};
    // Create a number of dom elements and append them to the document
    this.barElem = this.createElement(this.opts.barClassName);
    this.valueElem = this.createElement(this.opts.valueClassName);
    const svgView = this.createSvgView();
    this.svg = svgView.svg;
    this.pathElem = svgView.path;
    this.barElem.appendChild(this.svg);
    this.container.appendChild(this.barElem);
    this.container.appendChild(this.valueElem);

    this.container.setAttribute('role', 'progressbar');
    this.container.setAttribute('aria-valuemin', '0');
    this.container.setAttribute('aria-valuemax', '100');

    this.pathAnim = {
      targets: this.pathElem,
      duration: 300,
      easing: 'easeInOutQuart',
    };
    this.valueAnim = {
      targets: null,
      duration: 300,
      easing: 'easeInOutQuart',
    };
    this.counter = {val: 0};
    this.reset();
  }

  public get progress() {
    return this.val;
  }

  public set progress(newVal: number) {
    const oldVal = this.val;
    this.val = newVal;
    this.container.setAttribute('aria-valuenow', newVal.toString());
    this.animate(oldVal, newVal);
  }

  public reset(value: number = 0) {
    this.val = value;
    // reset manually rather than with anime
    this.pathElem.style.transform = `scaleX(${value / 100})`;
    this.container.setAttribute('aria-valuenow', value.toString());
    this.setPercentageText(value);

  }

  private setPercentageText(value: number) {
    this.valueElem.innerText = `${value.toFixed(0)}%`;
  }

  private animate(oldVal: number, newVal: number) {
    this.counter.val = oldVal;
    anime({
      ...this.pathAnim,
      scaleX: newVal / 100,
    });

    anime({
      ...this.valueAnim,
      targets: this.counter,
      val: newVal,
      // update the loader if finished
      update: () => (this.setPercentageText(Number(this.counter.val))),
      complete: () => this.finishedCallback(),
      // issue a callback when finished
    });
  }

  private finishedCallback() {
    // tslint:disable-next-line:triple-equals
    if (this.counter.val == 100 && this.onFinished) {
      this.onFinished();
    }
  }

  private createElement(className: string) {
    const barElem = document.createElement('div');
    barElem.classList.add(className);
    return barElem;
  }

  private createSvgView(): {svg: SVGSVGElement, path: SVGPathElement, trail: SVGPathElement} {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.setAttribute('viewBox', `0 0 100 ${this.opts.pathWidth}`);
    svg.setAttribute('preserveAspectRatio', 'none');

    const path = this.createPathElement(this.opts.pathWidth, this.opts.color);
    const trail = this.createPathElement(this.opts.trailWidth, this.opts.trailColor);

    svg.appendChild(trail);
    svg.appendChild(path);
    return {svg, path, trail};
  }

  private createPathElement(width: number, color: string) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    path.setAttribute('d', linePath(this.opts.pathWidth / 2));
    path.setAttribute('stroke-width', width.toString());
    path.setAttribute('stroke', color);
    path.setAttribute('fill-opacity', '0');
    return path;
  }
}

function linePath(center: number) {
  return `M 0,${center} L 100,${center}`;
}
