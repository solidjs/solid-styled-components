/* @jsxImportSource solid-js */
import { createRoot, Component } from "solid-js";
import { styled, ThemeProvider, setup } from "../src/index";

declare module "../src/index" {
  interface DefaultTheme {
    colors: {
      primary?: string;
      secondary?: string;
    };
  }
}

describe("Simple Styled", () => {
  test("Creates component properly", () => {
    const Div = styled("div")<{ bold: boolean; border: number; color: string }>`
      color: steelblue;
      font-size: 32px;
      padding: 5px;
      border: ${({ border = 1, color = "gainsboro" }): string => `${border}px solid ${color}`};
      background-color: linen;
      font-weight: ${({ bold = false }): string | number => (bold ? "bold" : 100)};
    `;

    createRoot(() => {
      const v = (
        <Div
          aria-label="button"
          onClick={() => {}}
          class="test"
          bold={true}
          border={1}
          color="whitesmoke"
        >
          Testera
        </Div>
      );
    });
  });

  test("Creates component properly with styles function", () => {
    const Div = styled("div")<{ bold: boolean; border: number; color: string }>(({ bold, border, color }) => ({
      color: "steelblue",
      fontSize: "32px",
      padding: "5px",
      border: `${border}px solid ${color}`,
      backgroundColor: "linen",
      fontWeight: (bold ? "bold" : 100),
    }));

    createRoot(() => {
      const v = (
        <Div
          aria-label="button"
          onClick={() => {}}
          class="test"
          bold={true}
          border={1}
          color="whitesmoke"
        >
          Testera
        </Div>
      );
    });
  });

  test("Creates input properly", () => {
    const Input = styled("input")`
      width: 5em;
      text-align: right;
    `;

    let currentTarget: HTMLInputElement;
    createRoot(() => {
      const v = <Input type="number" onchange={evt => (currentTarget = evt.currentTarget)} />;
    });
  });

  test("Creates paragraph properly using dot notation", () => {
    const P = styled.p`
      padding: 10px;
      font-size: 40px;
      border: 2px dashed tomato;
    `;

    createRoot(() => {
      const v = <P>Content</P>;
    });
  });

  test("Creates component of styled component properly", () => {
    const SuperDiv = styled("div")`
      color: red;
    `;

    const UltraDiv = styled(SuperDiv)`
      background-color: yellow;
    `;

    createRoot(() => {
      const v = <UltraDiv />;
    });
  });

  test("Creates component of Component properly", () => {
    const BaseComponent: Component<{ foo: string }> = props => <div>{props.foo}</div>;

    const StyledComponent = styled(BaseComponent)`
      color: red;
    `;

    createRoot(() => {
      const v = <StyledComponent foo="bar" />;
    });
  });

  test("Test Theming", () => {
    const Div = styled("div")<{ bold: boolean; border: number; color: string }>`
      color: steelblue;
      font-size: 32px;
      padding: 5px;
      border: ${({ border = 1, theme }): string =>
        `${border}px solid ${theme?.colors.primary ?? "black"}`};
      background-color: linen;
      font-weight: ${({ bold = false }): string | number => (bold ? "bold" : 100)};
    `;

    createRoot(() => {
      const v = (
        <ThemeProvider
          theme={{
            colors: {
              primary: "hotpink"
            }
          }}
        >
          <Div class="test" bold={true} border={1} color="whitesmoke">
            Testera
          </Div>
        </ThemeProvider>
      );
    });
  });

  test("Test prefixer", () => {
    setup((k, v) => `solid-${k}: ${v}\n`);
    const Div = styled("div")<{ bold: boolean; border: number; color: string }>`
      color: steelblue;
      font-size: 32px;
      padding: 5px;
      border: ${({ border = 1, color = "gainsboro" }): string => `${border}px solid ${color}`};
      background-color: linen;
      font-weight: ${({ bold = false }): string | number => (bold ? "bold" : 100)};
    `;

    createRoot(() => {
      const v = (
        <Div
          aria-label="button"
          onClick={() => {}}
          class="test"
          bold={true}
          border={1}
          color="whitesmoke"
        >
          Testera
        </Div>
      );
    });
  });
});
