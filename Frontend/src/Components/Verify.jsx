import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const token = useSelector((store) => store.categorySlice.token);
  const navigate = useNavigate();
  const url = useSelector((store) => store.categorySlice.url);
  const verifyOrder = async () => {
    const response = await axios.post(
      url + "/order/verify",
      { success, orderId },
      { headers: { token } }
    );
    if (response.data.success) {
      navigate("/myorders");
    } else {
      navigate("/");
    }
  };
  useEffect(() => {
    verifyOrder();
  }, []);
  return (
    <div className="pt-32 px-4 md:px-8 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center gap-8">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
      </div>
    </div>
  );
};

export default Verify;
