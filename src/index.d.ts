import { Properties as CSSProperties } from "csstype";
import { JSX } from "solid-js";
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
export declare function setup(prefixer: (key: string, value: any) => string): void;
export declare function ThemeProvider<
  T extends {
    theme: any;
    children?: any;
  }
>(props: T): JSX.Element;
export declare function useTheme(): unknown;
type Tagged<T> = <P>(
  args_0:
    | string
    | TemplateStringsArray
    | CSSAttribute
    | ((
        props: P &
          T & {
            theme?: any;
            as?: string | number | symbol | undefined;
            className?: any;
            children?: any;
          }
      ) => string | CSSAttribute),
  ...args_1: (
    | string
    | number
    | ((
        props: P &
          T & {
            theme?: any;
            as?: string | number | symbol | undefined;
            className?: any;
            children?: any;
          }
      ) => string | number | CSSAttribute | undefined)
  )[]
) => ((props: P & T) => JSX.Element) & {
  className: (props: P & T) => string;
};
export declare function styled<T extends keyof JSX.IntrinsicElements>(
  tag: T | ((props: JSX.IntrinsicElements[T]) => JSX.Element)
): Tagged<JSX.IntrinsicElements[T]>;
export declare function styled<T>(component: (props: T) => JSX.Element): Tagged<T>;
export declare function createGlobalStyles(
  tag: CSSAttribute | TemplateStringsArray | string,
  ...props: Array<string | number | Function>
): Function;
