"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-hot-toast";

import { Product } from "@/types";
import useCart from "@/hooks/use-cart";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";

interface SummaryProps {
  data: Product[];
}

const Summary: React.FC<SummaryProps> = ({
  data
}) => {
  const searchParams = useSearchParams();

  const items = useCart(state => state.items);
  const removeAll = useCart(state => state.removeAll);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed!");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something wend wrong.");
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, cur) => total + Number(cur.price), 0)

  const onCheckout = async () => {
    const response: AxiosResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
      productIds: items.map(item => item.id),
    });

    window.location = response.data.url;
  }

  if (!data) return null;

  return (
    <div className="
      mt-16
      rounded-lg
      bg-gray-50
      px-4
      py-6
      sm:p-6
      lg:col-span-5
      lg:mt-0
      lg:p-8
    ">
      <h2 className="text-lg font-medium text-gray-900">
        Order Summary
      </h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">
            Order total
          </div>
          <Currency value={totalPrice} />
        </div>
      </div>

      <Button className="mt-6 w-full" onClick={onCheckout}>Checkout</Button>
    </div>
  )
}

export default Summary;