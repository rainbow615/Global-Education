import React from 'react'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/CustomBreadcrumb'
import { Container } from '../../../components/CommonComponent'
import {
  CardBottom,
  ComponentType,
  CustomCard,
  CustomTable,
  DashboardContainer,
  DashboardHeader,
  EditIcon,
} from './styles'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button, Card, Space, Typography } from 'antd'
import { ArrowsAltOutlined, EditOutlined, EditTwoTone } from '@ant-design/icons'
import { useProtocols } from '../../../services/protocolService'
import { ResultFailed } from '../../../components/ResultPages'
import {
  getJITStatusName,
  getProtocolStatusColor,
  getProtocolStatusName,
} from '../../../utils/names'
import CopyTooltip from '../Protocols/List/CopyTooltip'
import { useEducations } from '../../../services/jitService'
import { useComponents } from '../../../services/componentService'
import AddComponentButton from '../../../components/Components/AddComponentButton'
import { returnLinks } from '../Protocols/List/columns'
import { getEducationReturnLinks } from '../../../components/Education/List/columns'

const Dashboard = () => {
  const { state } = useLocation()

  const navigate = useNavigate()

  const { data: protocols, error: protocolError } = useProtocols(state.id)

  const { data: education, error: educationError } = useEducations(state.id)

  const { data: components, error: componentError } = useComponents(state.id)

  const error = protocolError || educationError || componentError

  const protocolsDataSource = protocols?.data?.slice(0, 9)
  const educationDataSource = education?.data?.slice(0, 9)
  const componentsDataSource = components?.data?.slice(0, 9)

  if (error) {
    return <ResultFailed isBackButton={false} />
  }

  const breadCrumb = [
    {
      title: 'Organizations',
      link: '/organizations',
    },
    {
      title: state.name,
    },
    {
      title: 'Dashboard',
    },
  ]

  function generateLinkProps(to) {
    return {
      to,
      state: { orgId: state.id, orgName: state.name },
    }
  }

  return (
    <React.Fragment>
      <CustomBreadcrumb items={breadCrumb} />
      <DashboardHeader wrap={true} size="middle" align="center">
        <h1>{state.name}</h1>
        <Link to="/organizations/form/edit" state={{ id: state.id, name: state.name }}>
          <EditIcon />
        </Link>
      </DashboardHeader>
      <DashboardContainer>
        <CustomCard
          title="Protocols"
          extra={
            <Link {...generateLinkProps('/organizations/protocols/list')}>
              <ArrowsAltOutlined />
            </Link>
          }
        >
          <CustomTable
            pagination={false}
            showHeader={false}
            scroll={true}
            rowKey="protocol_id"
            loading={protocols.isLoading}
            dataSource={protocolsDataSource}
            onRow={(record) => ({
              onClick: () =>
                navigate(returnLinks[record.status], {
                  state: {
                    orgId: state.id,
                    orgName: state.name,
                  },
                }),
            })}
            columns={[
              {
                title: 'Number',
                dataIndex: 'protocol_number',
                key: 'protocol_number',
                width: 100,
              },
              {
                title: 'Name',
                dataIndex: 'protocol_name',
                key: 'protocol_name',
                render: (value, record) => <CopyTooltip value={value} record={record} />,
              },
              {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                width: 100,
                render: (value) => (
                  <Typography.Text type={getProtocolStatusColor(value)}>
                    {getProtocolStatusName(value)}
                  </Typography.Text>
                ),
              },
            ]}
          />
          <CardBottom>
            <Button type="primary">
              <Link
                to="/organizations/protocols/form/new"
                state={{ orgId: state.id, orgName: state.name }}
              >
                Add new
              </Link>
            </Button>
          </CardBottom>
        </CustomCard>
        <CustomCard
          title="Education"
          extra={
            <Link {...generateLinkProps('/organizations/local-education/list')}>
              <ArrowsAltOutlined />
            </Link>
          }
        >
          <CustomTable
            pagination={false}
            showHeader={false}
            scroll={true}
            rowKey="jit_id"
            onRow={(record) => ({
              onClick: () =>
                navigate(getEducationReturnLinks(false)[record.status], {
                  state: {
                    orgId: state.id,
                    orgName: state.name,
                  },
                }),
            })}
            loading={education.isLoading}
            dataSource={educationDataSource}
            columns={[
              {
                title: 'Name',
                dataIndex: 'jit_name',
                key: 'jit_name',
                render: (value, record) => <CopyTooltip value={value} record={record} />,
              },
              {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                width: 100,
                render: (value) => (
                  <Typography.Text type={getProtocolStatusColor(value)}>
                    {getJITStatusName(value)}
                  </Typography.Text>
                ),
              },
            ]}
          />
          <CardBottom>
            <Button type="primary">
              <Link
                to="/organizations/local-education/form/new"
                state={{ orgId: state.id, orgName: state.name }}
              >
                Add new
              </Link>
            </Button>
          </CardBottom>
        </CustomCard>
        <CustomCard
          title="Components"
          extra={
            <Link {...generateLinkProps('/organizations/components/list')}>
              <ArrowsAltOutlined />
            </Link>
          }
        >
          <CustomTable
            pagination={false}
            rowKey="component_id"
            scroll={true}
            showHeader={false}
            loading={components.isLoading}
            onRow={(record) => ({
              onClick: () => {
                navigate(`/organizations/components/form/${record.component_type}/edit`, {
                  state: { ...record, orgId: state.id, orgName: state.name },
                })
              },
            })}
            dataSource={componentsDataSource}
            columns={[
              {
                title: 'Type',
                dataIndex: 'component_type',
                key: 'component_type',
                width: 10,
                render: (value) => <ComponentType>{value[0].toUpperCase()}</ComponentType>,
              },
              {
                title: 'Content',
                dataIndex: 'component_content',
                key: 'component_content',
                render: (value) => <div dangerouslySetInnerHTML={{ __html: value }} />,
              },
              {
                title: 'Usage Amount',
                dataIndex: 'backref',
                key: 'backref',
                render: (value) => (
                  <Typography.Text type="success">{value ? value.length : 0}</Typography.Text>
                ),
              },
              {
                title: 'Linked Education',
                dataIndex: 'linked_education',
                key: 'linked_education',
                render: (value) => (
                  <Typography.Text type="secondary">{value ? value.length : 0}</Typography.Text>
                ),
              },
            ]}
          />
          <CardBottom>
            <AddComponentButton orgId={state.id} orgName={state.name} />
          </CardBottom>
        </CustomCard>
        <Card title="Activity"></Card>
      </DashboardContainer>
    </React.Fragment>
  )
}

export default Dashboard
