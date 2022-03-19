import React, { useState } from 'react'
import { debounce, map, get } from 'lodash'

import { useProtocols } from '../../../../services/protocolService'
import { formatLocalizedDate, regExpEscape } from '../../../../utils'
import { SEARCH_DELAY } from '../../../../config/constants'
import PROTOCOLS_COLUMNS from './columns'
import CustomBreadcrumb from '../../../../components/CustomBreadcrumb/CustomBreadcrumb'
import ActionButtons from './ActionButtons'
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

const OrgProtocolsList = (props) => {
  const { orgId } = props
  const [searchText, setSearchText] = useState('')

  const { data: protocols, error, mutate } = useProtocols(orgId)

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
            : null,
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
          <ActionButtons orgId={orgId} data={protocols?.data} mutate={mutate} />
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
