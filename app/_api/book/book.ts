/**
 * Generated by orval v6.18.1 🍺
 * Do not edit manually.
 * Swagger API
 * This is a swagger for API.
 * OpenAPI spec version: 1.0
 */
import useSwr from 'swr'
import type {
  SWRConfiguration,
  Key
} from 'swr'
import type {
  BooksResponse,
  ErrorResponse,
  GetBooksParams,
  BookResponse,
  CreateBookRequest,
  UpdateBookRequest,
  MessageResponse
} from '.././model'
import { fetcher } from '.././mutator/fetcher';


  
  // eslint-disable-next-line
  type SecondParameter<T extends (...args: any) => any> = T extends (
  config: any,
  args: infer P,
) => any
  ? P
  : never;

/**
 * Get list of books
 * @summary Get list of books
 */
export const getBooks = (
    params?: GetBooksParams,
 options?: SecondParameter<typeof fetcher>) => {
      return fetcher<BooksResponse>(
      {url: `/books`, method: 'get',
        params
    },
      options);
    }
  

export const getGetBooksKey = (params?: GetBooksParams,) => [`/books`, ...(params ? [params]: [])] as const;

    
export type GetBooksQueryResult = NonNullable<Awaited<ReturnType<typeof getBooks>>>
export type GetBooksQueryError = ErrorResponse

/**
 * @summary Get list of books
 */
export const useGetBooks = <TError = ErrorResponse>(
 params?: GetBooksParams, options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof getBooks>>, TError> & { swrKey?: Key, enabled?: boolean }, request?: SecondParameter<typeof fetcher> }

  ) => {

  const {swr: swrOptions, request: requestOptions} = options ?? {}

  const isEnabled = swrOptions?.enabled !== false
    const swrKey = swrOptions?.swrKey ?? (() => isEnabled ? getGetBooksKey(params) : null);
  const swrFn = () => getBooks(params, requestOptions);

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}

/**
 * Create new book
 * @summary Create new book
 */
export const createBook = (
    createBookRequest: CreateBookRequest,
 options?: SecondParameter<typeof fetcher>) => {
      return fetcher<BookResponse>(
      {url: `/books`, method: 'post',
      headers: {'Content-Type': 'application/json', },
      data: createBookRequest
    },
      options);
    }
  

/**
 * Get book by id
 * @summary Get book by id
 */
export const getBook = (
    id: number,
 options?: SecondParameter<typeof fetcher>) => {
      return fetcher<BookResponse>(
      {url: `/books/${id}`, method: 'get'
    },
      options);
    }
  

export const getGetBookKey = (id: number,) => [`/books/${id}`] as const;

    
export type GetBookQueryResult = NonNullable<Awaited<ReturnType<typeof getBook>>>
export type GetBookQueryError = ErrorResponse

/**
 * @summary Get book by id
 */
export const useGetBook = <TError = ErrorResponse>(
 id: number, options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof getBook>>, TError> & { swrKey?: Key, enabled?: boolean }, request?: SecondParameter<typeof fetcher> }

  ) => {

  const {swr: swrOptions, request: requestOptions} = options ?? {}

  const isEnabled = swrOptions?.enabled !== false && !!(id)
    const swrKey = swrOptions?.swrKey ?? (() => isEnabled ? getGetBookKey(id) : null);
  const swrFn = () => getBook(id, requestOptions);

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}

/**
 * Update book
 * @summary Update book
 */
export const updateBook = (
    id: number,
    updateBookRequest: UpdateBookRequest,
 options?: SecondParameter<typeof fetcher>) => {
      return fetcher<BookResponse>(
      {url: `/books/${id}`, method: 'put',
      headers: {'Content-Type': 'application/json', },
      data: updateBookRequest
    },
      options);
    }
  

/**
 * Delete book by id
 * @summary Delete book by id
 */
export const deleteBook = (
    id: number,
 options?: SecondParameter<typeof fetcher>) => {
      return fetcher<MessageResponse>(
      {url: `/books/${id}`, method: 'delete'
    },
      options);
    }
  
