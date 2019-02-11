import React from "react";

/**
 * HOC component
 * Connect component to props
 *
 * @param {Component} targeted_component
 * @param {Component} consumer_context
 * @param {Array} contextProps contains props required from consumer
 * @return {Component} - new component connected to context props
 */
export default function({ Component, Consumer, contextProps = [] }) {
  return function ComponentWithContext(props) {
    return (
      <Consumer>
        {context => {
          let cn = contextProps.length > 0 ? {} : context;
          /**
           * if contextProps length is zero, pass all context props
           * otherwise extract the required props
           */
          if (contextProps.length > 0) {
            contextProps.forEach(prop => {
              cn[prop] = context[prop];
            });
          }
          return React.createElement(Component, Object.assign({}, props, cn));
        }}
      </Consumer>
    );
  };
}
