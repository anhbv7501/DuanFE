import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/authLayout.jsx";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import authApi from "../../api/authApi.js";
import { toast } from "react-toastify";
import "./style.scss";
import useAuth from "../../hooks/auth.hook.js";

const schema = yup.object().shape({
  email: yup.string().email("Email không đúng định dạng").required("Bạn phải nhập email"),
  password: yup.string().min(5, "Bạn phải nhập mật khẩu với tối thiểu 5 ký tự").required("Bạn phải nhập mật khẩu"),
  confirm: yup.string().oneOf([yup.ref("password")], "Mật khẩu không tương ứng"),
  first_name: yup.string().required("Bạn phải nhập họ").typeError("Bạn phải nhập họ là ký tự"),
  last_name: yup.string().required("Bạn phải nhập tên").typeError("Bạn phải nhập tên là ký tự"),
  phone: yup
    .number()
    .required("Bạn phải nhập số điện thoại")
    .min(9, "Bạn phải nhập ít nhất 9 số")
    .typeError("Số điện thoại phải là số"),
  address: yup.string().required("Bạn phải nhập địa chỉ "),
});

export default function Register() {
  const [isShowPass, setIsShowPass] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const history = useNavigate();
  const { register: registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleMouseDown = ({ target }) => {
    clearErrors(`${target.name}`);
  };
  const onSubmit = async (data) => {
    data.phone = "0" + String(data?.phone);
    try {
      registerUser({
        ...data,
        successCallback: (response) => {
          if (response.result?.success) {
            toast.success("Đăng ký thành công. Vui lòng đăng nhập để tiếp tục");
            history("/login");
          } else {
            toast.error("Đăng ký thất bại");
          }
        },
      });
    } catch (error) {
      toast.error("Đăng ký thất bại");
    }
  };
  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex flex-row align-items-center justify-content-center ">
          <p className="lead fw-normal mb-3 me-3 fs-3">Đăng ký </p>
        </div>

        <div className="form-outline mb-4">
          <input
            type="text"
            {...register("email")}
            onMouseDown={handleMouseDown}
            defaultValue={getValues("email")}
            className={errors.email ? "form-control form-control-lg form__error" : "form-control form-control-lg"}
            placeholder="Nhập địa chỉ email"
          />
          <p className="text__error">{errors.email?.message}</p>
        </div>

        <div className="form-outline mb-3 ">
          <div className={"position-relative"}>
            <input
              type={isShowPass ? "text" : "password"}
              {...register("password")}
              defaultValue={getValues("password")}
              onMouseDown={handleMouseDown}
              className={errors.password ? "form-control form-control-lg form__error" : "form-control form-control-lg"}
              placeholder="Nhập mật khẩu"
            />
            {isShowPass ? (
              <i
                className="fa fa-eye-slash pass__icon"
                onClick={() => {
                  setIsShowPass(false);
                }}
              />
            ) : (
              <i
                className="fa fa-eye pass__icon"
                onClick={() => {
                  setIsShowPass(true);
                }}
              />
            )}
          </div>
          <p className="text__error">{errors.password?.message}</p>
        </div>

        <div className="form-outline mb-3 ">
          <div className={"position-relative"}>
            <input
              type={isShowConfirm ? "text" : "password"}
              {...register("confirm")}
              defaultValue={getValues("confirm")}
              onMouseDown={handleMouseDown}
              className={errors.confirm ? "form-control form-control-lg form__error" : "form-control form-control-lg"}
              placeholder="Nhập lại mật khẩu"
            />
            {isShowConfirm ? (
              <i
                className="fa fa-eye-slash pass__icon"
                onClick={() => {
                  setIsShowConfirm(false);
                }}
              />
            ) : (
              <i
                className="fa fa-eye pass__icon"
                onClick={() => {
                  setIsShowConfirm(true);
                }}
              />
            )}
          </div>
          <p className="text__error">{errors.confirm?.message}</p>
        </div>

        <div className="row">
          <div className="form-outline mb-3 col col-6">
            <input
              type="text"
              {...register("first_name")}
              defaultValue={getValues("first_name")}
              onMouseDown={handleMouseDown}
              className={
                errors.first_name ? "form-control form-control-lg form__error" : "form-control form-control-lg"
              }
              placeholder="Họ"
            />
            <p className="text__error">{errors.first_name?.message}</p>
          </div>
          <div className="form-outline mb-3 col col-6">
            <input
              type="text"
              {...register("last_name")}
              defaultValue={getValues("last_name")}
              onMouseDown={handleMouseDown}
              className={errors.last_name ? "form-control form-control-lg form__error" : "form-control form-control-lg"}
              placeholder="Tên"
            />
            <p className="text__error">{errors.last_name?.message}</p>
          </div>
        </div>

        <div className="form-outline mb-3">
          <input
            type="text"
            {...register("phone")}
            defaultValue={getValues("phone")}
            onMouseDown={handleMouseDown}
            className={errors.phone ? "form-control form-control-lg form__error" : "form-control form-control-lg"}
            placeholder="Nhập số điện thoại"
          />
          <p className="text__error">{errors.phone?.message}</p>
        </div>
        <div className="form-outline mb-3">
          <input
            type="text"
            {...register("address")}
            defaultValue={getValues("address")}
            onMouseDown={handleMouseDown}
            className={errors.address ? "form-control form-control-lg form__error" : "form-control form-control-lg"}
            placeholder="Nhập địa chỉ"
          />
          <p className="text__error">{errors.address?.message}</p>
        </div>

        <div className="text-center text-lg-start mt-4 pt-2">
          <button type="submit" className="btn btn-primary btn-sm px-5">
            Đăng ký
          </button>
          <p className="small fw-bold mt-2 pt-1 mb-0">
            Bạn có tài khoản?{" "}
            <Link to="/login" className="link-danger">
              Đăng nhập
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
