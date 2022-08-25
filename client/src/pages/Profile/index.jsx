import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { actionLogout, getIsLogin, getUser } from "../../redux/reducers/auth.reducer";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import authApi from "../../api/authApi.js";
import { toast } from "react-toastify";
import "./style.scss";
import useAuth from "../../hooks/auth.hook.js";
import Helmet from "../../components/Helmet";

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
  const user = useAppSelector(getUser);
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

  return (
    
    <Helmet title="profile">
        <div className="d-flex flex-row align-items-center justify-content-center " style={{ paddingTop: 100 }}>

          <p className="lead fw-normal mb-3 me-3 fs-3">Thông tin tài khoản </p>
         
        </div>
        <div className="text-center text-lg-end mt-4 pt-2">
          <button type="submit" className="btn btn-primary btn-sm px-5">
            Sửa thông tin
          </button>
        </div>
        <p>Email</p>
        <div className="form-outline mb-4">
          <input
            type="text"
            {...register("email")}
            onMouseDown={handleMouseDown}
            defaultValue={user?.email}
            className={errors.email ? "form-control form-control-lg form__error" : "form-control form-control-lg"}
            placeholder="Địa chỉ email"
            disabled = "disabled"
          />
          <p className="text__error">{errors.email?.message}</p>
        </div>

        <div className="row">
          <div className="form-outline mb-3 col col-6">
          <p>Họ</p>
            <input
              type="text"
              {...register("first_name")}
              defaultValue={user?.first_name}
              onMouseDown={handleMouseDown}
              className={
                errors.first_name ? "form-control form-control-lg form__error" : "form-control form-control-lg"
              }
              placeholder="Họ"
              disabled = "disabled"
            />
            <p className="text__error">{errors.first_name?.message}</p>
          </div>
          <div className="form-outline mb-3 col col-6">
          <p>Tên</p>
            <input
              type="text"
              {...register("last_name")}
              defaultValue={user?.last_name}
              onMouseDown={handleMouseDown}
              className={errors.last_name ? "form-control form-control-lg form__error" : "form-control form-control-lg"}
              placeholder="Tên"
              disabled = "disabled"
            />
            <p className="text__error">{errors.last_name?.message}</p>
          </div>
        </div>
        <div className="form-outline mb-3">
        <p>Số điện thoại</p>
          <input
            type="text"
            {...register("phone")}
            defaultValue={user?.phone}
            onMouseDown={handleMouseDown}
            className={errors.phone ? "form-control form-control-lg form__error" : "form-control form-control-lg"}
            placeholder="Số điện thoại"
            disabled = "disabled"
            
          />
          <p className="text__error">{errors.phone?.message}</p>
        </div>
        <div className="form-outline mb-3">
        <p>Địa chỉ</p>
          <input
            type="text"
            {...register("address")}
            defaultValue={user?.address}
            onMouseDown={handleMouseDown}
            className={errors.address ? "form-control form-control-lg form__error" : "form-control form-control-lg"}
            placeholder="Địa chỉ"
            disabled = "disabled"
          />
          <p className="text__error">{errors.address?.message}</p>
        </div>

        
    </Helmet>
   
  );
}
