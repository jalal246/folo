import React from 'react';

function withContext(Component, Consumer) {
  return function ComponentWithContext(props) {
    return (
      <Consumer>{context => <Component {...props} {...context} />}</Consumer>
    );
  };
}

export default withContext;
