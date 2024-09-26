import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from '@/components/ui/pagination'
import { useRouter, useSearchParams } from 'next/navigation'
import { CustomSelect } from './CustomSelect'

interface PaginationProps {
  totalItems: number
  itemsPerPage: number
  currentPage: number
}

const MAX_NUMBER_OF_PAGES = 3
const PAGE_NUMBER_LIMIT = Math.floor(MAX_NUMBER_OF_PAGES / 2)

export function CustomPagination({
  totalItems,
  itemsPerPage,
  currentPage,
}: PaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)

  const pages = []
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i)
  }

  const activePages = pages.slice(
    Math.max(0, currentPage - 1 - PAGE_NUMBER_LIMIT),
    Math.min(currentPage - 1 + PAGE_NUMBER_LIMIT + 1, pages.length),
  )

  const handleNextPage = () => {
    if (currentPage < pages.length) {
      params.set('limit', itemsPerPage.toString())
      params.set('offset', (itemsPerPage * currentPage).toString())

      router.push(`?${params.toString()}`)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1
      const offset = itemsPerPage * (newPage - 1)

      params.set('limit', itemsPerPage.toString())
      params.set('offset', offset.toString())

      router.push(`?${params.toString()}`)
    }
  }

  const handlePageClick = (page: number) => {
    const offset = itemsPerPage * (page - 1)

    params.set('limit', itemsPerPage.toString())
    params.set('offset', offset.toString())

    router.push(`?${params.toString()}`)
  }

  const handleEllipsisClick = (newPage: number) => {
    const offset = itemsPerPage * (newPage - 1)

    params.set('limit', itemsPerPage.toString())
    params.set('offset', offset.toString())

    router.push(`?${params.toString()}`)
  }

  const renderPages = () => {
    const renderedPages = activePages.map((page, idx) => (
      <PaginationItem
        key={idx}
        className={currentPage === page ? 'rounded-md bg-neutral-100' : ''}
      >
        <PaginationLink
          onClick={() => handlePageClick(page)}
          className="cursor-pointer"
        >
          {page}
        </PaginationLink>
      </PaginationItem>
    ))

    if (activePages[0] > 1) {
      renderedPages.unshift(
        <PaginationEllipsis
          key="ellipsis-start"
          className="cursor-pointer"
          onClick={() => handleEllipsisClick(activePages[0] - 1)}
        />,
      )
    }

    if (activePages[activePages.length - 1] < pages.length) {
      renderedPages.push(
        <PaginationEllipsis
          key="ellipsis-end"
          className="cursor-pointer"
          onClick={() =>
            handleEllipsisClick(activePages[activePages.length - 1] + 1)
          }
        />,
      )
    }

    return renderedPages
  }

  const handleRowsPerPage = (value: string) => {
    const offset = itemsPerPage * (currentPage - 1)

    params.set('limit', value.toString())
    params.set('offset', offset.toString())

    router.push(`?${params.toString()}`)
  }

  const itemsPerPageOptions = [
    {
      value: '20',
      label: '20',
    },
    {
      value: '40',
      label: '40',
    },
    {
      value: '60',
      label: '60',
    },
  ]

  return (
    <div className="col-[span_36_/_span_36] row-span-2 grid place-items-center bg-[#e8e8e8]">
      <div className="flex w-4/6 items-center justify-between">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePrevPage}
                className="cursor-pointer"
              />
            </PaginationItem>
            {renderPages()}
            <PaginationItem>
              <PaginationNext
                onClick={handleNextPage}
                className="cursor-pointer"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <div className="flex w-7/12 items-center gap-3">
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
  )
}
