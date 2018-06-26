import React from 'react';

// This function takes a component...
export default function withContext(Component, Consumer) {
  // ...and returns another component...
  return function ComponentWithContext(props) {
    // ... and renders the wrapped component with the context theme!
    // Notice that we pass through any additional props as well
    // console.log(Component);
    return (
      <Consumer>{context => <Component {...props} {...context} />}</Consumer>
    );
  };
}
