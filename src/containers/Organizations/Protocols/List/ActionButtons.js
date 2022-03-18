import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Space } from 'antd'

const ActionButtons = (props) => {
  const { orgId } = props

  return (
    <Space>
      <Button type="primary">
        <Link to="/organizations/protocols/form/new" state={{ orgId }}>
          Add new
        </Link>
      </Button>
      <Button type="primary">Approve All</Button>
      <Button type="primary">Publish All</Button>
    </Space>
  )
}

export default ActionButtons
