import { createColumnHelper } from '@tanstack/react-table'
import Tanstack from './components/tanstack'
import { useGetCharacter } from './hooks/useCharacter'
import { Character } from './interface'

function App() {
  const columnHelper = createColumnHelper<Character>()
  const { isLoading, isError, data = [] } = useGetCharacter()

  const columns = [
    columnHelper.accessor('id', {
      header: 'Id',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('name', {
      header: 'Name',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('type', {
      header: 'Type',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('gender', {
      header: 'Gender',
      cell: (info) => info.getValue(),
    }),
  ]

  return (
    <div className="p-8">
      <Tanstack
        columns={columns}
        data={data}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  )
}

export default App
