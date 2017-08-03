// declare module 'animejs' {
//   export = anime;

//   namespace anime {
//     export type AnimeTarget =  string | Node | NodeList | {}; 
//     export type PropFunction = (el: Node, i: number, l: number) => any;

//     export interface AnimeProps {
//       targets: AnimeTarget | AnimeTarget[];
//       direction?: 'normal' | 'alternate' | 'reverse' | 'alternate-reverse';
//       duration?: number;
//       loop?: number | boolean;
//       [prop: string]: any;
//     }
//     export interface Animation {
//       finished: Promise<{}>;
//       play(): void;
//       pause(): void;
//       reverse(): void;
//     }
//     export interface AnimationTimeline extends Animation {
//       add(props: AnimeProps): anime.Animation;
//     }

//     export function timeline(): AnimationTimeline;
//   }
//   function anime(props: anime.AnimeProps): anime.Animation;

// }

declare module 'animejs' {
  namespace anime {
    export type AnimeTarget =  string | Node | NodeList | {}; 
    export type PropFunction = (el: Node, i: number, l: number) => any;
    export interface AnimeProps {
      targets: AnimeTarget | AnimeTarget[];
      direction?: 'normal' | 'alternate' | 'reverse' | 'alternate-reverse';
      duration?: number;
      loop?: number | boolean;
      [prop: string]: any;
    }
    export interface Animation {
      finished: Promise<{}>;
      play(): void;
      pause(): void;
      reverse(): void;
    }
    export interface AnimationTimeline extends Animation {
      add(props: AnimeProps): AnimationTimeline;
    }
    
  export interface Anime {
    (props: AnimeProps): Animation;
    timeline(): AnimationTimeline;
  }
}
const anime: anime.Anime;
export = anime;
}
