import "../src/index";

declare module "../src/index" {
  export interface DefaultTheme {
    colors: {
      primary: string;
    };
  }
}
