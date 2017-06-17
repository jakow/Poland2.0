declare module 'animejs' {
  type AnimeTarget =  string | Node | NodeList | {}; 
  type PropFunction<T> = (el: Node, i: number, l: number) => T;
  namespace anime {
    export interface AnimeProps {
      targets: AnimeTarget | AnimeTarget[];
      direction?: 'normal' | 'alternate' | 'reverse' | 'alternate-reverse';
      duration?: number;
      loop?: number | boolean;
      [prop: string]: any;
    }
    export interface Animation {
      finished: Promise<{}>;
      add(props: AnimeProps): anime.Animation;
      play(): void;
      pause(): void;
      reverse(): void;
    }
  }
  function anime(props: anime.AnimeProps): anime.Animation;
  export = anime;


}