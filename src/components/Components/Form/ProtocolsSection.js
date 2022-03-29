import { Space, List } from 'antd'

import { dynamicSortMultiple } from '../../../utils/sort'
import { ProtocolsView } from './styles'

const data = [
  {
    protocol_number: 's-100',
    protocol_name: 'Allergic Reactions / Anaphylaxis',
  },
  {
    protocol_number: 's-101',
    protocol_name: 'Envenomation injuries',
  },
  {
    protocol_number: 's-102',
    protocol_name: 'Always Obstruction',
  },
]

const ProtocolsSection = () => {
  return (
    <Space direction="vertical">
      <label>Protocols Using This Component</label>
      <ProtocolsView>
        <List
          size="small"
          dataSource={data.sort(dynamicSortMultiple(['protocol_number', 'protocol_name']))}
          renderItem={(item) => (
            <List.Item>
              {item.protocol_number} {item.protocol_name}
            </List.Item>
          )}
        />
      </ProtocolsView>
    </Space>
  )
}

export default ProtocolsSection
