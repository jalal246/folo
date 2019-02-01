import React, { createContext } from "react";
import Registry from "./Registry";
import updateValue from "./updateCellValue";

const ValuesContext = createContext({
  values: {},
  /* istanbul ignore next */
  updateCellValue() {}
  // registerCellInfo() {},
  // getContextValues() {}
});

const { Provider, Consumer: ValuesConsumer } = ValuesContext;

class ValuesProvider extends React.Component {
  constructor(props) {
    super(props);

    this.Registry = new Registry();

    this.state = {
      values: {},
      isGroupValuesUpdate: false
    };
  }

  componentDidMount() {
    /*
     * This wont update the component
     * just set collected data obj as state
     * */
    const { datatObj } = this.Registry;

    this.setState({ values: datatObj });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { isGroupValuesUpdate } = this.state;

    return isGroupValuesUpdate !== nextState.isGroupValuesUpdate;
  }

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

    const { btnGroup } = this.Registry;

    this.setState(({ values, isGroupValuesUpdate }) =>
      updateValue({
        values,
        isGroupValuesUpdate,
        btnGroup,
        nameRef,
        newValue,
        groupName
      })
    );
  };

  render() {
    // console.log("ValuesContext update");
    const { values } = this.state;

    const { children } = this.props;

    const {
      updateCellValue,
      Registry: { registerCellInfo }
    } = this;

    return (
      <Provider
        value={{
          registerCellInfo,

          updateCellValue,
          getContextValues: () => values,
          values
        }}
      >
        {children}
      </Provider>
    );
  }
}

export { ValuesProvider, ValuesConsumer };
