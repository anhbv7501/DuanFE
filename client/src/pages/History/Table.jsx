import moment from "moment";
import React from "react";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../hooks/redux.hook";
import { actionSetCurrentReceipt } from "../../redux/reducers/product.reducer";
// import { actionSetCurrentReceipt } from "../../redux/reducers/order.reducer";

const TableProduct = ({ data }) => {
  const history = useNavigate();
  const dispatch = useAppDispatch();
  const handleClickView = (data) => {
    dispatch(actionSetCurrentReceipt(data));
    history("/detail-receipt/" + data?.id);
  };
  return (
    <div className="ps-section__right">
      <div className="ps-section__header">
        <h2>Lịch sử đơn hàng</h2>
      </div>
      <div className="ps-section__content">
        <div className="table-responsive">
          <table className="table ps-table--wishlist">
            <thead>
              <tr>
                <th>Mã đơn hàng</th>
                <th>Ngày tạo</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 &&
                data.map((item) => {
                  return (
                    <tr key={item?.id}>
                      <td>#{item?.receipt_code}</td>
                      <td>{moment(item.createDate).format("DD-MM-YYYY hh:mm:ss")}</td>
                      <td>
                        {item.total_price?.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        }) || 0}
                      </td>
                      <td>
                        <span className="label-warning status-label">{item.status}</span>
                      </td>
                      <td>
                        <span
                          className="ps-btn ps-btn--sm ps-btn--small view"
                          onClick={() => {
                            handleClickView(item);
                          }}
                        >
                          Xem
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="ps-pagination"></div>
      </div>
    </div>
  );
};
export default TableProduct;
