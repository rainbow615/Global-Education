import { JIT_ACTIONS, PROTOCOL_ACTIONS } from '../config/constants'

export const getJITStatusName = (value) => {
  let statusName = ''

  if (value === JIT_ACTIONS.PUBLISHED) statusName = 'Published'
  if (value === JIT_ACTIONS.UNPUBLISHED) statusName = 'Unpublished'
  if (value === JIT_ACTIONS.DRAFT) statusName = 'Draft'
  if (value === JIT_ACTIONS.INREVIEW) statusName = 'In-Review'
  if (value === JIT_ACTIONS.APPROVED) statusName = 'Approved'
  if (value === JIT_ACTIONS.DELETED) statusName = 'Deleted'

  return statusName
}

export const getProtocolStatusName = (value) => {
  let statusName = ''

  if (value === PROTOCOL_ACTIONS.DRAFT) statusName = 'Draft'
  if (value === PROTOCOL_ACTIONS.PUBLISHED) statusName = 'Published'
  if (value === PROTOCOL_ACTIONS.UNPUBLISHED) statusName = 'Unpublished'
  if (value === PROTOCOL_ACTIONS.INREVIEW) statusName = 'In-Review'
  if (value === PROTOCOL_ACTIONS.APPROVED) statusName = 'Approved'

  return statusName
}

export const getProtocolStatusColor = (value) => {
  let statusName = ''

  if (value === PROTOCOL_ACTIONS.DRAFT) statusName = 'danger'
  if (value === PROTOCOL_ACTIONS.PUBLISHED) statusName = 'success'
  if (value === PROTOCOL_ACTIONS.UNPUBLISHED) statusName = 'danger'
  if (value === PROTOCOL_ACTIONS.INREVIEW) statusName = 'info'
  if (value === PROTOCOL_ACTIONS.APPROVED) statusName = 'warning'

  return statusName
}

export const getProtocolButtonName = (value) => {
  let statusName = ''

  if (value === PROTOCOL_ACTIONS.DRAFT) statusName = 'Edit'
  if (value === PROTOCOL_ACTIONS.PUBLISHED) statusName = 'View'
  if (value === PROTOCOL_ACTIONS.UNPUBLISHED) statusName = 'View'
  if (value === PROTOCOL_ACTIONS.INREVIEW) statusName = 'View'
  if (value === PROTOCOL_ACTIONS.APPROVED) statusName = 'View'

  return statusName
}

export const getDuplicationMsg = (type) =>
  `A ${type} component of this type and content already exists.`
