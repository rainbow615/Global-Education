import React, { useState } from 'react'
import { Button, Form, Input, Select, Space, Typography, notification } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { useCategories, createCategory } from '../../../../services/categoryService'
import { CustomModal } from '../../../../components/CommonComponent'
import { AddNewCategoryButton } from './styles'

const { Title } = Typography
const { Option } = Select

const SelectCategory = (props) => {
  const { orgId } = props
  let formRef = React.createRef()
  const [visible, setVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { data: categories, error } = useCategories(orgId)

  const onSelectCategory = (value) => {
    console.log(`selected ${value}`)
  }

  const onToggleModal = (isShow) => () => {
    setVisible(isShow)

    if (!isShow) {
      formRef.current.resetFields()
    }
  }

  const onFinish = (values) => {
    console.log(values)
    setIsLoading(true)

    const payload = {
      organization_id: orgId,
      category_code: values.categoryCode,
      category_name: values.categoryName,
    }

    createCategory(payload)
      .then((res) => {
        onToggleModal(false)
        notification.success({ message: 'A new category has been added successfully!' })
        setVisible(false)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)

        notification.error({
          message: 'Add Failure',
          description: error?.data || '',
        })
      })
  }

  return (
    <React.Fragment>
      <Form.Item
        label="Category"
        name="category_id"
        className="category"
        hasFeedback
        rules={[{ required: true, message: 'Please select category' }]}
      >
        <Select
          size="large"
          allowClear
          showSearch
          placeholder={categories.isLoading ? 'Loading...' : 'Choose category'}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          disabled={categories.isLoading || error}
          onSelect={onSelectCategory}
        >
          {categories?.data &&
            categories.data.map((cat, index) => (
              <Option key={index} value={cat.category_id}>
                {`${cat.category_code} - ${cat.category_name}`}
              </Option>
            ))}
          <Option key="action" disabled>
            <AddNewCategoryButton icon={<PlusOutlined />} onClick={onToggleModal(true)}>
              Add new
            </AddNewCategoryButton>
          </Option>
        </Select>
      </Form.Item>

      <CustomModal visible={visible} footer={null} onCancel={onToggleModal(false)}>
        <Form ref={formRef} name="new-category-form" initialValues={{}} onFinish={onFinish}>
          <Title level={3}>Add new category</Title>
          <Form.Item
            name="categoryCode"
            hasFeedback
            rules={[{ required: true, message: 'Category code is required' }]}
          >
            <Input placeholder="Category code" />
          </Form.Item>
          <Form.Item
            name="categoryName"
            hasFeedback
            rules={[{ required: true, message: 'Category name is required' }]}
          >
            <Input placeholder="Category name" />
          </Form.Item>
          <Form.Item className="bottom-actions">
            <Space>
              <Button htmlType="button" disabled={isLoading} onClick={onToggleModal(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={isLoading}>
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
