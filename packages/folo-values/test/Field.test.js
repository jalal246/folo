import React from "react";
import { fireEvent, cleanup } from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import Field from "../src/components/Field";
import Form from "../src/components/Form";

const TEST_DEFAULT = "default";
const TEST_BTN_1 = "btn1";
const TEST_BTN_2 = "btn2";
const TEST_FORM = "form";

const ID_1 = "unique";
const ID_2 = "unique2";

const VAL_KEY = "myRefName";
const GROUP_NAME = "gr";

const NEW_VAL = "hello!";

const onSubmitMock = jest.fn((e, value) => value);

const App = () => (
  <Form data-testid={TEST_FORM} onSubmit={onSubmitMock}>
    <Field id={ID_2} data-testid={TEST_DEFAULT} />
    <Field />
    <Field
      type="checkbox"
      groupName={GROUP_NAME}
      id={ID_1}
      data-testid={TEST_BTN_1}
    />
    <Field
      type="checkbox"
      checked
      groupName={GROUP_NAME}
      valueKey={VAL_KEY}
      data-testid={TEST_BTN_2}
    />
  </Form>
);

let txt;
let btn1;
let btn2;
let form;

describe("Field#CellEngine & Form", () => {
  beforeAll(() => {
    render(<App />);

    txt = screen.getByTestId(TEST_DEFAULT);

    btn1 = screen.getByTestId(TEST_BTN_1);
    btn2 = screen.getByTestId(TEST_BTN_2);

    form = screen.getByTestId(TEST_FORM);
  });

  it("sets one btn to false doesn't toggle the other one which is false", () => {
    // from
    expect(btn1.checked).toBe(false);
    expect(btn2.checked).toBe(true);

    fireEvent.blur(btn2, { target: { checked: false } });

    // to
    expect(btn1.checked).toBe(false);
    expect(btn2.checked).toBe(false);
  });

  it("sets one btn to true deesnt toggle the other one which is false", () => {
    // from
    expect(btn1.checked).toBe(false);
    expect(btn2.checked).toBe(false);

    fireEvent.blur(btn2, { target: { checked: true } });

    // to
    expect(btn1.checked).toBe(false);
    expect(btn2.checked).toBe(true);
  });

  it("sets one btn to true, toggles the other to false", () => {
    // from
    expect(btn1.checked).toBe(false);
    expect(btn2.checked).toBe(true);

    fireEvent.blur(btn1, { target: { checked: true } });

    // to
    expect(btn1.checked).toBe(true);
    expect(btn2.checked).toBe(false);
  });

  it("sets same value to btn", () => {
    // from
    expect(btn1.checked).toBe(true);
    expect(btn2.checked).toBe(false);

    fireEvent.blur(btn1, { target: { checked: true } });

    // to
    expect(btn1.checked).toBe(true);
    expect(btn2.checked).toBe(false);
  });

  it("sets new value to text input", () => {
    // from
    expect(txt.value).toBe("");

    fireEvent.change(txt, { target: { value: NEW_VAL } });

    // to
    expect(txt.value).toBe(NEW_VAL);
  });

  it("sets same value to text input", () => {
    // from
    expect(txt.value).toBe(NEW_VAL);

    fireEvent.change(txt, { target: { value: NEW_VAL } });

    // to
    expect(txt.value).toBe(NEW_VAL);
  });

  it("return context value when sbmit", () => {
    fireEvent.submit(form, {});

    // to
    expect(onSubmitMock).toHaveReturnedWith(
      expect.objectContaining({
        text_unique2: "",
        // unknown_valueKey_created_at_1547750212936: "",
        checkbox_unique_gr: true,
        myRefName: false,
      })
    );

    cleanup();
  });
});
