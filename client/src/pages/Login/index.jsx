import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import authApi from "../../api/authApi.js";
import useAuth from "../../hooks/auth.hook.js";
import AuthLayout from "../../layouts/authLayout.jsx";
import { actionLoginSuccess } from "../../redux/reducers/auth.reducer.js";
import "./style.scss";

const schema = yup.object().shape({
  username: yup.string().email("Email không đúng định dạng").required("Bạn phải nhập email"),
  password: yup.string().min(5, "Bạn phải nhập mật khẩu với tối thiểu 5 ký tự").required("Bạn phải nhập mật khẩu"),
});
export default function Login() {
  const [isShowPass, setIsShowPass] = useState(false);
  const { path } = useParams();
  const history = useNavigate();
  const { login } = useAuth();
  const dispatch = useDispatch();
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
    try {
      login({
        ...data,
        successCallback: (response) => {
          if (response.result?.success) {
            localStorage.setItem("token", response.result.payload?.token);
            dispatch(actionLoginSuccess({ user: response.result.payload?.user }));
            toast.success("Đăng nhập thành công");
            history("/");
          } else {
            toast.error("Đăng nhập thất bại");
          }
        },
      });
      // const dt = await authApi.login(data);
      // if (dt.status === 200) {
      //   console.log(dt);
      //   localStorage.setItem("token", dt?.data?.token.split(" ").slice(1));
      //   // dispatch(actionSetLogin(true));
      //   toast.success("Đăng nhập thành công");
      //   localStorage.setItem("name", dt.data.firstName);
      //   // history.replace("/" + path);
      //   history.replace("/");
      // }
    } catch (error) {
      toast.error("Đăng nhập thất bại");
    }
  };
  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
          <p className="lead fw-normal mb-0 me-3">Đăng nhập với</p>
          <button type="button" className="btn btn-primary btn-floating mx-1">
            <i className="fa fa-facebook-f"></i>
          </button>

          <button type="button" className="btn btn-primary btn-floating mx-1">
            <i className="fa fa-twitter"></i>
          </button>

          <button type="button" className="btn btn-primary btn-floating mx-1">
            <i className="fa fa-linkedin"></i>
          </button>
        </div>

        <div className="divider d-flex align-items-center justify-content-center my-4">
          <p className="text-center fw-bold mx-3 mb-0">Or</p>
        </div>

        <div className="form-outline mb-4">
          <input
            type="text"
            {...register("username")}
            onMouseDown={handleMouseDown}
            defaultValue={getValues("username")}
            className={errors.username ? "form-control form-control-lg form__error" : "form-control form-control-lg"}
            placeholder="Nhập địa chỉ username"
          />
          <p className="text__error">{errors.username?.message}</p>
        </div>

        <div className="form-outline mb-3 ">
          <div className={"position-relative"}>
            <input
              type={isShowPass ? "text" : "password"}
              id="form3Example5"
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

        <div className="d-flex justify-content-between align-items-center">
          <div className="form-check mb-0">
            <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
            <label className="form-check-label" htmlFor="form2Example3">
              Ghi nhớ đăng nhập
            </label>
          </div>
          <span onClick={() => history("/forgot-pass")} className="text-body" style={{ cursor: "pointer" }}>
            Quên mật khẩu?
          </span>
        </div>

        <div className="text-center text-lg-start mt-4 pt-2">
          <button type="submit" className="btn btn-primary btn-sm px-5">
            Đăng nhập
          </button>
          <p className="small fw-bold mt-2 pt-1 mb-0">
            Bạn chưa có tài khoản?{" "}
            <Link to="/register" className="link-danger">
              Đăng ký
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
