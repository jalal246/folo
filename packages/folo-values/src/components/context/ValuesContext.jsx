import React, { createContext } from "react";
import Registry from "./Registry";

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

    this.getContextValues = this.getContextValues.bind(this);
    this.updateCellValue = this.updateCellValue.bind(this);
  }

  componentDidMount() {
    /*
     * This wont update the component
     * just set collected data obj as state
     * */
    const { datatObj, reset } = this.Registry;
    this.setState({ values: datatObj });
    // clear it
    reset();
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
  getContextValues() {
    const { values } = this.state;
    return values;
  }

  /**
   * update cell value in the state
   *
   * @param {object} cell - new cell that should be register
   * @param {string} cell.nameRef   key for value
   * @param {string||boolean} cell.initValue value
   * @param {string} cell.groupName group name in case the cell is group-toggle
   */
  updateCellValue({ nameRef, newValue, groupName }) {
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
          const { btnGroup } = this.Registry;

          btnGroup[groupName].forEach(cellNameRef => {
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
  }

  render() {
    // console.log("ValuesContext update");
    const { values } = this.state;

    const { children } = this.props;

    const {
      getContextValues,
      updateCellValue,
      Registry: { registerCellInfo }
    } = this;

    return (
      <Provider
        value={{
          updateCellValue,
          registerCellInfo,
          getContextValues,
          values
        }}
      >
        {children}
      </Provider>
    );
  }
}

export { ValuesProvider, ValuesConsumer };
