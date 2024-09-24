import {
  Pagination as ShadcnuiPagination,
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

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
}

const MAX_NUMBER_OF_PAGES = 5;

export function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
}: PaginationProps) {
  const searchParams = useSearchParams();
  const pages = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i);
  }
  const router = useRouter();

  const pageNumLimit = Math.floor(MAX_NUMBER_OF_PAGES / 2);

  const params = new URLSearchParams(searchParams.toString());

  let activePages = pages.slice(
    Math.max(0, currentPage - 1 - pageNumLimit),
    Math.min(currentPage - 1 + pageNumLimit + 1, pages.length)
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
    params.set("limit", value.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center w-full">
      <p>Rows per page</p>
      <Select defaultValue="20" onValueChange={handleRowsPerPage}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="30">30</SelectItem>
          <SelectItem value="40">40</SelectItem>
        </SelectContent>
      </Select>
      <ShadcnuiPagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={handlePrevPage} />
          </PaginationItem>

          {renderPages()}

          <PaginationItem>
            <PaginationNext onClick={handleNextPage} />
          </PaginationItem>
        </PaginationContent>
      </ShadcnuiPagination>
    </div>
  );
}
