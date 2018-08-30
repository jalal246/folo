import React, { createContext } from "react";

import { INPUT } from "../constants";

const ValuesHolder = createContext({
  values: {},
  updateCellValue() {},
  registerCellInfo() {},
  getContextValues() {}
});

export const { Consumer: ValuesConsumer } = ValuesHolder;

export class ValuesProvider extends React.Component {
  constructor(props) {
    super(props);

    this.btnGroup = new Set();

    this.datatObj = {};

    this.didMount = false;

    this.state = {
      values: {},
      isGroupValuesUpdate: false
    };
  }

  componentDidMount() {
    this.didMount = true;

    /*
    * This wont update the component
    * just set collected data obj as state
    * */

    // eslint-disable-next-line
    this.setState({ values: { ...this.datatObj } });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { isGroupValuesUpdate } = this.state;
    return isGroupValuesUpdate !== nextState.isGroupValuesUpdate;
  }

  getContextValues = name => {
    const { values } = this.state;
    return name ? values[name] : values;
  };

  registerCellInfo = ({ nameRef, iniValue, groupName }) => {
    if (this.didMount) return;

    // push cell name ref to data holder
    this.datatObj[nameRef] = iniValue;

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

  updateCellValue = ({ nameRef, newValue, cellType, groupName }) => {
    const {
      values: { [nameRef]: oldValue }
    } = this.state;
    // dont update if it is the same value
    if (cellType === INPUT && oldValue === newValue) {
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
    // console.log("ValuesHolder update");
    const { values } = this.state;
    // eslint-disable-next-line
    const { children } = this.props;

    const { registerCellInfo, updateCellValue, getContextValues } = this;

    return (
      <ValuesHolder.Provider
        value={{
          updateCellValue,
          registerCellInfo,
          getContextValues,
          values
        }}
      >
        {children}
      </ValuesHolder.Provider>
    );
  }
}
