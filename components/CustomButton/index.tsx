import React from 'react';

import Link from "next/link";


interface ICustomButton {
  icon?: any;
  label: any;
  onClick: any;
  to?: string;
  disable: any;
}

function CustomButton(property: ICustomButton) {
  function onClickEventHandle(e) {
    if (property.onClick) {
      property.onClick(e);
    }
  }

  return (
    <>
      <Link href={property.to}>
        <button className="bg-red-500 p-2 rounded text-gray-100 cursor-pointer transition duration-150 hover:shadow-md hover:bg-red-600" 
          onClick={onClickEventHandle}
          disabled={property.disable}>
          <span className="label">{property.label}</span>
        </button>
      </Link>
    </>
  );
}

export default React.memo(CustomButton);


