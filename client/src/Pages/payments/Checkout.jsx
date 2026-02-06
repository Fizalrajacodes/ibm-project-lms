import { useEffect, useState } from 'react';
import { BsCurrencyRupee } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import HomeLayout from '../../layouts/HomeLayout';
import {
  getRazorpayKey,
  purchaseCourseBundle,
  verifyUserPayment
} from '../../Redux/slices/RazorpaySlice';

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const razorpay = useSelector((state) => state.razorpay);
  const user = useSelector((state) => state.auth?.data);

  const [loading, setLoading] = useState(true);

  async function handleSubscription() {
    console.log("Razorpay State =>", razorpay);

    if (!razorpay?.key || !razorpay?.subscription_id) {
      toast.error("Payment not ready. Please wait.");
      return;
    }

    if (!window.Razorpay) {
      toast.error("Razorpay SDK not loaded");
      return;
    }

    const options = {
      key: razorpay.key,
      subscription_id: razorpay.subscription_id,
      name: "Dutta Pvt. LTD",
      description: "1 Year Subscription",
      theme: {
        color: "#cedb17"
      },
      prefill: {
        name: user?.name,
        email: user?.email
      },
      handler: async (response) => {
        const paymentDetails = {
          payment_id: response.razorpay_payment_id,
          subscription_id: response.razorpay_subscription_id,
          razorpay_signature: response.razorpay_signature
        };

        const res = await dispatch(verifyUserPayment(paymentDetails));

        if (res?.payload?.success) {
          navigate(`/course/${state?.title}/checkout/success`, { state });
        } else {
          navigate(`/course/${state?.title}/checkout/fail`, { state });
        }
      }
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  }

  async function initPayment() {
    try {
      await dispatch(getRazorpayKey());
      await dispatch(purchaseCourseBundle());
      setLoading(false);
    } catch (error) {
      toast.error("Failed to initialize payment");
    }
  }

  useEffect(() => {
    if (!state) {
      navigate('/courses');
      return;
    }

    document.title = "Checkout - Learning Management System";
    initPayment();
  }, []);

  return (
    <HomeLayout>
      <div className="lg:h-screen flex justify-center items-center">
        <div className="lg:w-1/3 w-11/12 bg-white rounded-lg shadow-lg flex flex-col gap-4 items-center pb-4">

          <h1 className="bg-yellow-500 text-black font-bold text-3xl w-full text-center py-3 rounded-t-lg">
            Subscription Bundle
          </h1>

          <p className="px-4 text-xl text-slate-500 text-center">
            Access all courses for
            <span className="text-blue-500 font-bold text-2xl"> 1 Year</span>
          </p>

          <p className="px-5 text-xl text-yellow-500 text-center font-semibold">
            Existing & future courses included
          </p>

          <p className="flex gap-1 items-center text-green-500">
            <BsCurrencyRupee />
            <span className="text-3xl font-bold">499</span> only
          </p>

          <p className="text-slate-500 text-xl font-semibold text-center">
            100% refund within 14 days
          </p>

          <button
            className="btn btn-primary w-[90%]"
            onClick={handleSubscription}
            disabled={loading}
          >
            {loading ? "Initializing..." : "Buy Now"}
          </button>

        </div>
      </div>
    </HomeLayout>
  );
}

export default Checkout;
