import React, { useState, useEffect } from 'react'
import _, { map } from 'lodash'
import { Button, Space, List, Select } from 'antd'

import { useEducations } from '../../../services/jitService'
import { dynamicSortMultiple } from '../../../utils/sort'
import { ResultFailed } from '../../ResultPages'
import { EducationsView } from './styles'
import { JIT_ACTIONS } from '../../../config/constants'

const { Option } = Select

const EducationsSection = (props) => {
  const { orgId, onChangeList } = props

  const [selectedEducations, setSelectedEducations] = useState([])

  useEffect(() => {
    onChangeList(selectedEducations)
  }, [onChangeList, selectedEducations])

  const { data: educations, error } = useEducations(orgId || null)

  if (error) {
    return <ResultFailed isBackButton={false} />
  }

  const onSelectEducation = (value) => {
    const isCheck = _.findIndex(selectedEducations, { jit_id: value })

    if (isCheck === -1) {
      const newState = _.findIndex(linkedEducations, { jit_id: value })
      setSelectedEducations([...selectedEducations, linkedEducations[newState]])
    }
  }

  const onRemoveEducation = (id) => () => {
    const isSearch = _.findIndex(selectedEducations, { jit_id: id })
    const newTeam = [...selectedEducations]
    newTeam.splice(isSearch, 1)
    setSelectedEducations(newTeam)
  }

  const linkedEducations = educations?.data
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
          disabled={educations.isLoading || error}
          size="large"
          allowClear
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          onSelect={onSelectEducation}
        >
          {linkedEducations.sort(dynamicSortMultiple(['jit_name'])).map((state, index) => (
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
