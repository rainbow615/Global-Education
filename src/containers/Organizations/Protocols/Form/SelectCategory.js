import React from 'react'
import { Select } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { AddNewCategoryButton } from './styles'

const { Option } = Select

const categories = [
  {
    id: '123',
    name: '100 - Treatment protocols',
  },
]

const SelectCategory = () => {
  const onSelectCategory = (value) => {
    console.log(`selected ${value}`)
  }

  const onOpenAddNewCategory = () => {}

  return (
    <Select
      size="large"
      allowClear
      showSearch
      optionFilterProp="children"
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      onSelect={onSelectCategory}
    >
      {categories.map((cat, index) => (
        <Option key={index} value={cat.id}>
          {cat.name}
        </Option>
      ))}
      <Option key="action" disabled>
        <AddNewCategoryButton icon={<PlusOutlined />} onClick={onOpenAddNewCategory}>
          Add new
        </AddNewCategoryButton>
      </Option>
    </Select>
  )
}

export default SelectCategory
