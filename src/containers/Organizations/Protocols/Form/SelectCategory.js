import React, { useState } from 'react'
import { Button, Form, Input, Select, Space, Typography, notification } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { useCategories, createCategory } from '../../../../services/categoryService'
import { CustomModal } from '../../../../components/CommonComponent'
import { AddNewCategoryButton } from './styles'

const { Title } = Typography
const { Option } = Select

const SelectCategory = (props) => {
  const { orgId, onChange } = props
  const [catModalForm] = Form.useForm()

  const [visible, setVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const { data: categories, error, mutate } = useCategories(orgId)

  const onSelectCategory = () => {
    onChange && onChange()
  }

  const onToggleModal = (isShow) => () => {
    setVisible(isShow)

    if (!isShow) {
      catModalForm.resetFields()
      setErrorMsg('')
    }
  }

  const onFinish = (values) => {
    setIsLoading(true)
    setErrorMsg('')

    const payload = {
      organization_id: orgId,
      category_name: values.categoryName,
    }

    createCategory(payload)
      .then(() => {
        notification.success({ message: 'A new category has been added successfully!' })
        mutate()
        setIsLoading(false)
        setVisible(false)
        catModalForm.resetFields()
      })
      .catch((error) => {
        setIsLoading(false)

        if (error?.status === 500) {
          setErrorMsg(error?.data || '')
        } else {
          notification.error({
            message: 'Add Failure',
            description: error?.data || '',
          })
        }
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
                {cat.category_name}
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
        <Form form={catModalForm} name="new-category-form" initialValues={{}} onFinish={onFinish}>
          <Title level={3}>New Category</Title>
          <Form.Item
            name="categoryName"
            hasFeedback
            rules={[{ required: true, message: 'Category name is required' }]}
            validateStatus={errorMsg ? 'error' : undefined}
            help={errorMsg || null}
          >
            <Input placeholder="Category name" />
          </Form.Item>
          <Form.Item className="bottom-actions">
            <Space>
              <Button htmlType="button" disabled={isLoading} onClick={onToggleModal(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Add
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </CustomModal>
    </React.Fragment>
  )
}

export default SelectCategory
