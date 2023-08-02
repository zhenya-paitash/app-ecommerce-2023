import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
  params: {
    storeId: string,
  },
}

const DashboardPage: React.FC<DashboardPageProps> = async ({
  params
}) => {
  const store = await prismadb.store.findUnique({
    where: {
      id: params.storeId,
    }
  });
  if (!store) redirect('/');

  return (
    <div>
      Active Store: {store.name}
    </div>
  );
}

export default DashboardPage