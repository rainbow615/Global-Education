import React, { useState } from 'react'
import _ from 'lodash'
import { Button, Space, List, Select } from 'antd'

import { EducationsView } from './styles'

const { Option } = Select

const linkedEducations = [
  {
    jit_id: 'b85e5e33',
    jit_name: 'Education 1',
  },
  {
    jit_id: 'b85e5e34',
    jit_name: 'Education 2',
  },
  {
    jit_id: 'b85e5e35',
    jit_name: 'Education 3',
  },
]

const EducationsSection = () => {
  const [selectedEducations, setSelectedEducations] = useState([])

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

  return (
    <Space direction="vertical">
      <label>Linked Education</label>
      <EducationsView>
        <Select
          className="search-educations"
          placeholder="Search teams"
          size="large"
          allowClear
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          onSelect={onSelectEducation}
        >
          {linkedEducations.map((state, index) => (
            <Option key={index} value={state.jit_id}>
              {state.jit_name}
            </Option>
          ))}
        </Select>
        <List
          size="small"
          dataSource={selectedEducations}
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
