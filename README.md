# Solid Styled Components

[![NPM Version](https://img.shields.io/npm/v/solid-styled-components.svg?style=flat)](https://www.npmjs.com/package/solid-styled-components)
![](https://img.shields.io/librariesio/release/npm/solid-styled-components)
![](https://img.shields.io/npm/dm/solid-styled-components.svg?style=flat)

This library provides Styled Components and css helper found in popular JS in CSS libraries. This library uses [goober](https://github.com/cristianbote/goober) a 1kb style library with a wrapper to work with Solid's API. The wrapper also adds a Theming solution.

## Features

### `styled(tagName)`

- `@param {String} tagName` The name of the dom element you'd like the styled to be applied to
- `@returns {Function}` Returns the tag template function.

```js
import { styled } from "solid-styled-components";

const Btn = styled("button")`
  border-radius: 4px;
`;
```

#### Tagged Templates

```jsx
import { styled } from "solid-styled-components";

const Btn = styled("button")`
  border-radius: ${props => props.size}px;
`;

<Btn size={20} />;
```

#### Function returns a string

```jsx
import { styled } from "solid-styled-components";

const Btn = styled("button")(
  props => `
  border-radius: ${props.size}px;
`
);

<Btn size={20} />;
```

#### Nesting styled components

```jsx
import { styled } from "solid-styled-components";

const Icon = styled("span")`
  display: flex;
  flex: 1;
  color: red;
`;

const Button = styled("button")`
  background: dodgerblue;
  color: white;
  border: ${Math.random()}px solid white;

  &:focus,
  &:hover {
    padding: 1em;
  }

  .otherClass {
    margin: 0;
  }

  ${Icon.class} {
    color: black;
  }
`;
```

#### Style Object

```jsx
import { styled } from "solid-styled-components";

const Btn = styled("button")(props => ({
  borderRadius: props.size + "px"
}));

<Btn size={20} />;
```

### `css`

- `@returns {String}` Returns the class.

To create a class, you need to call `css` with your style rules in a tagged template:

```jsx
import { css } from "solid-styled-components";

const BtnClass = css`
  border-radius: 4px;
`;

const App => <button class={BtnClass}>click</button>
```

Or an object:

```js
import { css } from "solid-styled-components";

const BtnClass = css({ borderRadius: "4px" })

const App => <button class={BtnClass}>click</button>
```

#### Passing props to `css` tagged templates

```js
import { css } from "solid-styled-components";

// JSX
const CustomButton = props => (
  <button
    class={css`
      border-radius: ${props.size}px;
    `}
  >
    click
  </button>
);
```

### `extractCss(target?)`

- `@returns {String}`

Returns the `<style>` tag that is rendered in a target and clears the style sheet. Defaults to `<head>`. Used to grab the styles for SSR.

```js
const { extractCss } = require("goober");

// After your app has rendered, just call it:
const styleTag = `<style id="_goober">${extractCss()}</style>`;

// Note: To be able to `hydrate` the styles you should use the proper `id` so `goober` can pick it up and use it as the target from now on
```

### `keyframes`

- `@returns {String}`

Add keyframe animations to a style component.

```js
const rotate = keyframes`
  100% { 
    transform:rotate(360deg); 
  }
`;

const LoadingIcon = styled.img`
  animation: ${rotate} 1s linear infinite;
`;
```

### `createGlobalStyles`

For a global style component, you call `createGlobalStyles` with your global tagged template.

```js
import { createGlobalStyles } from "solid-styled-components";

const GlobalStyles = () => {
  const Styles = createGlobalStyles`
    html,
    body {
      background: light;
    }

    * {
      box-sizing: border-box;
    }
  `;
  return <Styles />;
};
```

### `Theme`

You can set a Theme Provider (remember to use state or signals if you want it to be reactive).

```jsx
import { styled, ThemeProvider } from "solid-styled-components";

const theme = {
  colors: {
    primary: "hotpink"
  }
};

const SomeText = styled("div")`
  color: ${props => props.theme.colors.primary};
`;

render(
  () => (
    <ThemeProvider theme={theme}>
      <SomeText>some text</SomeText>
    </ThemeProvider>
  ),
  document.getElementById("app")
);
```

The library provides a `useTheme` hook if you wish to use it elsewhere like in you `css` functions.

### Custom prefixer

Use `setup` to set up a custom prefixer.

```ts
setup(
  prefixer: null | ((key: string, value: any) => string)
  shouldForwardProp?: null | ((props: string[]) => string[])
)
```

### `shouldForwardProp`

To prevent unwanted props attaching to the generated HTML, you can use the `shouldForwardProp` helper:

```ts
import { shouldForwardProp } from "solid-styled-components";

setup(
  null,
  shouldForwardProp(prop => {
    return prop !== "foo";
  })
);
```

This will prevent the `foo` prop from appearing as an HTML attribute.

Note: Be careful not to filter out props such as `children` or `onClick` this way; these are already handled internally.

## Using ThemeProvider in TypeScript

Before you can effectively start to use the ThemeProvider in TypeScript you will have to do a little bit of configuration.

### Create a declarations file

TypeScript definitions for solid-styled-components can be extended by using [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html).

The first step is to create a declarations file. For example, let's name it `styled.d.ts`:

```typescript
// import original module declarations
import "solid-styled-components";

// and extend them!
declare module "solid-styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
    };
  }
}
```

`DefaultTheme` is being used as an interface of `props.theme` out of the box. By default the interface `DefaultTheme` is empty so that's why we need to extend it.

Now we can create a theme just by using the DefaultTheme declared at the step above.

```tsx
import { styled, ThemeProvider, DefaultTheme } from "solid-styled-components";

const theme: DefaultTheme = {
  colors: {
    primary: "hotpink"
  }
};

const SomeText = styled("div")`
  color: ${props => props.theme.colors.primary};
`;

render(
  () => (
    <ThemeProvider theme={theme}>
      <SomeText>some text</SomeText>
    </ThemeProvider>
  ),
  document.getElementById("app")
);
```
