import prismadb from "@/lib/prismadb";

export const getTotalRevenue = async (storeId: string) => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true
        }
      }
    },
  });

  const totalPrice = paidOrders.reduce((total, order) => {
    const orderTotal = order.orderItems.reduce((orderTotal, orderItem) => {
      return orderTotal + Number(orderItem.product.price);
    }, 0);

    return total + orderTotal;
  }, 0);

  return totalPrice;
};