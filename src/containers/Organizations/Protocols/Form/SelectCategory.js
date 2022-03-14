import React, { useState } from 'react'
import { Button, Form, Input, Select, Space, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { useCategories } from '../../../../services/categoryService'
import { CustomModal } from '../../../../components/CommonComponent'
import { AddNewCategoryButton } from './styles'

const { Title } = Typography
const { Option } = Select

const SelectCategory = (props) => {
  const { orgId } = props
  const [visible, setVisible] = useState(false)

  const { data: categories, error } = useCategories(orgId)

  const onSelectCategory = (value) => {
    console.log(`selected ${value}`)
  }

  const onFinish = (values) => {
    console.log(values)
  }

  return (
    <React.Fragment>
      <Select
        size="large"
        allowClear
        showSearch
        placeholder={categories.isLoading ? 'Loading...' : 'Choose category'}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        disabled={categories.isLoading}
        onSelect={onSelectCategory}
      >
        {categories?.data &&
          categories.data.map((cat, index) => (
            <Option key={index} value={cat.category_id}>
              {`${cat.category_code} - ${cat.category_name}`}
            </Option>
          ))}
        <Option key="action" disabled>
          <AddNewCategoryButton icon={<PlusOutlined />} onClick={() => setVisible(true)}>
            Add new
          </AddNewCategoryButton>
        </Option>
      </Select>
      <CustomModal visible={visible} footer={null} onCancel={() => setVisible(false)}>
        <Form name="new-category-form" initialValues={{}} onFinish={onFinish}>
          <Title level={3}>Add new category</Title>
          <Form.Item
            name="categoryName"
            hasFeedback
            rules={[{ required: true, message: 'Category name is required' }]}
          >
            <Input placeholder="Category name" />
          </Form.Item>
          <Form.Item className="bottom-actions">
            <Space>
              <Button htmlType="button" onClick={() => setVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={false}>
                Finish
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </CustomModal>
    </React.Fragment>
  )
}

export default SelectCategory
