import moment from "moment";
import React from "react";
import { useNavigate } from "react-router";
import imgLogo from "../../assets/images/Logo.png";
import { API } from "../../constants/api.constants";
import { useAppSelector } from "../../hooks/redux.hook";
import CommonLayout from "../../layouts/commonLayout";
import ReceiptLayout from "../../layouts/ReceiptLayout";
import { getIsLogin } from "../../redux/reducers/auth.reducer";
import { getReceipt } from "../../redux/reducers/product.reducer";

export const DetailOrder = (props) => {
  const data = useAppSelector(getReceipt);
  const history = useNavigate();
  console.log('dât',data)

  return (
    <ReceiptLayout>
      <div className="card detail_container">
        <div className="card-header">
          <h3 className="my-3">Chi tiết đơn đặt hàng</h3>
        </div>
        <div className="card-body p-4">
          <div className="customer-order-detail">
            <div className="row">
              <div className="col-md-6">
                <div className="order-slogan">
                  <img width="100" src={imgLogo} alt="Martfury - Laravel Ecommerce system" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="order-meta">
                  <p>
                    <span>Mã hóa đơn:</span>{" "}
                    <span className="order-detail-value font-weight-bold">{data?.receipt_code}</span>
                  </p>
                  <span>Thời gian:</span>{" "}
                  <span className="order-detail-value font-weight-bold">
                    {moment(data.created_at).format("DD-MM-YYYY hh:mm:ss")}
                  </span>
                </div>
              </div>
            </div>
            <h4 className="my-4 font-weight-bold">Thông tin đơn hàng</h4>
            <div className="col-12">
              <span>Trạng thái đơn hàng:</span>{" "}
              <span className="order-detail-value">
                <span className="label-warning status-label font-weight-bold">{data?.status}</span>
              </span>
            </div>
            <div className="col-12">
              <span>Hình thức thanh toán:</span>{" "}
              <span className="order-detail-value">
                <span className="label-warning status-label font-weight-bold">{data?.method}</span>
              </span>
            </div>
            <div className="col-12">
              <span>Tổng tiền:</span>{" "}
              <span className="order-detail-value font-weight-bold">
                {data?.total_price?.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                }) || 0}
              </span>
            </div>
            <div className="col-12">
              <span>Phí ship:</span> <span className="order-detail-value font-weight-bold"> 15.000 VND </span>
            </div>
            <div className="col-12"></div>
            <h4 className="my-4 font-weight-bold">Thông tin người đặt hàng</h4>
            <div className="col-12">
              <span>Họ và tên:</span>{" "}
              <span className="order-detail-value font-weight-bold">
                {data.user?.first_name + " " + data.user?.last_name}
              </span>
            </div>
            <div className="col-12">
              <span>Điện thoại:</span> <span className="order-detail-value font-weight-bold">{data?.user?.phone}</span>
            </div>
            <div className="col-12">
              <span>Địa chỉ:</span> <span className="order-detail-value font-weight-bold">{data?.user?.address}</span>
            </div>
            <h4 className="my-4 font-weight-bold">Chi tiết đặt hàng</h4>
            <div className="col-12">
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th className="text-center">#</th>
                      <th className="text-center">Ảnh</th>
                      <th>Sản phẩm</th>
                      <th className="text-center">Giá sản phẩm</th>
                      <th className="text-right">Số lượng</th>
                      <th className="price text-right">Tổng tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.receipt_products?.length > 0 &&
                      data.receipt_products?.map((item, index) => (
                        <tr key={item?.id}>
                          <td className="text-center">{index + 1}</td>
                          <td className="text-center">
                            <img
                              src={`${API.BASE_URL_IMAGE}/${item?.receipt_product_options?.[0]?.product_option?.product?.images?.[0].path}`}
                              width="50"
                              alt="NYX Beauty Couton Pallete Makeup 12"
                            />
                          </td>
                          <td>
                            {item?.receipt_product_options?.[0]?.product_option?.product?.name}
                            {/* <p className="mb-0">
                              <small>
                                {item?.receiptOptionProducts.map((vl) => {
                                  return `${vl.productOptionName}:${vl.productOptionValue} `;
                                })}
                              </small>
                            </p> */}
                          </td>
                          <td className="text-center">
                            {item?.unit_price?.toLocaleString("it-IT", {
                              style: "currency",
                              currency: "VND",
                            }) || 0}
                          </td>
                          <td className="">{item?.quantity} </td>
                          <td className="money text-right">
                            <strong>
                              {(item?.unit_price * item?.quantity)?.toLocaleString("it-IT", {
                                style: "currency",
                                currency: "VND",
                              }) || 0}
                            </strong>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <span className="ps-btn ps-btn--sm ps-btn--danger" onClick={() => history.push("/history")}>
                Quay lại
              </span>
            </div>
          </div>
        </div>
      </div>
    </ReceiptLayout>
  );
};
