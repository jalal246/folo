import React from "react";

import registry from "../valuesStore";

const BLUR = "blur";

/**
 * manage value updates for all cell types
 * all controlled
 */
const Core = ({
  coreComponent: Component,
  initValue,
  nameRef,
  groupName,
  valueRef,
  isInput,
  onBlur: onBlurProps,
  onChange: onChangeProps,
  children,
  ...rest
}) => {
  const [localValue, setValue] = React.useState(initValue);

  React.useEffect(() => {
    registry.subscribe(
      {
        nameRef,
        initValue,
        groupName,
      },
      setValue
    );
  }, []);

  function eventHandler(e) {
    const {
      target: { [valueRef]: newValue },
      type,
    } = e;

    if (type === BLUR && typeof onBlurProps === "function") {
      // trigger onBlur coming form props
      onBlurProps(e);
    } else {
      // update local value while the change is happening
      // don't notify the global store yet
      setValue(newValue);

      if (typeof onChangeProps === "function") {
        onChangeProps(e);
      }
    }

    if (!isInput || type === BLUR) {
      // inform the store with the new changes we have here
      // only when bur or change happens in non-input element
      registry.updater({
        nameRef,
        newValue,
        groupName,
      });
    }
  }

  return (
    <Component
      {...{ [valueRef]: localValue }}
      onChange={eventHandler}
      onBlur={eventHandler}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Core;
