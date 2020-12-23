import Registry from "../src";

let registry;

const NAME_REF_1 = "input1";

const NAME_REF_2 = "input2";
const NAME_REF_3 = "input3";

const BTN_GROUP = "group1";

const btnGroup = new Set();
btnGroup.add(BTN_GROUP);
btnGroup.add(BTN_GROUP);
btnGroup.group1 = new Set();
btnGroup[BTN_GROUP].add(NAME_REF_2);
btnGroup[BTN_GROUP].add(NAME_REF_3);

const GENERAL_STORE_ID = "unrecognized";

const TEXT_NEW_VALUE = "some value";

const updater1 = jest.fn((newValue) => newValue);
const updater2 = jest.fn((newValue) => newValue);

describe("Registry updater", () => {
  beforeAll(() => {
    registry = new Registry();

    const input1 = {
      nameRef: NAME_REF_1,
      initValue: "",
      groupName: null,
    };
    registry.subscribe(input1);

    const input2 = {
      nameRef: NAME_REF_2,
      initValue: false,
      groupName: BTN_GROUP,
    };
    registry.subscribe(input2, updater1);

    const input3 = {
      nameRef: NAME_REF_3,
      initValue: false,
      groupName: BTN_GROUP,
    };
    registry.subscribe(input3, updater2);
  });

  it("Updates string value", () => {
    registry.updater({
      nameRef: NAME_REF_1,
      newValue: TEXT_NEW_VALUE,
    });

    expect(registry.dataObj).toStrictEqual({
      [GENERAL_STORE_ID]: {
        [NAME_REF_1]: TEXT_NEW_VALUE,
        [NAME_REF_2]: false,
        [NAME_REF_3]: false,
      },
    });

    expect(registry.dataObj).toMatchSnapshot();
  });

  it("Toggles boolean value in a group button", () => {
    registry.updater({
      nameRef: NAME_REF_2,
      newValue: true,
      groupName: BTN_GROUP,
    });

    expect(registry.dataObj).toStrictEqual({
      [GENERAL_STORE_ID]: {
        [NAME_REF_1]: TEXT_NEW_VALUE,
        [NAME_REF_2]: true,
        [NAME_REF_3]: false,
      },
    });

    expect(updater1).toHaveBeenCalledTimes(0);
    expect(updater2).toHaveBeenCalledWith(false);

    expect(registry.dataObj).toMatchSnapshot();
  });
});
