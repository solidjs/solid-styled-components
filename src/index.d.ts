import { Properties as CSSProperties } from "csstype";
import { JSX, Component } from "solid-js";

// This type is only available in Solid 1.5 or later.
type ValidComponent =
  | keyof JSX.IntrinsicElements
  | Component<any>
  | (string & {});

export interface DefaultTheme {}
export interface CSSAttribute extends CSSProperties {
  [key: string]: CSSAttribute | string | number | undefined;
}
type StylesGenerator<P = {}> =
  (props: P) => CSSAttribute | string;
type TagStyleGenerator<P = {}> =
  (props: P) => number | string | undefined;
type TagArgs<P = {}> = Array<string | TagStyleGenerator<P>>;
type StylesArg<P = {}> =
  | string
  | CSSAttribute
  | StylesGenerator<P>
  | Array<CSSAttribute | StylesGenerator<P>>;
export declare function keyframes(styles: StylesArg): string;
export declare function keyframes(
  tag: TemplateStringsArray,
  ...tagArgs: TagArgs
): string;
export declare function extractCss(): string;
export declare function glob(styles: StylesArg): void;
export declare function glob(
  tag: TemplateStringsArray,
  ...tagArgs: TagArgs
): void;
export declare function css(styles: StylesArg): string;
export declare function css(
  tag: TemplateStringsArray,
  ...tagArgs: TagArgs
): string;
export declare function shouldForwardProp(
  predicate: (x: string) => boolean
): (props: string[]) => string[];
export declare function setup(
  prefixer: null | ((key: string, value: any) => string),
  shouldForwardProp?: null | ((props: string[]) => string[])
): void;
export declare function ThemeProvider<
  T extends {
    theme: DefaultTheme;
    children?: any;
  }
>(props: T): JSX.Element;
export declare function useTheme(): DefaultTheme;
export interface ThemeProp {
  theme?: DefaultTheme;
}
interface AsProps {
  as?: ValidComponent;
}
type StylesFn<T> = <P>(
  styles: StylesArg<P & T & AsProps & ThemeProp>,
) => Component<P & T & AsProps> & {
  class: (props: P & T & AsProps) => string;
};
type TagFn<T> = <P>(
  tag: TemplateStringsArray,
  ...args: TagArgs<P & T & AsProps & ThemeProp>,
) => Component<P & T & AsProps> & {
  class: (props: P & T & AsProps) => string;
};
type StylingFn<T> = StylesFn<T> & TagFn<T>;
export interface Styled {
  <T extends keyof JSX.IntrinsicElements>(
    element: T | Component<JSX.IntrinsicElements[T]>
  ): StylingFn<JSX.IntrinsicElements[T]>;
  <T>(component: Component<T>): StylingFn<T>;
}
export declare const styled: Styled & {
  [element in keyof JSX.IntrinsicElements]: StylingFn<JSX.IntrinsicElements[element]>;
};
export declare function createGlobalStyles(
  tag: TemplateStringsArray,
  ...tagArgs: TagArgs
  ): () => null;
export declare function createGlobalStyles(styles: StylesArg): () => null;
