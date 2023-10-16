'use client'
import useSWR from 'swr'
import { getBooks } from '_api/book/book'

const SWR_KEY = 'GET_BOOKS'

export function useFetchBooks() {
  const { data, ...rest } = useSWR(SWR_KEY, () => getBooks().then(res => res.data))

  return {
    books: data || [],
    ...rest,
  }
}
