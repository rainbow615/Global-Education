import React from 'react'
import { List, Button } from 'antd'

import { PaymentSection, PaymentList } from './styles'

const paymentList = [
  {
    type: 'Visa',
    number: 'xxxx-4321',
    expDate: '02/12',
  },
  {
    type: 'Mastercard',
    number: 'xxxx-4321',
    expDate: '03/22',
  },
]

const PaymentMethod = () => {
  return (
    <PaymentSection>
      <div className="payment-header">
        <div>
          <div className="section-label">Feature Candidate</div>
          <div className="payment-label">Payment</div>
        </div>
        <Button size="small">Add payment method</Button>
      </div>
      <PaymentList
        itemLayout="horizontal"
        dataSource={paymentList}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button type="link" danger size="small">
                Remove
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={`${item.type} ${item.number}`}
              description={`Exp. ${item.date}`}
            />
          </List.Item>
        )}
      />
    </PaymentSection>
  )
}

export default PaymentMethod
