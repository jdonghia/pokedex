import {
  Pagination as ShadcnuiPagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

interface PaginationProps {
  onNextClick: () => void;
  onPreviousClick: () => void;
}

export function Pagination({ onNextClick, onPreviousClick }: PaginationProps) {
  return (
    <ShadcnuiPagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={onPreviousClick} />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={onNextClick} />
        </PaginationItem>
      </PaginationContent>
    </ShadcnuiPagination>
  );
}
