import React from 'react';
export default (props) => {
  return (
    <div>
      <h1>子路由</h1>
      <div>{props.children}</div>
    </div>
  );
};
