import ReactPaginate from "react-paginate";
import { cn } from "@/src/lib/utils";
import ChevronLeftIcon from "../icons/ChevronLeftIcon";
import ChevronRightIcon from "../icons/ChevronRightIcon";
// import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  initialPage: number;
  pageCount: number;
  currentRange: { start: number; end: number };
  totalDataLength: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export default function Pagination({
  initialPage = 0,
  pageCount,
  currentRange: { start, end },
  totalDataLength,
  onPageChange,
  className,
}: PaginationProps) {
  return (
    <div className={cn("mt-5 flex items-center justify-between", className)}>
      <p className="text-sm text-[#B5B7C0]">
        Showing data {start} to {end} of {totalDataLength} entries
      </p>
      <ReactPaginate
        pageCount={pageCount}
        initialPage={initialPage}
        onPageChange={({ selected }) => onPageChange(selected + 1)}
        breakLabel="..."
        previousLabel={<ChevronLeftIcon />}
        previousLinkClassName="text-sm"
        previousClassName="bg-[#F5F5F5] border border-[#EEEEEE] rounded w-6 h-6 flex items-center justify-center"
        nextLabel={<ChevronRightIcon />}
        nextLinkClassName="text-sm"
        nextClassName="bg-[#F5F5F5] border border-[#EEEEEE] rounded w-6 h-6 flex items-center justify-center"
        containerClassName="flex space-x-3 items-center"
        pageClassName="bg-[#F5F5F5] text-xs font-medium border border-[#EEEEEE] rounded w-6 h-6 flex items-center justify-center"
        activeClassName="text-white !bg-wheels-primary"
        disabledClassName="opacity-50 cursor-not-allowed"
        disabledLinkClassName="cursor-not-allowed"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}
