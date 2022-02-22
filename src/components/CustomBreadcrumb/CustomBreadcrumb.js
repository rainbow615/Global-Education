import React from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'antd'

const CustomBreadcrumb = (props) => {
  const { items } = props

  return (
    <Breadcrumb separator=">">
      {items.map((item, index) => (
        <Breadcrumb.Item key={index}>
          {item.link && (
            <Link to={item.link} state={item.state || {}}>
              {item.title}
            </Link>
          )}
          {!item.link && item.title}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  )
}

export default CustomBreadcrumb
