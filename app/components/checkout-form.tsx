"use client";

import convertToSubcurrency from "../_utils/currency-formatter";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";

const CheckoutForm = ({ amount, plan }: { amount: number, plan: string }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const fetchClientSecret = async () => {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
      });
      const data = await response.json();
      setClientSecret(data.clientSecret);
    };

    fetchClientSecret();
  }, [amount]);

  const handlesubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setError(submitError.message ?? null);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success?plan=${plan}`,
      },
    });

    if (error) {
      setError(error.message ?? null);
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <form onSubmit={handlesubmit}>
      {clientSecret && <PaymentElement />}
      {error && <div>{error}</div>}
      <Button
        fullWidth
        variant="contained"
        style={{
          borderRadius: 100,
          textTransform: "capitalize",
          boxShadow: "none",
          marginBottom: "1rem",
          marginTop: "1rem",
        }}
        disabled={!stripe || loading}
        type="submit"
      >
        {!loading ? `Pay RM${amount}` : "Processing..."}
      </Button>
    </form>
  );
};

export default CheckoutForm;
