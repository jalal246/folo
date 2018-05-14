import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { INPUT } from '../constants';

const ValuesHolder = createContext({
  values: {},
  errors: {},
  updateCellValue: () => {},
  updateErrors: () => {}
});

export const { Consumer: ValuesConsumer } = ValuesHolder;

const propTypes = {};

const defaultProps = {};

export class ValuesProvider extends React.Component {
  constructor(props) {
    super(props);

    this.btnGroup = new Set();
    this.datatObj = {};

    this.init = true;
    this.state = {
      values: {}
      // errors: {}
    };
  }

  componentDidMount() {
    this.setState({ values: { ...this.datatObj } });
    this.init = false;
  }

  onFormBtnClick = () => {
    this.props.onSubmit(this.state.values);
  };

  registerCell = (nameRef, cellInitValue, groupName) => {
    if (!this.init) return;

    // push cell name ref to data holder
    this.datatObj[nameRef] = cellInitValue;

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
    // console.log('regester');
  };

  updateCellValue = (nameRef, newValue, cellType, groupName) => {
    // console.log(nameRef, newValue, cellType, groupName);
    const { values: { [nameRef]: oldValue } } = this.state;

    // dont update if it is the same value
    if (cellType === INPUT && oldValue === newValue) {
      return;
    }

    this.setState(ps => {
      const newValuesHolder = {};
      newValuesHolder[nameRef] = newValue;

      if (groupName && newValue !== false) {
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

      return {
        values: { ...ps.values, ...newValuesHolder }
      };
    });
  };

  updateErrors = () => {};

  render() {
    console.log('ValuesHolder update');

    const { values, errors } = this.state;

    const {
      registerCell,
      updateCellValue,
      onFormBtnClick,
      updateErrors
    } = this;

    return (
      <ValuesHolder.Provider
        value={{
          values,
          errors,
          updateCellValue,
          updateErrors,
          registerCell,
          onClick: onFormBtnClick
        }}
      >
        {this.props.children}
      </ValuesHolder.Provider>
    );
  }
}

ValuesProvider.propTypes = propTypes;
ValuesProvider.defaultProps = defaultProps;
