import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Select, Space, Typography, notification, Switch } from 'antd'

import { createComponent, updateComponent } from '../../../services/componentService'
import CustomCkEditor from '../../CustomCkEditor/CustomCkEditor'
import ComponentForm from '../../Components/Form'
import { COMPONENT_FORM_ROLE, DOSE_UNITS, FORMULARY_UNIT } from '../../../config/constants'
import { MEDICATION_TAGS } from '../../../config/tags'
import { COMPONENTS_TYPES } from '../../../config/constants'
import { isChangedComponentForm } from '../../../utils'
import { getDuplicationMsg } from '../../../utils/names'
import { DoseSection } from './styles'
import { SwitchFormItem } from '../../CommonComponent'

const { Option } = Select
const { Text } = Typography

const ComponentMedication = (props) => {
  const { isNew, orgId, orgName, data, role, onSuccessSubmit } = props
  const navigate = useNavigate()

  const [initial] = useState({
    dose_units: DOSE_UNITS[0],
    formulary_units: FORMULARY_UNIT[0],
    ...data,
    ...data?.medication,
  })
  const [isFormChange, setIsFormChange] = useState({
    main: false,
    notes: false,
  })
  const [notes, setNotes] = useState(data?.medication?.additional_notes || '')
  const [isHaveRange, setIsHaveRange] = useState(initial?.dose_range || false)
  const [isHaveFormulary, setIsHaveFormulary] = useState(initial?.formulary || false)
  const [isLoading, setIsLoading] = useState({
    create: false,
    edit: false,
  })
  const [errorMsg, setErrorMsg] = useState('')

  const onChangeDoseRange = (checked) => {
    setIsHaveRange(checked)
  }

  const onChangeDoseFormulary = (checked) => {
    setIsHaveFormulary(checked)
  }

  const onChangeNotes = (_event, editor) => {
    const newValue = editor.getData()

    setNotes(newValue)

    if ((newValue || '') !== (data?.medication?.additional_notes || '')) {
      setIsFormChange({ ...isFormChange, notes: true })
    } else {
      setIsFormChange({ ...isFormChange, notes: false })
    }
  }

  const onCreate = (values) => {
    setErrorMsg('')

    if (values.component_content === data?.component_content) {
      setErrorMsg(getDuplicationMsg(COMPONENTS_TYPES[3].id))
      return
    }

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
        additional_notes: notes,
      },
      component_children: [],
    }

    setIsLoading({ ...isLoading, create: true })

    createComponent(payload)
      .then((res) => {
        setIsLoading({ ...isLoading, create: false })
        setIsFormChange({ main: false, notes: false })
        notification.success({
          message: 'A new medication component has been created successfully!',
        })

        if (role === COMPONENT_FORM_ROLE.ONLY_CREATE) {
          onSuccessSubmit()
        } else {
          if (res && res.data) {
            navigate(`/organizations/components/form/${COMPONENTS_TYPES[3].id}/edit`, {
              state: { ...res.data, orgId, orgName: data?.orgName },
            })
          }
        }
      })
      .catch((error) => {
        setIsLoading({ ...isLoading, create: false })

        notification.error({
          message: 'Save failed!',
          description: error?.data || '',
        })

        if (error?.status === 409) {
          setErrorMsg(error?.data || '')
        }
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
        additional_notes: notes,
      },
      component_children: [],
    }

    setIsLoading({ ...isLoading, edit: true })

    updateComponent(id, payload)
      .then(() => {
        setIsLoading({ ...isLoading, edit: false })
        setIsFormChange({ main: false, notes: false })
        notification.success({
          message: 'A new medication component has been updated successfully!',
        })
      })
      .catch((error) => {
        setIsLoading({ ...isLoading, edit: false })

        notification.error({
          message: 'Modify failed!',
          description: error?.data || '',
        })

        if (error?.status === 409) {
          setErrorMsg(error?.data || '')
        }
      })
  }

  const onChangeValue = (values, changedField) => {
    if (changedField?.name === 'component_content') setErrorMsg('')

    const defaultValue = { dose_units: 'g', formulary_units: 'g/ml' }
    const isCheck = isChangedComponentForm(
      isNew ? { ...defaultValue } : { ...data, ...(data?.medication || { ...defaultValue }) },
      values
    )

    setIsFormChange({ ...isFormChange, main: isCheck })
  }

  const onClose = () => {
    if (role === COMPONENT_FORM_ROLE.ONLY_CREATE) {
      onSuccessSubmit()
    } else {
      navigate(`/organizations/components/list`, {
        state: { orgId, orgName },
      })
    }
  }

  return (
    <ComponentForm
      isNew={isNew}
      initialValues={initial}
      isLoading={isLoading}
      orgId={orgId}
      orgName={orgName}
      isChanged={isFormChange.main || isFormChange.notes}
      onCreate={onCreate}
      onEdit={onEdit}
      onChangeValue={onChangeValue}
      onClose={onClose}
    >
      <Form.Item
        label="Content"
        name="component_content"
        hasFeedback
        rules={[{ required: true, message: 'Please input a medication name' }]}
        validateStatus={errorMsg ? 'error' : undefined}
        help={errorMsg}
      >
        <Input placeholder="Enter a section name" size="large" />
      </Form.Item>
      <Form.Item label="Dose">
        <DoseSection size="large" align="start">
          <Space direction="vertical">
            <Space>
              <SwitchFormItem
                name="dose_range"
                label="Range"
                tooltip="Does this dose have a range?"
              >
                <Switch onChange={onChangeDoseRange} checked={isHaveRange} />
              </SwitchFormItem>
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
                <Select size="middle" showArrow style={{ maxWidth: '2rem' }}>
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
              <SwitchFormItem
                name="formulary"
                label="Formulary"
                tooltip="Does this medication have a standard formulary?"
              >
                <Switch onChange={onChangeDoseFormulary} checked={isHaveFormulary} />
              </SwitchFormItem>
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
      <Form.Item
        label="Additional Notes"
        name="notes"
        className="notes"
        tooltip="Enter any additional notes on administering this medication (e.g., route, ability to repeat, etc.)"
      >
        <CustomCkEditor style={{ height: 120 }} simpleMode data={notes} onChange={onChangeNotes} />
      </Form.Item>
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
    </ComponentForm>
  )
}

export default ComponentMedication
