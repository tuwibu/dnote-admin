import { UserOutlined } from '@ant-design/icons'
import Card from '@components/Card'
import DeleteDatatable from '@components/Datatable/Delete/DeleteDatatable'
import Table from '@components/Datatable/Table'
import { TableProvider, useTable } from '@contexts/TableContext'
import Container from '@layouts/Container'
import { Button, Space, TableColumnsType, message } from 'antd'
import { useEffect } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Action, Add, Edit } from './Action'
import {
  API,
  SEARCH_COLUMNS,
  UserState,
  TABLE_DESCRIPTION,
  TABLE_KEY,
  TABLE_NAME
} from './constant'

const TableUser = () => {
  const { setColumns, setSearchColumns } = useTable()

  const TABLE_COLUMNS: TableColumnsType<UserState> = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      sorter: true,
      showSorterTooltip: false,
      width: 400,
      ellipsis: true,
      render: (value: string) => {
        return (
          <CopyToClipboard
            text={value}
            onCopy={() => {
              message.success('Copied!')
            }}
          >
            <Button type="link">{value}</Button>
          </CopyToClipboard>
        )
      }
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'action',
      fixed: 'right',
      render: (_: string, record) => {
        return (
          <>
            <Space>
              <Edit item={record} />
              <DeleteDatatable item={record} api={API} tableName={TABLE_NAME} />
            </Space>
          </>
        )
      }
    }
  ]

  useEffect(() => {
    setColumns(TABLE_COLUMNS)
    setSearchColumns(SEARCH_COLUMNS)
  }, [])

  return (
    <>
      <Table
        tableKey={TABLE_KEY}
        tableColumns={TABLE_COLUMNS}
        api={API}
        addComponent={<Add />}
        actionComponent={<Action />}
      />
    </>
  )
}

const PageUser = () => {
  return (
    <Container>
      <Card title={TABLE_NAME} icon={<UserOutlined />} description={TABLE_DESCRIPTION}>
        <TableProvider>
          <TableUser />
        </TableProvider>
      </Card>
    </Container>
  )
}

export default PageUser
