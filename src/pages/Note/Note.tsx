import Card from '@components/Card'
import ActiveDatatable from '@components/Datatable/Active/ActiveDatatable'
import DeleteDatatable from '@components/Datatable/Delete/DeleteDatatable'
import Table from '@components/Datatable/Table'
import { TableProvider, useTable } from '@contexts/TableContext'
import Container from '@layouts/Container'
import { Button, Space, TableColumnsType, Tag, message } from 'antd'
import { useEffect } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { MdOutlineEventNote } from 'react-icons/md'
import { Action, Add, Edit } from './Action'
import {
  API,
  NoteHistoryState,
  NoteState,
  SEARCH_COLUMNS,
  TABLE_DESCRIPTION,
  TABLE_KEY,
  TABLE_NAME
} from './constant'
import { APP_DOMAIN } from '@configs/index'
import moment from 'moment'

const TableNote = () => {
  const { setColumns, setSearchColumns, setState } = useTable()

  const TABLE_COLUMNS: TableColumnsType<NoteState> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
      sorter: true,
      showSorterTooltip: false,
      width: 400,
      ellipsis: true,
      render: (value: string) => {
        return (
          <CopyToClipboard
            text={`${APP_DOMAIN}/v/${value}`}
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
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
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
      title: 'Private',
      dataIndex: 'private',
      key: 'private',
      sorter: false,
      showSorterTooltip: false,
      width: 200,
      render: (_, record) => {
        return (
          <ActiveDatatable
            api={API}
            tableName={TABLE_NAME}
            item={record}
            type="private"
            setState={setState}
          />
        )
      }
    },
    {
      title: 'Histories',
      dataIndex: 'Histories',
      key: 'Histories',
      sorter: true,
      showSorterTooltip: false,
      width: 200,
      render: (value: NoteHistoryState[]) => {
        return <Button>{value.length} histories</Button>
      }
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: true,
      showSorterTooltip: false,
      width: 200,
      render: (value: string) => {
        return <Tag color="blue">{moment(value).format('DD/MM/YYYY HH:mm:ss')}</Tag>
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

const PageNote = () => {
  return (
    <Container>
      <Card title={TABLE_NAME} icon={<MdOutlineEventNote />} description={TABLE_DESCRIPTION}>
        <TableProvider>
          <TableNote />
        </TableProvider>
      </Card>
    </Container>
  )
}

export default PageNote
