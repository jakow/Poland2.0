// Type definitions for jump.js 1.0
// Project: https://github.com/callmecavs/jump.js
// Definitions by: rhysd <https://rhysd.github.io>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped


declare module 'jump.js' {
  function jump(target: string | Element | number, opts?: jump.Options): void;
  namespace jump {
    type TransitionFunc = (t: number, b: number, c: number, d: number) => number;
    interface Options {
      duration?: number | ((duration: number) => number);
      offset?: number;
      callback?(): void;
      easing?: TransitionFunc;
      a11y?: boolean;
    }
  }
  export default jump;
}
