import React, { useState, useEffect, useMemo } from 'react'
import _, { map } from 'lodash'
import { Button, Space, List, Select } from 'antd'

import { useEducations } from '../../../services/jitService'
import { dynamicSortMultiple } from '../../../utils/sort'
import { ResultFailed } from '../../ResultPages'
import { EducationsView } from './styles'
import { JIT_ACTIONS } from '../../../config/constants'

const { Option } = Select

const EducationsSection = (props) => {
  const { orgId, data, onChangeList } = props

  const [selectedEducations, setSelectedEducations] = useState([])

  const { data: global, error: globalError } = useEducations(null)
  const { data: local, error: localError } = useEducations(orgId)

  const educations = useMemo(
    () => ({
      data: [...(global?.data || []), ...(local?.data || [])],
      isLoading: global?.isLoading || local?.isLoading,
    }),
    [global, local]
  )

  useEffect(() => {
    if (data.length > 0 && educations?.data && educations?.data.length > 0) {
      const defaultEducations = map(educations.data, (record) => {
        if (data.indexOf(record.jit_id) < 0) return null
        return record
      }).filter((record) => !!record)
      setSelectedEducations(defaultEducations)
    }
  }, [data, educations])

  if (globalError || localError) {
    return <ResultFailed isBackButton={false} />
  }

  const onSelectEducation = (value) => {
    const isCheck = _.findIndex(selectedEducations, { jit_id: value })

    if (isCheck === -1) {
      const newState = _.findIndex(orgEducations, { jit_id: value })
      const newList = [...selectedEducations, orgEducations[newState]]
      setSelectedEducations(newList)
      onChangeList(newList)
    }
  }

  const onRemoveEducation = (id) => () => {
    const isSearch = _.findIndex(selectedEducations, { jit_id: id })
    const newList = [...selectedEducations]
    newList.splice(isSearch, 1)
    setSelectedEducations(newList)
    onChangeList(newList)
  }

  const orgEducations = educations?.data
    ? map(educations.data, (record, index) => {
        if (record.status !== JIT_ACTIONS.PUBLISHED) return null
        return record
      }).filter((record) => !!record)
    : []

  return (
    <Space direction="vertical">
      <label>Linked Education</label>
      <EducationsView>
        <Select
          className="search-educations"
          placeholder={educations.isLoading ? 'Loading...' : 'Search teams'}
          disabled={educations.isLoading}
          size="large"
          allowClear
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          onSelect={onSelectEducation}
        >
          {orgEducations.sort(dynamicSortMultiple(['jit_name'])).map((state, index) => (
            <Option key={index} value={state.jit_id}>
              {state.jit_name}
            </Option>
          ))}
        </Select>
        <List
          size="small"
          dataSource={selectedEducations.sort(dynamicSortMultiple(['jit_name']))}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button type="link" size="small" danger onClick={onRemoveEducation(item.jit_id)}>
                  Remove
                </Button>,
              ]}
            >
              <List.Item.Meta title={item.jit_name} />
            </List.Item>
          )}
        />
      </EducationsView>
    </Space>
  )
}

export default EducationsSection
