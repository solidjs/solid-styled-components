import { css, setup as gooberSetup } from "goober";
import {
  mergeProps,
  splitProps,
  createContext,
  useContext,
  createComponent,
  untrack
} from "solid-js";
import { spread, ssr, ssrSpread, isServer } from "solid-js/web";
export { css, glob, extractCss, keyframes } from "goober";

let getForwardProps;

export function shouldForwardProp(predicate) {
  return props => props.filter(predicate);
}

export function setup(prefixer, shouldForwardProp) {
  gooberSetup(null, prefixer);
  if (shouldForwardProp) {
    getForwardProps = shouldForwardProp;
  }
}
const ThemeContext = createContext();
export function ThemeProvider(props) {
  return createComponent(ThemeContext.Provider, {
    value: props.theme,
    get children() {
      return props.children;
    }
  });
}
export function useTheme() {
  return useContext(ThemeContext);
}

function makeStyled(tag) {
  const _ctx = this || {};
  return (...args) => {
    const Styled = props => {
      const theme = useTheme();
      const withTheme = mergeProps(props, { theme });
      const clone = mergeProps(withTheme, {
        get class() {
          const pClass = withTheme.class,
            append = "class" in withTheme && /^go[0-9]+/.test(pClass);
          // Call `css` with the append flag and pass the props
          const className = css.apply(
            { target: _ctx.target, o: append, p: withTheme, g: _ctx.g },
            args
          );
          return [pClass, className].filter(Boolean).join(" ");
        }
      });
      const [local, newProps] = splitProps(clone, ["as", "theme"]);
      const htmlProps = getForwardProps
        ? splitProps(newProps, getForwardProps(Object.keys(newProps)))[0]
        : newProps;
      const createTag = local.as || tag;
      if (typeof createTag === "function") {
        return createTag(htmlProps);
      }
      if (isServer) {
        const [local, others] = splitProps(htmlProps, ["children"]);
        return ssr(
          [`<${createTag} `, ">", `</${createTag}>`],
          ssrSpread(others),
          local.children || ""
        );
      }
      const el = document.createElement(createTag);
      spread(el, htmlProps);
      return el;
    };
    Styled.class = props => {
      return untrack(() => {
        return css.apply({ target: _ctx.target, p: props, g: _ctx.g }, args);
      });
    };
    return Styled;
  };
}

export const styled = new Proxy(makeStyled, {
  get(target, tag) {
    return target(tag);
  }
});

export function createGlobalStyles() {
  const fn = makeStyled.call({ g: 1 }, "div").apply(null, arguments);
  return function GlobalStyles(props) {
    fn(props);
    return null;
  };
}
