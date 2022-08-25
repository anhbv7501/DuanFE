import React from "react";
import { filter1 } from "./List_Products";
import CheckBox from "./CheckBox";
function Filter({ sizes, colors, categorys, change }) {
  const filters = [
    {
      title: "danh mục sản phẩm ",
      item: {
        categorys,
        case: "CATEGORY",
      },
    },
    {
      title: "màu sắc ",
      item: {
        colors,
        case: "COLOR",
      },
    },
    {
      title: "kích cỡ ",
      item: {
        sizes,
        case: "SIZE",
      },
    },
  ];
  // console.log(change);
  return (
    <div className="filter">
      <div className="filter-item">
        {filters.map((filter, i) => (
          <React.Fragment key={i}>
            <h2 className="filter-item__title">{filter.title}</h2>
            {filter.item.map((e, i) => (
              <div key={i} className="filter-item__checkMark">
                {/* {console.log(e)} */}
                {/* <span className="filter-item__checkMark-check"></span> */}
                <CheckBox onChange={() => change()} />
                <span className="filter-item__checkMark-label">
                  {e.display}
                </span>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Filter;
