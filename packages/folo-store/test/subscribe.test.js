import Registry from "../src";

let registry;

const MUTUAL_GROUP_MANE_1 = "gr1";

const NAME_REF_1 = "nameTest1";
const INIT_VAL_1 = false;

const NAME_REF_2 = "nameTest2";
const INIT_VAL_2 = true;

const MUTUAL_GROUP_MANE_2 = "gr2";

const NAME_REF_3 = "nameTest3";
const INIT_VAL_3 = true;

const NAME_REF_4 = "nameTest4";
const INIT_VAL_4 = "test";

const INIT_VAL_5 = "new test value";

const GENERAL_STORE_ID = "unrecognized";

describe("Testing subscribe effects on dataObj/btnGroup", () => {
  beforeAll(() => {
    registry = new Registry();
  });

  it("Initializes data Obj holder with first register", () => {
    const obj1 = {
      nameRef: NAME_REF_1,
      initValue: INIT_VAL_1,
      groupName: MUTUAL_GROUP_MANE_1,
    };

    registry.subscribe(obj1);

    expect(registry.dataObj).toMatchObject({
      [GENERAL_STORE_ID]: { [NAME_REF_1]: INIT_VAL_1 },
    });

    expect(registry.btnGroup[MUTUAL_GROUP_MANE_1].has(NAME_REF_1)).toBe(true);
  });

  it("Pushes second obj with same group name", () => {
    const obj2 = {
      nameRef: NAME_REF_2,
      initValue: INIT_VAL_2,
      groupName: MUTUAL_GROUP_MANE_1,
    };

    registry.subscribe(obj2);

    expect(registry.dataObj).toMatchObject({
      [GENERAL_STORE_ID]: {
        [NAME_REF_1]: INIT_VAL_1,
        [NAME_REF_2]: INIT_VAL_2,
      },
    });

    expect(registry.btnGroup[MUTUAL_GROUP_MANE_1].has(NAME_REF_1)).toBe(true);
    expect(registry.btnGroup[MUTUAL_GROUP_MANE_1].has(NAME_REF_2)).toBe(true);
  });

  it("Tests registry.btnGroup with 2 branches of group name", () => {
    const obj3 = {
      nameRef: NAME_REF_3,
      initValue: INIT_VAL_3,
      groupName: MUTUAL_GROUP_MANE_2,
    };

    registry.subscribe(obj3);

    expect(registry.dataObj).toMatchObject({
      [GENERAL_STORE_ID]: {
        [NAME_REF_1]: INIT_VAL_1,
        [NAME_REF_2]: INIT_VAL_2,
        [NAME_REF_3]: INIT_VAL_3,
      },
    });

    expect(registry.btnGroup[MUTUAL_GROUP_MANE_1].has(NAME_REF_1)).toBe(true);
    expect(registry.btnGroup[MUTUAL_GROUP_MANE_1].has(NAME_REF_2)).toBe(true);
    expect(registry.btnGroup[MUTUAL_GROUP_MANE_2].has(NAME_REF_3)).toBe(true);
  });

  it("Tests registry.subscribe with non-grouped obj", () => {
    const obj4 = {
      nameRef: NAME_REF_4,
      initValue: INIT_VAL_4,
      groupName: null,
    };

    registry.subscribe(obj4);

    expect(registry.dataObj).toMatchObject({
      [GENERAL_STORE_ID]: {
        [NAME_REF_1]: INIT_VAL_1,
        [NAME_REF_2]: INIT_VAL_2,
        [NAME_REF_3]: INIT_VAL_3,
        [NAME_REF_4]: INIT_VAL_4,
      },
    });

    expect(registry.btnGroup[MUTUAL_GROUP_MANE_1].has(NAME_REF_1)).toBe(true);
    expect(registry.btnGroup[MUTUAL_GROUP_MANE_1].has(NAME_REF_2)).toBe(true);
    expect(registry.btnGroup[MUTUAL_GROUP_MANE_2].has(NAME_REF_3)).toBe(true);
  });

  it("Tests registry.subscribe with non-grouped obj", () => {
    const obj4 = {
      nameRef: NAME_REF_4,
      initValue: INIT_VAL_4,
      groupName: null,
    };

    registry.subscribe(obj4);

    expect(registry.dataObj).toMatchObject({
      [GENERAL_STORE_ID]: {
        [NAME_REF_1]: INIT_VAL_1,
        [NAME_REF_2]: INIT_VAL_2,
        [NAME_REF_3]: INIT_VAL_3,
        [NAME_REF_4]: INIT_VAL_4,
      },
    });

    expect(registry.btnGroup[MUTUAL_GROUP_MANE_1].has(NAME_REF_1)).toBe(true);
    expect(registry.btnGroup[MUTUAL_GROUP_MANE_1].has(NAME_REF_2)).toBe(true);
    expect(registry.btnGroup[MUTUAL_GROUP_MANE_2].has(NAME_REF_3)).toBe(true);
  });

  it("Tests registry.subscribe with same ref and group name obj and new value", () => {
    const obj5 = {
      nameRef: NAME_REF_3,
      initValue: INIT_VAL_5,
      groupName: MUTUAL_GROUP_MANE_2,
    };

    registry.subscribe(obj5);

    expect(registry.dataObj).toMatchObject({
      [GENERAL_STORE_ID]: {
        [NAME_REF_1]: INIT_VAL_1,
        [NAME_REF_2]: INIT_VAL_2,
        [NAME_REF_3]: INIT_VAL_5,
        [NAME_REF_4]: INIT_VAL_4,
      },
    });

    expect(registry.btnGroup[MUTUAL_GROUP_MANE_1].has(NAME_REF_1)).toBe(true);
    expect(registry.btnGroup[MUTUAL_GROUP_MANE_1].has(NAME_REF_2)).toBe(true);
    expect(registry.btnGroup[MUTUAL_GROUP_MANE_2].has(NAME_REF_3)).toBe(true);
  });
});
