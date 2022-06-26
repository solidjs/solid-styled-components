import { Properties as CSSProperties } from "csstype";
import { JSX } from "solid-js";
export interface DefaultTheme {}
export interface CSSAttribute extends CSSProperties {
  [key: string]: CSSAttribute | string | number | undefined;
}
export declare function keyframes(
  tag: TemplateStringsArray | string,
  ...props: Array<string | number>
): string;
export declare function extractCss(): string;
export declare function glob(
  tag: CSSAttribute | TemplateStringsArray | string,
  ...props: Array<string | number>
): void;
export declare function css(
  tag: CSSAttribute | TemplateStringsArray | string,
  ...props: Array<string | number>
): string;
export declare function shouldForwardProp(
  predicate: (x: string) => boolean
): (props: string[]) => string[];
export declare function setup(
  prefixer?: (key: string, value: any) => string,
  shouldForwardProp?: (props: string[]) => string[]
): void;
export declare function ThemeProvider<
  T extends {
    theme: DefaultTheme;
    children?: any;
  }
>(props: T): JSX.Element;
export declare function useTheme(): DefaultTheme;
type Tagged<T> = <P>(
  args_0:
    | string
    | TemplateStringsArray
    | CSSAttribute
    | ((
        props: P &
          T & {
            theme?: DefaultTheme;
            as?: string | number | symbol;
            class?: any;
            children?: any;
          }
      ) => string | CSSAttribute),
  ...args_1: (
    | string
    | number
    | ((
        props: P &
          T & {
            theme?: DefaultTheme;
            as?: string | number | symbol;
            class?: any;
            children?: any;
          }
      ) => string | number | CSSAttribute | undefined)
  )[]
) => ((props: P & T) => JSX.Element) & {
  class: (props: P & T) => string;
};
export interface Styled {
  <T extends keyof JSX.IntrinsicElements>(
    tag: T | ((props: JSX.IntrinsicElements[T]) => JSX.Element)
  ): Tagged<JSX.IntrinsicElements[T]>;
  <T>(component: (props: T) => JSX.Element): Tagged<T>;
}
export declare const styled: Styled & {
  [Tag in keyof JSX.IntrinsicElements]: Tagged<JSX.IntrinsicElements[Tag]>;
};
export declare function createGlobalStyles(
  tag: CSSAttribute | TemplateStringsArray | string,
  ...props: Array<string | number | Function>
): Function;
