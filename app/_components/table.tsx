'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
} from '@tremor/react'
import { useFetchBooks } from '_hooks/api/useFetchBooks'
import { Book } from '@/_api/model'

export default function BooksTable() {
  const { books } = useFetchBooks()
  const searchParams = useSearchParams()
  const [displayBooks, setDisplayBooks] = useState<Book[]>([])

  useEffect(() => {
    const searchTerm = searchParams.get('s')
    if (searchTerm) {
      setDisplayBooks(books.filter((book) => book.name.includes(searchTerm)))
    } else {
      setDisplayBooks(books)
    }
  }, [searchParams, books])

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Username</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {displayBooks.map((book) => (
          <TableRow key={book.id}>
            <TableCell>{book.name}</TableCell>
            <TableCell>
              <Text>{book.author}</Text>
            </TableCell>
            <TableCell>
              <Text>{book.topic?.name || 'N/A'}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
