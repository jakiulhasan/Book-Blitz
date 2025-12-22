import React, { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Loading/Loading";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  const [response, setResponse] = useState(null);
  // console.log(sessionId);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setResponse(res.data);
        });
    }
  }, [sessionId, axiosSecure]);

  if (response?.modifiedCount > 0) {
    return <Navigate to="/user/dashboard" replace={true} />;
  }

  return <Loading></Loading>;
};

export default PaymentSuccess;
