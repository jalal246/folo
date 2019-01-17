import React, { createContext } from "react";
import { render, cleanup } from "react-testing-library";

import withcontext from "../src/withcontext";

const orginalProps = {
  type: "text"
};

const MyComponent = ({
  type = orginalProps.type,
  /* form context? */ disabled,
  /* form context? */ id,
  /* form context */ value,
  /* form context */ placeholder
}) => (
  <input
    data-testid="withcontextTest"
    type={type}
    onChange={() => {}}
    value={value}
    placeholder={placeholder}
    disabled={disabled}
    id={id}
  />
);

const contextProps = {
  value: "test",
  placeholder: "Username",
  id: "unique",
  disabled: true
};

const { Consumer, Provider } = createContext({});

const CNProvider = ({ children }) => (
  <Provider value={contextProps}>{children}</Provider>
);

let MyComponentWIithContextConsumer;

const App = () => (
  <CNProvider>
    <MyComponentWIithContextConsumer />
  </CNProvider>
);

afterEach(cleanup);

describe("withcontext", () => {
  describe("custom context props", () => {
    MyComponentWIithContextConsumer = withcontext({
      Component: MyComponent,
      Consumer,
      contextProps: ["value", "placeholder"]
    });

    const { getByTestId } = render(<App />);

    const { value, placeholder, type, disabled } = getByTestId(
      "withcontextTest"
    );

    it("returns component props bind with context values", () => {
      expect(value).toBe(contextProps.value);

      expect(placeholder).toBe(contextProps.placeholder);
    });

    it("retruns all context props when contextProps is not defined", () => {
      expect(disabled).toBe(false);
    });

    it("orginal component props still exist", () => {
      expect(type).toBe(orginalProps.type);
    });
  });

  describe("all context props", () => {
    it("does not have all context props, just the required", () => {
      MyComponentWIithContextConsumer = withcontext({
        Component: MyComponent,
        Consumer
      });

      const { getByTestId } = render(<App />);

      const { disabled, id } = getByTestId("withcontextTest");

      expect(disabled).toBe(true);

      expect(id).toBe(contextProps.id);
    });
  });
});
