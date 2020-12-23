class Registry {
  constructor() {
    this.btnGroup = new Set();
    this.dataObj = {};
    this.triggers = {};
  }

  getStorRef(storeID = "unrecognized", isCheck = false) {
    const $ = this.dataObj;

    if (isCheck && !$[storeID]) {
      $[storeID] = {};
    }

    return $[storeID];
  }

  /**
   * Add cell to dataObj
   * Add groupName to btnGroup
   *
   * This function will be called when cells mount
   * after componentDidMount, the data in dataObj will be moved to state
   * dataObj is a temp object holds value to avoid update state while rendering
   * in this case will init all cells in dataObj until rendering happens
   * then update the state so all the values update happen in state
   *
   * @param {object} cell - new cell that should be register
   * @param {string} cell.nameRef   key for value
   * @param {string||boolean} cell.initValue value
   * @param {string} cell.groupName group name in case the cell is group-toggle
   */
  subscribe({ nameRef, initValue, groupName, storeID }, updater) {
    const storeRef = this.getStorRef(storeID, true);

    storeRef[nameRef] = initValue;

    // if it has group, handle it
    if (groupName) {
      this.triggers[nameRef] = updater;

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

      if (!this.btnGroup[groupName].has(nameRef)) {
        // then add the cell name to where its belong
        // to its group
        this.btnGroup[groupName].add(nameRef);
      }
    }
  }

  updater({ nameRef, newValue, groupName, storeID }) {
    const storeRef = this.getStorRef(storeID);

    storeRef[nameRef] = newValue;

    if (groupName) {
      if (newValue !== false) {
        // update group of values

        // toggle group values
        this.btnGroup[groupName].forEach((FieldNameRef) => {
          // toggle all except the targeted key name which called nameRef
          // since we already changed its value above
          if (FieldNameRef !== nameRef) {
            storeRef[FieldNameRef] = !newValue;
            this.triggers[FieldNameRef](!newValue);
          }
        });
      }
    }
  }

  getAll(storeID) {
    const storeRef = this.getStorRef(storeID);

    return storeRef;
  }

  clear(storeID) {
    if (!storeID) {
      this.dataObj.unrecognized = {};
    } else {
      this.dataObj[storeID] = {};
    }
  }
}

export default Registry;
