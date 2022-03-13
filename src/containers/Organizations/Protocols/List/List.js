import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { debounce, map, get } from 'lodash'
import { Button, Space } from 'antd'

import { useProtocols } from '../../../../services/protocolService'
import { formatLocalizedDate, regExpEscape } from '../../../../utils'
import { SEARCH_DELAY } from '../../../../config/constants'
import PROTOCOLS_COLUMNS from './columns'
import CustomBreadcrumb from '../../../../components/CustomBreadcrumb/CustomBreadcrumb'
import { ResultFailed } from '../../../../components/ResultPages'
import {
  Container,
  CustomTable,
  CustomTableHeader,
  CustomSearchText,
} from '../../../../components/CommonComponent'

const breadCrumb = [
  {
    title: 'Organizations',
    link: '/organizations/list',
  },
  {
    title: 'Protocols',
  },
  {
    title: 'List',
  },
]

// const dataSource = [
//   {
//     key: 1,
//     protocol_number: 's-130',
//     protocol_title: 'Allergic Reactions / Anaphylaxis',
//     protocol_tags: ['Treatment', 'Allergy', 'BLS', 'ALS'],
//     protocol_status: 'BUILDING',
//     protocol_published: 'Never',
//     protocol_updated: '01/12/2022',
//     protocol_created: '01/12/2022',
//   },
//   {
//     key: 2,
//     protocol_number: 's-131',
//     protocol_title: 'Envenomation Injuries',
//     protocol_tags: ['Treatment', 'Allergy', 'BLS', 'ALS'],
//     protocol_status: 'INREVIEW',
//     protocol_published: '01/12/2022',
//     protocol_updated: '01/12/2022',
//     protocol_created: '01/12/2022',
//   },
//   {
//     key: 3,
//     protocol_number: 's-132',
//     protocol_title: 'Altered Neurologic Function (Non-Traumatic)',
//     protocol_tags: ['Treatment', 'Allergy', 'BLS', 'ALS'],
//     protocol_status: 'READYTOPUBLISH',
//     protocol_published: '01/12/2022',
//     protocol_updated: '01/12/2022',
//     protocol_created: '01/12/2022',
//   },
//   {
//     key: 4,
//     protocol_number: 's-133',
//     protocol_title: 'Burns',
//     protocol_tags: ['Treatment', 'Allergy', 'ALS'],
//     protocol_status: 'PUBLISHED',
//     protocol_published: '01/12/2022',
//     protocol_updated: '01/12/2022',
//     protocol_created: '01/12/2022',
//   },
// ]

const OrgProtocolsList = (props) => {
  const { orgId } = props
  const [searchText, setSearchText] = useState('')

  const { data: protocols, error } = useProtocols(orgId)

  if (error) {
    return <ResultFailed isBackButton={false} />
  }

  const onSearch = (e) => {
    setSearchText(e.target.value)
  }

  const debouncedSearchHandler = debounce(onSearch, SEARCH_DELAY)

  const dataSource = protocols?.data
    ? map(protocols.data, (record, index) => {
        const _record = {
          key: index + 1,
          ...record,
          orgId,
          created_date: formatLocalizedDate(record.created_date),
          modified_date: formatLocalizedDate(record.modified_date),
          last_published_date: record.last_published_date
            ? formatLocalizedDate(record.last_published_date)
            : 'Never',
        }

        if (searchText) {
          const reg = new RegExp(regExpEscape(searchText), 'gi')
          const nameMatch = get(_record, 'protocol_name').match(reg)
          const statusMatch = get(_record, 'status').match(reg)
          const numberMatch = get(_record, 'protocol_number').match(reg)
          let tagMatch = false

          for (let i = 0; i < record?.tags.length; i++) {
            const tag = record?.tags[i] || ''
            if (tag.match(reg)) {
              tagMatch = true
              break
            }
          }

          if (!numberMatch && !nameMatch && !statusMatch && !tagMatch) {
            return null
          }
        }

        return _record
      }).filter((record) => !!record)
    : []

  return (
    <React.Fragment>
      <CustomBreadcrumb items={breadCrumb} />
      <Container>
        <CustomTableHeader>
          <Space>
            <Button type="primary">
              <Link to="/organizations/protocols/form/new" state={{ orgId }}>
                Add new
              </Link>
            </Button>
            <Button type="primary">Approve All</Button>
            <Button type="primary">Publish All</Button>
          </Space>
          <CustomSearchText
            placeholder="Search"
            enterButton
            allowClear
            onChange={debouncedSearchHandler}
            onPressEnter={debouncedSearchHandler}
          />
        </CustomTableHeader>
        <CustomTable
          dataSource={dataSource}
          columns={PROTOCOLS_COLUMNS}
          loading={protocols.isLoading}
          pagination={{
            pageSize: 10,
          }}
        />
      </Container>
    </React.Fragment>
  )
}

export default OrgProtocolsList
