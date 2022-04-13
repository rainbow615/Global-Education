import { Button, Dropdown } from 'antd'
import { COMPONENTS_TYPES } from '../../../config/constants'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { DownOutlined } from '@ant-design/icons'

const AddComponentButton = ({ orgId, orgName }) => (
  <Dropdown
    overlay={
      <Menu>
        {COMPONENTS_TYPES.map((type, index) => (
          <Menu.Item key={index}>
            <Link to={`/organizations/components/form/${type.id}/add`} state={{ orgId, orgName }}>
              {type.label}
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    }
    placement="bottom"
  >
    <Button type="primary">
      Add new <DownOutlined />
    </Button>
  </Dropdown>
)

export default AddComponentButton
