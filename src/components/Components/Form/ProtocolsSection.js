import { Space, List } from 'antd'

import { dynamicSortMultiple } from '../../../utils/sort'
import { ProtocolsView } from './styles'

const data = []

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
