import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import { useAppSelector } from "../hooks/redux.hook.js";
import { getIsLogin } from "../redux/reducers/auth.reducer.js";

export default function ReceiptLayout({ children }) {
  const isLogin = useAppSelector(getIsLogin)
  const navigate = useNavigate()
  
  useEffect(() => {
    if(!isLogin){
      navigate('/login')
    }
  }, []);
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
