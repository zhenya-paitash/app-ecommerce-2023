import prismadb from "@/lib/prismadb";
import { format } from 'date-fns';
import { formatter } from "@/lib/utils";

import { OrdersClient } from "./components/client";
import { OrderColumn } from "./components/columns";

const OrdersPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        }
      }
    },
    orderBy: {
      createdAt: 'desc',
    }
  });

  const formattedOrders: OrderColumn[] = orders.map(item => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    isPaid: item.isPaid,
    products: item.orderItems.map(item => item.product.name).join(', '),
    totalPrice: formatter.format(item.orderItems.reduce((total, order) => total + Number(order.product.price), 0)),
    // createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrdersClient data={formattedOrders} />
      </div>
    </div>
  );
}

export default OrdersPage;