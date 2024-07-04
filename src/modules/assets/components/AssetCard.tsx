import Image from "next/image";
import UserIcon from "@/src/components/icons/UserIcon";
import StatusTag from "@/src/components/common/StatusTag";
import { getAssetImage } from "@/src/lib/utils";
import type { AssetCardProps } from "../types";

export default function AssetCard({ id, type, status }: AssetCardProps) {
  return (
    <div className="rounded-lg border border-[rgba(204,212,216,1)] p-2 px-3">
      <div className="mb-4">
        {type && (
          <div>
            <Image
              src={getAssetImage(type)}
              alt={type}
              width={48}
              height={48}
            />
          </div>
        )}
      </div>
      <div>
        <p className="mb-1 text-sm font-bold lg:text-base">{id}</p>
        <p className="flex items-center space-x-2 text-13 font-medium text-[rgba(39,39,39,0.5)]">
          <span>Ambassador</span>
          <span>Kenneth Daniel</span>
        </p>
        <p className="mb-4 mt-1.5 text-13 text-[rgba(72,72,72,1)]">
          231 Rentals
        </p>

        <div className="flex items-center justify-between space-x-1.5 border-t-[0.5px] border-t-black/20 pt-2">
          <div className="flex items-center space-x-1">
            <UserIcon className="h-3 w-3" />
            <span className="text-xs">Kolade James</span>
          </div>

          <StatusTag status={status} />
        </div>
      </div>
    </div>
  );
}
