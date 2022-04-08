import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Select, Space, Typography, Row, Col, notification } from 'antd'
import Switch from 'react-switch'

import { createComponent, updateComponent } from '../../../services/componentService'
import CustomCkEditor from '../../CustomCkEditor/CustomCkEditor'
import ComponentForm from '../../Components/Form'
import { DOSE_UNITS, FORMULARY_UNIT } from '../../../config/constants'
import { MEDICATION_TAGS } from '../../../config/tags'
import { COMPONENTS_TYPES } from '../../../config/constants'
import { DoseSection } from './styles'

const { Option } = Select
const { Text } = Typography

const ComponentMedication = (props) => {
  const { isNew, orgId, data } = props
  const navigate = useNavigate()

  const [initial] = useState({
    dose_units: DOSE_UNITS[0],
    formulary_units: FORMULARY_UNIT[0],
    ...data,
    ...data?.medication,
  })
  const [notes, setNotes] = useState(data?.notes || '')
  const [isHaveRange, setIsHaveRange] = useState(initial?.dose_range || false)
  const [isHaveFormulary, setIsHaveFormulary] = useState(initial?.formulary || false)
  const [isLoading, setIsLoading] = useState({
    create: false,
    edit: false,
  })

  const onChangeDoseRange = (checked) => {
    setIsHaveRange(checked)
  }

  const onChangeDoseFormulary = (checked) => {
    setIsHaveFormulary(checked)
  }

  const onCreate = (values) => {
    const payload = {
      organization_id: orgId,
      parent_id: null,
      component_type: COMPONENTS_TYPES[3].id,
      tags: values.tags || [],
      component_content: values.component_content,
      is_ordered: false,
      component_order: 1,
      linked_protocol: [],
      linked_education: values.linked_education,
      medication: {
        dose_range: isHaveRange,
        dose_min: +values.dose_min,
        dose_max: +values.dose_max,
        dose_units: values.dose_units,
        formulary: isHaveFormulary,
        formulary_conc: +values.formulary_conc,
        formulary_units: values.formulary_units,
      },
      component_children: [],
    }

    setIsLoading({ ...isLoading, create: true })

    createComponent(payload)
      .then((res) => {
        setIsLoading({ ...isLoading, create: false })
        notification.success({
          message: 'A new medication component has been created successfully!',
        })

        if (res && res.data) {
          navigate(`/organizations/components/form/${COMPONENTS_TYPES[3].id}/edit`, {
            state: { ...res.data, orgId, orgName: data.orgName },
          })
        }
      })
      .catch((error) => {
        setIsLoading(false)

        notification.error({
          message: 'Save failed!',
          description: error?.data || '',
        })
      })
  }

  const onEdit = (values) => {
    const id = values.component_id
    const payload = {
      organization_id: orgId,
      parent_id: values.parent_id,
      component_type: COMPONENTS_TYPES[3].id,
      tags: values.tags,
      component_content: values.component_content,
      is_ordered: false,
      component_order: values.component_order,
      linked_protocol: values.linked_protocol,
      linked_education: values.linked_education,
      medication: {
        dose_range: isHaveRange,
        dose_min: +values.dose_min,
        dose_max: +values.dose_max,
        dose_units: values.dose_units,
        formulary: isHaveFormulary,
        formulary_conc: +values.formulary_conc,
        formulary_units: values.formulary_units,
      },
      component_children: [],
    }

    setIsLoading({ ...isLoading, edit: true })

    updateComponent(id, payload)
      .then(() => {
        setIsLoading({ ...isLoading, edit: false })
        notification.success({
          message: 'A new medication component has been updated successfully!',
        })
      })
      .catch((error) => {
        setIsLoading(false)

        notification.error({
          message: 'Modify failed!',
          description: error?.data || '',
        })
      })
  }

  return (
    <ComponentForm
      isNew={isNew}
      initialValues={initial}
      isLoading={isLoading}
      orgId={orgId}
      onCreate={onCreate}
      onEdit={onEdit}
    >
      <Form.Item
        label="Content"
        name="component_content"
        hasFeedback
        rules={[{ required: true, message: 'Please input a medication name' }]}
      >
        <Input placeholder="Enter a section name" size="large" />
      </Form.Item>
      <Form.Item label="Dose">
        <DoseSection size="large" align="start">
          <Space direction="vertical">
            <Space>
              <Switch onChange={onChangeDoseRange} checked={isHaveRange} />
              <i>Does this dose have a range?</i>
            </Space>
            <Space align="start">
              <Space align="start">
                {isHaveRange && (
                  <React.Fragment>
                    <Form.Item
                      name="dose_min"
                      hasFeedback
                      rules={[{ required: true, message: 'Please input a min value' }]}
                    >
                      <Input size="middle" />
                    </Form.Item>
                    <Text>{` to `}</Text>
                  </React.Fragment>
                )}
                <Form.Item
                  name="dose_max"
                  hasFeedback
                  rules={[{ required: true, message: 'Please input a max value' }]}
                >
                  <Input size="middle" />
                </Form.Item>
              </Space>

              <Form.Item name="dose_units" hasFeedback>
                <Select size="middle" showArrow>
                  {DOSE_UNITS.map((unit, index) => (
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
              <Form.Item name="formulary_conc" hasFeedback>
                <Input size="middle" disabled={!isHaveFormulary} />
              </Form.Item>
              <Form.Item name="formulary_units" hasFeedback>
                <Select size="middle" showArrow disabled={!isHaveFormulary}>
                  {FORMULARY_UNIT.map((unit, index) => (
                    <Option key={index} value={unit} label={unit}>
                      {unit}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Space>
          </Space>
        </DoseSection>
      </Form.Item>
      <Form.Item label="Additional Notes" name="notes" className="notes">
        <CustomCkEditor
          simpleMode
          data={notes}
          placeholder="Enter any additional notes on administering this medication (e.g., route, ability to repeat, etc.)"
          onChange={(_event, editor) => {
            setNotes(editor.getData())
          }}
        />
      </Form.Item>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Tags" name="tags">
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
