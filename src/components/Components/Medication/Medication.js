import React, { useState } from 'react'
import { Form, Input, Select, Space, Typography, Row, Col } from 'antd'
import Switch from 'react-switch'

import CustomCkEditor from '../../CustomCkEditor/CustomCkEditor'
import ComponentForm from '../../Components/Form'
import { DOSE_UNIT } from '../../../config/constants'
import { MEDICATION_TAGS } from '../../../config/tags'
import { DoseSection } from './styles'

const { Option } = Select
const { Text } = Typography

const ComponentMedication = () => {
  const [initial] = useState({ unit: DOSE_UNIT[0] })
  const [isHaveRange, setIsHaveRange] = useState(false)
  const [isHaveFormulary, setIsHaveFormulary] = useState(false)

  const onChangeDoseRange = (checked) => {
    setIsHaveRange(checked)
  }

  const onChangeDoseFormulary = (checked) => {
    setIsHaveFormulary(checked)
  }

  return (
    <ComponentForm initialValues={initial}>
      <Form.Item
        label="Content"
        name="name"
        hasFeedback
        rules={[{ required: true, message: 'Please input a medication name' }]}
      >
        <Input placeholder="Enter a section name" size="large" />
      </Form.Item>
      <Form.Item label="Dose">
        <DoseSection size="large">
          <Space direction="vertical">
            <Space>
              <Switch onChange={onChangeDoseRange} checked={isHaveRange} />
              <i>Does this dose have a range?</i>
            </Space>
            <Space>
              <Space>
                <Form.Item name="range">
                  <Input size="middle" />
                </Form.Item>
                {isHaveRange && (
                  <React.Fragment>
                    <Text>{` to `}</Text>
                    <Form.Item name="range">
                      <Input size="middle" />
                    </Form.Item>
                  </React.Fragment>
                )}
              </Space>

              <Form.Item name="unit">
                <Select size="middle" showArrow>
                  {DOSE_UNIT.map((unit, index) => (
                    <Option key={index} value={unit} label={unit}>
                      {unit}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Space>
          </Space>
          <Space direction="vertical">
            <Space>
              <Switch onChange={onChangeDoseFormulary} checked={isHaveFormulary} />
              <i>Does this medication have a standard formulary?</i>
            </Space>
            <Space>
              <Text disabled={!isHaveFormulary}>{`Conc. `}</Text>
              <Form.Item name="range">
                <Input size="middle" disabled={!isHaveFormulary} />
              </Form.Item>
              <Text disabled={!isHaveFormulary}>{` mcg/ml`}</Text>
            </Space>
          </Space>
        </DoseSection>
      </Form.Item>
      <Form.Item label="Additional Notes" name="notes" className="notes">
        <CustomCkEditor
          simpleMode
          data={''}
          placeholder="Enter any additional notes on administering this medication (e.g., route, ability to repeat, etc.)"
        />
      </Form.Item>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            label="Tags"
            name="tags"
            hasFeedback
            rules={[{ required: true, message: 'Please select 1 or more tag.' }]}
          >
            <Select
              mode="multiple"
              size="large"
              allowClear
              showSearch
              showArrow
              optionLabelProp="label"
              filterSort={(optionA, optionB) =>
                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
              }
            >
              {MEDICATION_TAGS.map((tag, index) => (
                <Option key={index} value={tag} label={tag}>
                  {tag}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </ComponentForm>
  )
}

export default ComponentMedication
