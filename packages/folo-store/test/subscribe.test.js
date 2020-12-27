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

const handler = jest.fn((newValue) => newValue);

describe("Testing subscribe effects on dataHolder/btnGroup", () => {
  beforeAll(() => {
    registry = new Registry();
  });

  describe("Initializes data Obj holder with first register", () => {
    beforeAll(() => {
      const obj1 = {
        nameRef: NAME_REF_1,
        initValue: INIT_VAL_1,
        groupName: MUTUAL_GROUP_MANE_1,
      };

      registry.subscribe(obj1, handler);
    });

    it("Checks dataHolder", () => {
      expect(registry.dataHolder).toMatchObject({
        [GENERAL_STORE_ID]: { [NAME_REF_1]: INIT_VAL_1 },
      });
    });

    it("Checks button group", () => {
      expect(registry.btnGroup).toMatchSnapshot();
    });

    it("Checks trigger handlers", () => {
      expect(registry.triggers[GENERAL_STORE_ID][NAME_REF_1]).toBeDefined();
    });
  });

  describe("Pushing a second obj with same group name", () => {
    beforeAll(() => {
      const obj2 = {
        nameRef: NAME_REF_2,
        initValue: INIT_VAL_2,
        groupName: MUTUAL_GROUP_MANE_1,
      };

      registry.subscribe(obj2, handler);
    });

    it("Checks dataHolder", () => {
      expect(registry.dataHolder).toMatchObject({
        [GENERAL_STORE_ID]: {
          [NAME_REF_1]: INIT_VAL_1,
          [NAME_REF_2]: INIT_VAL_2,
        },
      });
    });

    it("Checks button group", () => {
      expect(registry.btnGroup).toMatchSnapshot();
    });

    it("Checks trigger handlers", () => {
      expect(registry.triggers).toMatchSnapshot();
    });
  });

  describe("Testing 2 branches of button group", () => {
    beforeAll(() => {
      const obj3 = {
        nameRef: NAME_REF_3,
        initValue: INIT_VAL_3,
        groupName: MUTUAL_GROUP_MANE_2,
      };

      registry.subscribe(obj3, handler);
    });

    it("Checks dataHolder", () => {
      expect(registry.dataHolder).toMatchObject({
        [GENERAL_STORE_ID]: {
          [NAME_REF_1]: INIT_VAL_1,
          [NAME_REF_2]: INIT_VAL_2,
          [NAME_REF_3]: INIT_VAL_3,
        },
      });
    });

    it("Checks button group", () => {
      expect(registry.btnGroup).toMatchSnapshot();
    });

    it("Checks trigger handlers", () => {
      expect(registry.triggers).toMatchSnapshot();
    });
  });

  describe("Testing registry.subscribe with non-grouped obj", () => {
    beforeAll(() => {
      const obj4 = {
        nameRef: NAME_REF_4,
        initValue: INIT_VAL_4,
        groupName: null,
      };

      registry.subscribe(obj4);
    });

    it("Checks dataHolder", () => {
      expect(registry.dataHolder).toMatchObject({
        [GENERAL_STORE_ID]: {
          [NAME_REF_1]: INIT_VAL_1,
          [NAME_REF_2]: INIT_VAL_2,
          [NAME_REF_3]: INIT_VAL_3,
          [NAME_REF_4]: INIT_VAL_4,
        },
      });
    });

    it("Checks button group", () => {
      expect(registry.btnGroup).toMatchSnapshot();
    });

    it("Checks trigger handlers", () => {
      expect(registry.triggers).toMatchSnapshot();
    });
  });

  describe("Testing registry.subscribe with non-grouped obj", () => {
    beforeAll(() => {
      const obj4 = {
        nameRef: NAME_REF_4,
        initValue: INIT_VAL_4,
        groupName: null,
      };

      registry.subscribe(obj4, handler);
    });

    it("Checks dataHolder", () => {
      expect(registry.dataHolder).toMatchObject({
        [GENERAL_STORE_ID]: {
          [NAME_REF_1]: INIT_VAL_1,
          [NAME_REF_2]: INIT_VAL_2,
          [NAME_REF_3]: INIT_VAL_3,
          [NAME_REF_4]: INIT_VAL_4,
        },
      });
    });

    it("Checks button group", () => {
      expect(registry.btnGroup).toMatchSnapshot();
    });

    it("Checks trigger handlers", () => {
      expect(registry.triggers).toMatchSnapshot();
    });
  });

  describe("Testing registry.subscribe with same ref and group name obj and new value", () => {
    beforeAll(() => {
      const obj5 = {
        nameRef: NAME_REF_3,
        initValue: INIT_VAL_5,
        groupName: MUTUAL_GROUP_MANE_2,
      };

      registry.subscribe(obj5, handler);
    });

    it("Checks dataHolder", () => {
      expect(registry.dataHolder).toMatchObject({
        [GENERAL_STORE_ID]: {
          [NAME_REF_1]: INIT_VAL_1,
          [NAME_REF_2]: INIT_VAL_2,
          [NAME_REF_3]: INIT_VAL_5,
          [NAME_REF_4]: INIT_VAL_4,
        },
      });
    });

    it("Checks button group", () => {
      expect(registry.btnGroup).toMatchSnapshot();
    });

    it("Checks trigger handlers", () => {
      expect(registry.triggers).toMatchSnapshot();
    });
  });
});
