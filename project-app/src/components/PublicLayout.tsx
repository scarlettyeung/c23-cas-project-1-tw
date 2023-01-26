import React from 'react';


function PublicLayout(props: React.PropsWithChildren) {
  return (
    <>
      {props.children}
    </>
  );
}

export default PublicLayout;
