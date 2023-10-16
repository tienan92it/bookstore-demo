import { Card, Title, Text } from '@tremor/react'
import Search from '_components/search'
import BooksTable from '_components/table'

export const dynamic = 'force-dynamic'

export default function IndexPage() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Books</Title>
      <Text>A list of books retrieved from a DF BookStore.</Text>
      <Search />
      <Card className="mt-6">
        <BooksTable />
      </Card>
    </main>
  )
}
