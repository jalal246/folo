import React from "react";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";

import Field from "../src/components/Field";
import Form from "../src/components/Form";

const TEST_TEXT_1 = "default";
const TEST_BTN_1 = "btn1";
const TEST_BTN_2 = "btn2";
const TEST_FORM = "form";

const GROUP_NAME = "group1";

const NEW_VAL = "hello!";

const onSubmitMock = jest.fn((e, value) => value);

const App = () => (
  <Form data-testid={TEST_FORM} onSubmit={onSubmitMock}>
    <Field id={TEST_TEXT_1} data-testid={TEST_TEXT_1} />
    <Field
      type="checkbox"
      groupName={GROUP_NAME}
      id={TEST_BTN_1}
      data-testid={TEST_BTN_1}
    />
    <Field
      type="checkbox"
      checked
      groupName={GROUP_NAME}
      valueKey={TEST_BTN_2}
      data-testid={TEST_BTN_2}
    />
  </Form>
);

let txt;
let btn1;
let btn2;
let form;

describe("Testing Fields & Form", () => {
  beforeEach(() => {
    render(<App />);

    txt = screen.getByTestId(TEST_TEXT_1);

    btn1 = screen.getByTestId(TEST_BTN_1);
    btn2 = screen.getByTestId(TEST_BTN_2);

    form = screen.getByTestId(TEST_FORM);
  });

  afterAll(() => {
    cleanup();
  });

  describe("Testing submit event on form for initial value", () => {
    it("returns context value when submit", () => {
      fireEvent.submit(form, {});

      // to
      expect(onSubmitMock).toHaveReturnedWith(
        expect.objectContaining({
          [TEST_TEXT_1]: "",
          [TEST_BTN_1]: false,
          [TEST_BTN_2]: true,
        })
      );
    });
  });

  describe("Testing toggle group in buttons", () => {
    it("Gets initial values", () => {
      expect(btn1.checked).toBe(false);
    });

    it("Sets one btn to false doesn't toggle the other one which is false", () => {
      fireEvent.blur(btn2, { target: { checked: false } });

      expect(btn1.checked).toBe(false);
      expect(btn2.checked).toBe(false);
    });

    it("Sets one btn to true doesn't toggle the other one which is false", () => {
      fireEvent.blur(btn2, { target: { checked: true } });

      expect(btn1.checked).toBe(false);
      expect(btn2.checked).toBe(true);
    });

    it("Sets one btn to true, toggles the other to false", () => {
      fireEvent.blur(btn1, { target: { checked: true } });
      expect(btn1.checked).toBe(true);
      expect(btn2.checked).toBe(false);
    });

    describe("Testing text input", () => {
      it("Gets initial values", () => {
        expect(txt.value).toBe("");
      });

      it("Sets new value to text input", () => {
        fireEvent.change(txt, { target: { value: NEW_VAL } });

        expect(txt.value).toBe(NEW_VAL);
      });

      it("sets the same value to text input", () => {
        fireEvent.change(txt, { target: { value: NEW_VAL } });

        expect(txt.value).toBe(NEW_VAL);
      });
    });
  });
});
