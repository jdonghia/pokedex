import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CustomSelect } from "./CustomSelect";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
}

const MAX_NUMBER_OF_PAGES = 3;
const PAGE_NUMBER_LIMIT = Math.floor(MAX_NUMBER_OF_PAGES / 2);

export function CustomPagination({
  totalItems,
  itemsPerPage,
  currentPage,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const pages = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i);
  }

  let activePages = pages.slice(
    Math.max(0, currentPage - 1 - PAGE_NUMBER_LIMIT),
    Math.min(currentPage - 1 + PAGE_NUMBER_LIMIT + 1, pages.length)
  );

  const handleNextPage = () => {
    if (currentPage < pages.length) {
      params.set("limit", itemsPerPage.toString());
      params.set("offset", (itemsPerPage * currentPage).toString());

      router.push(`?${params.toString()}`);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      const offset = itemsPerPage * (newPage - 1);

      params.set("limit", itemsPerPage.toString());
      params.set("offset", offset.toString());

      router.push(`?${params.toString()}`);
    }
  };

  const handlePageClick = (page: number) => {
    const offset = itemsPerPage * (page - 1);

    params.set("limit", itemsPerPage.toString());
    params.set("offset", offset.toString());

    router.push(`?${params.toString()}`);
  };

  const handleEllipsisClick = (newPage: number) => {
    const offset = itemsPerPage * (newPage - 1);

    params.set("limit", itemsPerPage.toString());
    params.set("offset", offset.toString());

    router.push(`?${params.toString()}`);
  };

  const renderPages = () => {
    const renderedPages = activePages.map((page, idx) => (
      <PaginationItem
        key={idx}
        className={currentPage === page ? "bg-neutral-100 rounded-md" : ""}
      >
        <PaginationLink onClick={() => handlePageClick(page)}>
          {page}
        </PaginationLink>
      </PaginationItem>
    ));

    if (activePages[0] > 1) {
      renderedPages.unshift(
        <PaginationEllipsis
          key="ellipsis-start"
          onClick={() => handleEllipsisClick(activePages[0] - 1)}
        />
      );
    }

    if (activePages[activePages.length - 1] < pages.length) {
      renderedPages.push(
        <PaginationEllipsis
          key="ellipsis-end"
          onClick={() =>
            handleEllipsisClick(activePages[activePages.length - 1] + 1)
          }
        />
      );
    }

    return renderedPages;
  };

  const handleRowsPerPage = (value: string) => {
    const offset = itemsPerPage * (currentPage - 1);

    params.set("limit", value.toString());
    params.set("offset", offset.toString());

    router.push(`?${params.toString()}`);
  };

  const itemsPerPageOptions = [
    {
      value: "20",
      label: "20",
    },
    {
      value: "30",
      label: "30",
    },
    {
      value: "40",
      label: "40",
    },
  ];

  return (
    <div className="flex items-center w-2/3 bg-purple-500 fixed bottom-0 justify-center z-50 py-3">
      <div className="flex items-center w-3/6 justify-between">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={handlePrevPage} />
            </PaginationItem>
            {renderPages()}
            <PaginationItem>
              <PaginationNext onClick={handleNextPage} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <div className="w-6/12 flex items-center gap-3">
          <p className="text-sm">Pokemons per page:</p>
          <CustomSelect
            className="w-4/12"
            defaultValue={itemsPerPage.toString()}
            onValueChange={handleRowsPerPage}
            options={itemsPerPageOptions}
          />
        </div>
      </div>
    </div>
  );
}
