import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";

import { ValuesProvider } from "../src/components/context";
import Cell from "../src/components/Cell";
import Form from "../src/components/Form";

const TEST_DEFAULT = "defalut";
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
  <ValuesProvider>
    <Form data-testid={TEST_FORM} onSubmit={onSubmitMock}>
      <Cell id={ID_2} data-testid={TEST_DEFAULT} />
      <Cell />
      <Cell
        type="checkbox"
        groupName={GROUP_NAME}
        id={ID_1}
        data-testid={TEST_BTN_1}
      />
      <Cell
        type="checkbox"
        checked
        groupName={GROUP_NAME}
        valueKey={VAL_KEY}
        data-testid={TEST_BTN_2}
      />
    </Form>
  </ValuesProvider>
);

const { baseElement, getByTestId } = render(<App />);

const txt = getByTestId(TEST_DEFAULT);

const btn1 = getByTestId(TEST_BTN_1);
const btn2 = getByTestId(TEST_BTN_2);

const form = getByTestId(TEST_FORM);

describe("Cell#CellEngine & Form", () => {
  it("returns expected values and name attr", () => {
    expect(baseElement).toMatchSnapshot();
  });

  it("sets one btn to false deesnt toggle the other one which is false", () => {
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
        myRefName: false
      })
    );

    cleanup();
  });
});
