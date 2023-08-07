import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import { Heading } from "@/components/ui/heading";

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
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading
          title={store.name}
          description="Overview your store."
        />
      </div>
    </div>
  );
}

export default DashboardPage