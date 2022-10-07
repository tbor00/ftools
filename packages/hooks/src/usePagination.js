import React from 'react'

/**
 * It returns an object with the current page, the size of the page, and functions to change the page,
 * and to block the pagination buttons
 * @param [opt] - {
 * @returns A function that returns an object with the following properties:
 * size, setSize, currentPage, goToPage, goToNextPage, goToPreviousPage, changePage,
 * blockPaginationWithCount
 */
export default function usePagination(opt = {}) {
    const [size, setSize] = React.useState(opt?.initialSize ?? 5)
    const [currentPage, setCurrentPage] = React.useState(0)

    const changePage = React.useCallback((sum) => {
        setCurrentPage((prev) => prev + (sum ? +1 : -1))
    }, [])

    const goToNextPage = () => changePage(true)

    const goToPreviousPage = () => changePage(false)

    const goToPage = (page) => setCurrentPage(page - 1)

    /* A function that returns an object with the following properties:
 prev: true if the current page is the first page
 next: true if the current page is the last page */
    const blockPaginationWithCount = React.useCallback(
        (total) => {
            return { prev: currentPage <= 0, next: currentPage + 1 >= total }
        },
        [currentPage]
    )

    React.useEffect(() => {
        return () => {
            if (opt?.abortSignal) {
                opt?.abortSignal()
            }
        }
    }, [currentPage, size])

    return { size, setSize, currentPage, goToPage, goToNextPage, goToPreviousPage, changePage, blockPaginationWithCount }
}
