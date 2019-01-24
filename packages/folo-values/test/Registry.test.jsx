import Registry from "../src/components/context/Registry";

const Register = new Registry();

const { btnGroup, datatObj, registerCellInfo } = Register;

const MUTULAL_GROUP_MANE_1 = "gr1";

const NAME_REF_1 = "nameTest1";
const INIT_VAL_1 = false;

const NAME_REF_2 = "nameTest2";
const INIT_VAL_2 = true;

const MUTULAL_GROUP_MANE_2 = "gr2";

const NAME_REF_3 = "nameTest3";
const INIT_VAL_3 = true;

const NAME_REF_4 = "nameTest4";
const INIT_VAL_4 = "test";

const INIT_VAL_5 = "new test value";

describe("Registry", () => {
  it("initializes data Obj holder with first register", () => {
    const obj1 = {
      nameRef: NAME_REF_1,
      initValue: INIT_VAL_1,
      groupName: MUTULAL_GROUP_MANE_1
    };

    registerCellInfo(obj1);

    expect(datatObj).toMatchObject({ [NAME_REF_1]: INIT_VAL_1 });
    expect(btnGroup[MUTULAL_GROUP_MANE_1].has(NAME_REF_1)).toBe(true);
  });
  it("pushes second obj with same group name", () => {
    const obj2 = {
      nameRef: NAME_REF_2,
      initValue: INIT_VAL_2,
      groupName: MUTULAL_GROUP_MANE_1
    };

    registerCellInfo(obj2);

    expect(datatObj).toMatchObject({
      [NAME_REF_1]: INIT_VAL_1,
      [NAME_REF_2]: INIT_VAL_2
    });
    expect(btnGroup[MUTULAL_GROUP_MANE_1].has(NAME_REF_1)).toBe(true);
    expect(btnGroup[MUTULAL_GROUP_MANE_1].has(NAME_REF_2)).toBe(true);
  });
  it("tests btnGroup with 2 branches of group name", () => {
    const obj3 = {
      nameRef: NAME_REF_3,
      initValue: INIT_VAL_3,
      groupName: MUTULAL_GROUP_MANE_2
    };

    registerCellInfo(obj3);

    expect(datatObj).toMatchObject({
      [NAME_REF_1]: INIT_VAL_1,
      [NAME_REF_2]: INIT_VAL_2,
      [NAME_REF_3]: INIT_VAL_3
    });
    expect(btnGroup[MUTULAL_GROUP_MANE_1].has(NAME_REF_1)).toBe(true);
    expect(btnGroup[MUTULAL_GROUP_MANE_1].has(NAME_REF_2)).toBe(true);
    expect(btnGroup[MUTULAL_GROUP_MANE_2].has(NAME_REF_3)).toBe(true);
  });
  it("tests registerCellInfo with non-grouped obj", () => {
    const obj4 = {
      nameRef: NAME_REF_4,
      initValue: INIT_VAL_4,
      groupName: null
    };

    registerCellInfo(obj4);

    expect(datatObj).toMatchObject({
      [NAME_REF_1]: INIT_VAL_1,
      [NAME_REF_2]: INIT_VAL_2,
      [NAME_REF_3]: INIT_VAL_3,
      [NAME_REF_4]: INIT_VAL_4
    });
    expect(btnGroup[MUTULAL_GROUP_MANE_1].has(NAME_REF_1)).toBe(true);
    expect(btnGroup[MUTULAL_GROUP_MANE_1].has(NAME_REF_2)).toBe(true);
    expect(btnGroup[MUTULAL_GROUP_MANE_2].has(NAME_REF_3)).toBe(true);
  });
  it("tests registerCellInfo with non-grouped obj", () => {
    const obj4 = {
      nameRef: NAME_REF_4,
      initValue: INIT_VAL_4,
      groupName: null
    };

    registerCellInfo(obj4);

    expect(datatObj).toMatchObject({
      [NAME_REF_1]: INIT_VAL_1,
      [NAME_REF_2]: INIT_VAL_2,
      [NAME_REF_3]: INIT_VAL_3,
      [NAME_REF_4]: INIT_VAL_4
    });
    expect(btnGroup[MUTULAL_GROUP_MANE_1].has(NAME_REF_1)).toBe(true);
    expect(btnGroup[MUTULAL_GROUP_MANE_1].has(NAME_REF_2)).toBe(true);
    expect(btnGroup[MUTULAL_GROUP_MANE_2].has(NAME_REF_3)).toBe(true);
  });
  it("tests registerCellInfo with same ref and group name obj and new value", () => {
    const obj5 = {
      nameRef: NAME_REF_3,
      initValue: INIT_VAL_5,
      groupName: MUTULAL_GROUP_MANE_2
    };

    registerCellInfo(obj5);

    expect(datatObj).toMatchObject({
      [NAME_REF_1]: INIT_VAL_1,
      [NAME_REF_2]: INIT_VAL_2,
      [NAME_REF_3]: INIT_VAL_5,
      [NAME_REF_4]: INIT_VAL_4
    });
    expect(btnGroup[MUTULAL_GROUP_MANE_1].has(NAME_REF_1)).toBe(true);
    expect(btnGroup[MUTULAL_GROUP_MANE_1].has(NAME_REF_2)).toBe(true);
    expect(btnGroup[MUTULAL_GROUP_MANE_2].has(NAME_REF_3)).toBe(true);
  });
});
