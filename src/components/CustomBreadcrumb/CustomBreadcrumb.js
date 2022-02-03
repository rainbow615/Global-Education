import React, { useEffect, useState } from 'react'
import { Breadcrumb } from 'antd'
import { Link as RouterLink } from 'react-router-dom'

const CustomBreadcrumb = (props) => {
  const { items } = props

  return (
    <Breadcrumb separator=">">
      {items.map((item, index) => (
        <Breadcrumb.Item key={index} {...(item.link && `href="${item.link}"`)}>
          {item.title}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  )
}

export default CustomBreadcrumb
