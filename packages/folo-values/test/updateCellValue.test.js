import updateCellValue from "../src/components/context/updateCellValue";

const NAME_REF_1 = "input1";
const NAME_REF_2 = "input2";
const NAME_REF_3 = "input3";

const btnGroup = new Set();
btnGroup.add("group1");
btnGroup.add("group2");
btnGroup["group1"] = new Set();
btnGroup["group1"].add(NAME_REF_2);
btnGroup["group1"].add(NAME_REF_3);

describe("updateCellValue", () => {
  it("updates string value", () => {
    expect(
      updateCellValue({
        values: {
          [NAME_REF_1]: "some value",
          [NAME_REF_2]: true,
          [NAME_REF_3]: false
        },
        isGroupValuesUpdate: false,
        btnGroup,
        nameRef: NAME_REF_1,
        newValue: "hi",
        groupName: null
      })
    ).toMatchObject({
      values: {
        [NAME_REF_1]: "hi",
        [NAME_REF_2]: true,
        [NAME_REF_3]: false
      },
      isGroupValuesUpdate: false
    });
  });
  it("updates boolean value with flase and toggle isGroupValuesUpdate", () => {
    expect(
      updateCellValue({
        values: {
          [NAME_REF_1]: "some value",
          [NAME_REF_2]: true,
          [NAME_REF_3]: false
        },
        isGroupValuesUpdate: false,
        btnGroup,
        nameRef: NAME_REF_2,
        newValue: false,
        groupName: "group1"
      })
    ).toMatchObject({
      values: {
        [NAME_REF_1]: "some value",
        [NAME_REF_2]: false,
        [NAME_REF_3]: false
      },
      isGroupValuesUpdate: true
    });
  });
  it("updates boolean value with true and toggle isGroupValuesUpdate", () => {
    expect(
      updateCellValue({
        values: {
          [NAME_REF_1]: "some value",
          [NAME_REF_2]: true,
          [NAME_REF_3]: false
        },
        isGroupValuesUpdate: false,
        btnGroup,
        nameRef: NAME_REF_3,
        newValue: true,
        groupName: "group1"
      })
    ).toMatchObject({
      values: {
        [NAME_REF_1]: "some value",
        [NAME_REF_2]: false,
        [NAME_REF_3]: true
      },
      isGroupValuesUpdate: true
    });
  });
});
