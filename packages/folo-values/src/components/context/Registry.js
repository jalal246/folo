class Registry {
  constructor() {
    this.btnGroup = new Set();

    this.datatObj = {};

    this.registerCellInfo = this.registerCellInfo.bind(this);
    this.reset = this.reset.bind(this);
  }

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
  registerCellInfo({ nameRef, initValue, groupName }) {
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
  }

  reset(/* { isAll = false } = {} */) {
    this.datatObj = null;
    // TODO: Do i need to clear btnGroup? When?
    // if (isAll) {
    //   this.btnGroup = null;
    // }
  }
}

export default Registry;
