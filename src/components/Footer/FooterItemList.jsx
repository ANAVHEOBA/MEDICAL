import React from "react";
import FooterItem from "./FooterItem";

function FooterItemList({ heading, items }) {
  return (
    <div>
      <h5 className="text-white font-medium text-lg">{heading}</h5>
      <ul className="mt-5 space-y-2">
        {items.map((item) => {
          return <FooterItem key={item.id} {...item} />;
        })}
      </ul>
    </div>
  );
}
export default FooterItemList;
