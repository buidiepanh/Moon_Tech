import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import {
  paymentCallBack,
  updateOrderStatus,
} from "../../../services/apiServices";
import toast from "react-hot-toast";

function PaymentCallback() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const code = params.get("vnp_ResponseCode");
  const orderId = sessionStorage.getItem("orderId");

  useEffect(() => {
    fetchPaymentResult();
  }, []);

  const handleOrderStatus = async () => {
    try {
      const payload = {
        status: "paid",
      };
      const res = await updateOrderStatus(orderId, payload);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPaymentResult = async () => {
    try {
      const searchParams = window.location.search;
      const res = await paymentCallBack(searchParams);

      if (res.status === 200 && code === "00") {
        handleOrderStatus();
        toast.success("Payment success!");
        navigate("/");
      } else {
        toast.error("Payment failed, please try again!");
        navigate("/profile");
      }
      sessionStorage.removeItem("orderId");
    } catch (error) {
      console.log(error);
    }
  };

  return <div></div>;
}

export default PaymentCallback;
