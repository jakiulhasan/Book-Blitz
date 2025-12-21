import React from "react";
import { useSearchParams } from "react-router";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  console.log(sessionId);
  return <div className="max-w-7xl mx-auto">PaymentSuccess</div>;
};

export default PaymentSuccess;
