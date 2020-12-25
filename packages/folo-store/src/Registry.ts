type StoreValue = string | Boolean;

interface SubscribeInfo {
  nameRef: string;
  initValue: StoreValue;
  groupName?: string;
  storeID?: string;
}

interface Updater {
  nameRef: string;
  newValue: StoreValue;
  groupName?: string;
  storeID?: string;
}

interface DataHolder {
  [key: string]: { [key: string]: Object };
}

interface Triggers {
  [key: string]: { [key: string]: Function };
}

interface BtnGroup {
  [key: string]: { [key: string]: Set<string> };
}

const DEFAULT_STORE = "unrecognized";

class Registry {
  dataHolder: DataHolder;

  triggers: Triggers;

  activeStore: string;

  activeField: string;

  btnGroup: BtnGroup;

  constructor() {
    this.dataHolder = {};
    this.triggers = {};

    this.btnGroup = {};
    this.activeStore = "";
    this.activeField = "";
  }

  setActive(nameRef?: string, storeID?: string) {
    this.activeStore = storeID || DEFAULT_STORE;
    if (nameRef) this.activeField = nameRef;
  }

  assignValueToStore(storeValue: StoreValue) {
    if (!this.dataHolder[this.activeStore]) {
      this.dataHolder[this.activeStore] = {};
      this.btnGroup[this.activeStore] = {};
    }

    this.dataHolder[this.activeStore][this.activeField] = storeValue;
  }

  assignTrigger(triggerHandler: Function) {
    this.triggers[this.activeStore][this.activeField] = triggerHandler;
  }

  triggerHandler(withValue: StoreValue) {
    this.triggers[this.activeStore][this.activeField](withValue);
  }

  /**
   * Add field to dataBranches
   * Add groupName to btnGroup
   *
   * This function will be called when cells mount
   * after componentDidMount, the data in dataBranches will be moved to state
   * dataBranches is a temp object holds value to avoid update state while rendering
   * in this case will init all cells in dataBranches until rendering happens
   * then update the state so all the values update happen in state
   *
   * @param {object} field - new field that should be register
   * @param {string} field.nameRef   key for value
   * @param {string||boolean} field.initValue value
   * @param {string} field.groupName group name in case the field is group-toggle
   */
  subscribe(
    { nameRef, initValue, groupName, storeID }: SubscribeInfo,
    triggerHandler: Function
  ) {
    this.setActive(nameRef, storeID);

    this.assignValueToStore(initValue);

    // if it has group, handle it
    if (groupName) {
      this.assignTrigger(triggerHandler);

      if (!this.btnGroup[this.activeStore][groupName]) {
        /*
         * Check if group name not exist then add it and create its own set
         * then add the field to its group
         */

        // create new set for the group
        this.btnGroup[this.activeStore][groupName] = new Set();
      }

      if (!this.btnGroup[this.activeStore][groupName].has(nameRef)) {
        // then add the field name to where its belong
        // to its group
        this.btnGroup[this.activeStore][groupName].add(nameRef);
      }
    }
  }

  updater({ nameRef, newValue, groupName, storeID }: Updater) {
    this.setActive(nameRef, storeID);
    this.assignValueToStore(newValue);

    if (groupName) {
      if (newValue !== false) {
        // update group of values

        // toggle group values
        this.btnGroup[this.activeStore][groupName].forEach((FieldNameRef) => {
          // toggle all except the targeted key name which called nameRef
          // since we already changed its value above
          if (FieldNameRef !== nameRef) {
            this.setActive(FieldNameRef, storeID);
            this.assignValueToStore(!newValue);
            this.triggerHandler(!newValue);
          }
        });
      }
    }
  }

  getDataByStoreID(storeID?: string): Object {
    this.setActive(undefined, storeID);

    return this.dataHolder[this.activeStore];
  }

  clear(storeID?: string) {
    this.setActive(undefined, storeID);

    this.dataHolder[this.activeStore] = {};
    this.triggers[this.activeStore] = {};
    this.btnGroup[this.activeStore] = {};
  }

  destroy() {
    this.dataHolder = {};
    this.triggers = {};
    this.btnGroup = {};
  }
}

export default Registry;
