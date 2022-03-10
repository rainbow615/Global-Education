import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { debounce, map, get } from 'lodash'
import { Button, Space } from 'antd'

import { SEARCH_DELAY } from '../../../../config/constants'
import PROTOCOLS_COLUMNS from './columns'
import CustomBreadcrumb from '../../../../components/CustomBreadcrumb/CustomBreadcrumb'
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

const dataSource = [
  {
    protocol_number: 's-130',
    protocol_title: 'Allergic Reactions / Anaphylaxis',
    protocol_tags: ['Treatment', 'Allergy', 'BLS', 'ALS'],
    protocol_status: 'BUILDING',
    protocol_published: 'Never',
    protocol_updated: '01/12/2022',
    protocol_created: '01/12/2022',
  },
  {
    protocol_number: 's-131',
    protocol_title: 'Envenomation Injuries',
    protocol_tags: ['Treatment', 'Allergy', 'BLS', 'ALS'],
    protocol_status: 'INREVIEW',
    protocol_published: '01/12/2022',
    protocol_updated: '01/12/2022',
    protocol_created: '01/12/2022',
  },
  {
    protocol_number: 's-132',
    protocol_title: 'Altered Neurologic Function (Non-Traumatic)',
    protocol_tags: ['Treatment', 'Allergy', 'BLS', 'ALS'],
    protocol_status: 'READYTOPUBLISH',
    protocol_published: '01/12/2022',
    protocol_updated: '01/12/2022',
    protocol_created: '01/12/2022',
  },
  {
    protocol_number: 's-133',
    protocol_title: 'Burns',
    protocol_tags: ['Treatment', 'Allergy', 'ALS'],
    protocol_status: 'PUBLISHED',
    protocol_published: '01/12/2022',
    protocol_updated: '01/12/2022',
    protocol_created: '01/12/2022',
  },
]

const OrgProtocolsList = () => {
  const [searchText, setSearchText] = useState('')

  const onSearch = (e) => {
    setSearchText(e.target.value)
  }

  const debouncedSearchHandler = debounce(onSearch, SEARCH_DELAY)

  return (
    <React.Fragment>
      <CustomBreadcrumb items={breadCrumb} />
      <Container>
        <CustomTableHeader>
          <Space>
            <Button type="primary">
              <Link to="/organizations/protocols/form/new">Add new</Link>
            </Button>
            <Button type="primary">
              <Link to="/organizations/protocols/form/new">Approve All</Link>
            </Button>
            <Button type="primary">
              <Link to="/organizations/protocols/form/new">Publish All</Link>
            </Button>
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
          loading={false}
          pagination={{
            pageSize: 10,
          }}
        />
      </Container>
    </React.Fragment>
  )
}

export default OrgProtocolsList
