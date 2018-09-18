import React, { createContext } from "react";

const ValuesContext = createContext({
  values: {}
  // updateCellValue() {},
  // registerCellInfo() {},
  // getContextValues() {}
});

export const { Consumer: ValuesConsumer } = ValuesContext;

export class ValuesProvider extends React.Component {
  constructor(props) {
    super(props);

    this.btnGroup = new Set();

    this.datatObj = {};

    this.isAllCellsRegistered = false;
    this.state = {
      values: {},
      isGroupValuesUpdate: false
    };
  }

  componentDidMount() {
    this.isAllCellsRegistered = true;

    /*
    * This wont update the component
    * just set collected data obj as state
    * */
    this.setState({ values: { ...this.datatObj } });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { isGroupValuesUpdate } = this.state;

    return isGroupValuesUpdate !== nextState.isGroupValuesUpdate;
  }

  /**
   *
   * This function will be called when trigger submit
   * which returns state.values
   *
   * @return {{value :string||boolean}}
   */
  getContextValues = () => {
    const { values } = this.state;
    return values;
  };

  /**
   * Add cell to datatObj
   * Add groupName to btnGroup
   *
   * This function will be called when cells mount
   * after componentDidMount, the data in datatObj will be moved to state
   * datatObj is a temp object holds value to avoid update state while rendeing
   * in this case will init all cells in datatObj until rendering happens
   * then update the state so all the values update happen in state
   *
   * @param {object} cell - new cell that should be register
   * @param {string} cell.nameRef   key for value
   * @param {string||boolean} cell.initValue value
   * @param {string} cell.groupName group name in case the cell is group-toggle
   */
  registerCellInfo = ({ nameRef, initValue, groupName }) => {
    // push cell name ref to data holder
    this.datatObj[nameRef] = initValue;

    // if it has group, handle it
    if (groupName) {
      /*
      * check if group name not exist then add it and create its own set
      * then add the cell to its group
      */
      if (!this.btnGroup.has(groupName)) {
        // add it because it is new group
        this.btnGroup.add(groupName);

        // create new set for the group
        this.btnGroup[groupName] = new Set();
      }
      // then add the cell name to where its belong
      // to its group
      this.btnGroup[groupName].add(nameRef);
    }
  };

  /**
   * update cell value in the state
   *
   * @param {object} cell - new cell that should be register
   * @param {string} cell.nameRef   key for value
   * @param {string||boolean} cell.initValue value
   * @param {string} cell.groupName group name in case the cell is group-toggle
   */
  updateCellValue = ({ nameRef, newValue, groupName }) => {
    const {
      values: { [nameRef]: oldValue }
    } = this.state;

    // dont update if it is the same value
    if (oldValue === newValue) {
      return;
    }

    this.setState(ps => {
      const newValuesHolder = {};
      newValuesHolder[nameRef] = newValue;
      let { isGroupValuesUpdate } = ps;

      if (groupName) {
        isGroupValuesUpdate = !isGroupValuesUpdate;

        if (newValue !== false) {
          // update group of values

          // toggle group values
          this.btnGroup[groupName].forEach(cellNameRef => {
            // toggle all except the targeted key name which called nameRef
            // since we already changed its value above
            if (cellNameRef !== nameRef) {
              newValuesHolder[cellNameRef] = !newValue;
            }
          });
        }
      }
      return {
        values: { ...ps.values, ...newValuesHolder },
        isGroupValuesUpdate
      };
    });
  };

  render() {
    // console.log("ValuesContext update");
    const { values } = this.state;
    // eslint-disable-next-line
    const { children } = this.props;

    const { registerCellInfo, updateCellValue, getContextValues } = this;

    return (
      <ValuesContext.Provider
        value={{
          updateCellValue,
          registerCellInfo,
          getContextValues,
          values
        }}
      >
        {children}
      </ValuesContext.Provider>
    );
  }
}
