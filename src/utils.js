/* eslint no-param-reassign: ["error", { "props": false }] */

import { CHECKBOX, RADIO, TEXT, SELECT, BTN, INPUT } from './constants';

const prefix = 'folio';
let lastId = 0;

/**
 * generate unique ID for key
 * @param {String} prefix the prefix for the id
 * @return {String} the unique ID
 */
export function keyGenerator() {
  lastId += 1;
  return prefix + lastId;
}

export function replaceSpace(str) {
  return str.replace(/\s/g, '_');
}

export function genKeyObj(i, j) {
  return `row${i}clm${j}`;
}

export function mergeClasses(...classes) {
  let finalClass = '';
  if (classes !== undefined) {
    for (let i = 0; i < classes.length; i += 1) {
      const className = classes[i];
      if (className && className.length > 0) {
        finalClass += ` ${className}`;
      }
    }
    return finalClass.length > 0 ? finalClass : null;
  }
  return null;
}

export function checkList(l) {
  return l.map((item, i) => {
    let itemNname;
    let itemValue;

    if (typeof item === 'object') {
      const { name, value } = item;

      if (name === undefined && value === undefined) {
        itemNname = i;
        itemValue = i;
      } else {
        itemNname = name || value;
        itemValue = value || replaceSpace(name);
      }
    } else {
      itemNname = item;
      itemValue = replaceSpace(item);
    }
    return {
      itemUUID: keyGenerator(),
      name: itemNname,
      value: itemValue
    };
  });
}

export function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

export function initShape(dt) {
  return dt === undefined ||
    !Array.isArray(dt) ||
    (Array.isArray(dt) && dt.length === 0)
    ? [[{}]]
    : dt;
}

export function isObjEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export function extractGlobalConfig(
  isGlobbalStyles,
  isGlobbalClassNames,
  isGlobbalComponents,
  syles,
  classNames,
  Components
) {
  let wrapperClasses = {};
  let wrapperStyles = {};
  let wrapperComponents = {};

  let globalClassNameCell;
  let globalStyleCell;

  if (isGlobbalStyles || isGlobbalClassNames || isGlobbalComponents) {
    if (isGlobbalClassNames) {
      const {
        // wrapper
        div: classNameDiv,
        label: classNameLabel,
        small: classNameSmall,

        cell
      } = syles;

      wrapperClasses = {
        classNameDiv,
        classNameLabel,
        classNameSmall
      };

      globalClassNameCell = cell;
    }

    if (isGlobbalStyles) {
      const {
        // wrapper
        div: styleDiv,
        label: styleLabel,
        small: styleSmall,

        cell
      } = classNames;

      globalStyleCell = cell;

      wrapperStyles = {
        styleDiv,
        styleLabel,
        styleSmall
      };
    }

    if (isGlobbalComponents) {
      const {
        // wrapper
        div: ComponentDiv,
        label: ComponentLabel,
        small: ComponentSmall
      } = Components;

      wrapperComponents = {
        ComponentDiv,
        ComponentLabel,
        ComponentSmall
      };
    }
  }

  return {
    globalClassNameCell,
    globalStyleCell,

    wrapperClasses,
    wrapperStyles,
    wrapperComponents
  };
}

export function functionName(
  attr,
  isSwitchPosition,
  type,
  uniqueCellKey,
  CellSelect,
  ButtonSelect,
  InputSelect
) {
  let CellComponent;
  let componentRenderType;
  let cellInitValue;
  let isToggle = false;

  if (type === SELECT) {
    CellComponent = CellSelect;

    const { list, defaultValue, initValue } = attr;

    attr.list = checkList(list);

    cellInitValue = initValue || defaultValue;
    attr.defaultValue = cellInitValue;

    if (defaultValue === undefined) {
      delete attr.initValue;
    }
  } else if (type === CHECKBOX || type === RADIO) {
    CellComponent = ButtonSelect;
    componentRenderType = BTN;

    if (isSwitchPosition === null) {
      isToggle = true;
    }

    const { initValue, checked } = attr;

    cellInitValue = initValue || checked;

    if (checked === undefined) {
      delete attr.initValue;
    } else if (initValue === undefined) {
      delete attr.checked;
    }

    if (cellInitValue === undefined) {
      cellInitValue = false;
    }
  } else {
    CellComponent = InputSelect;
    componentRenderType = INPUT;

    const { initValue, value } = attr;

    cellInitValue = initValue || value;

    if (value === undefined) {
      delete attr.initValue;
    } else if (initValue === undefined) {
      delete attr.value;
    }

    if (cellInitValue === undefined) {
      cellInitValue = '';
    }
  }

  return {
    CellComponent,
    componentRenderType,
    isToggle
  };
}
