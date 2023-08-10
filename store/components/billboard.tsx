"use client";

import { Billboard as BillboardType } from "@/types";

interface BillboardProps {
  data: BillboardType;
}

const Billboard: React.FC<BillboardProps> = ({
  data
}) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <div
        className="relative rounded-xl aspect-video md:aspect-[2.4/1] overflow-hidden bg-cover bg-top hover:scale-[99%] transition"
        style={{ backgroundImage: `url(${data?.imageUrl})` }}
      >
        <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-gray-800 bg-fixed opacity-50 hover:opacity-60 transition" />
        <div className="h-full w-full flex flex-col items-center justify-center text-center gap-y-8">
          <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs text-white z-10">
            {data?.label}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Billboard;