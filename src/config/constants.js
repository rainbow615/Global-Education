export const TOP_HEADER_HEIGHT = 70
export const MOBILE_SIZE = 760
export const SEARCH_DELAY = 800
export const AUTO_SAVE_DELAY = 1000

export const CONTACTS_TOPIC = [
  {
    id: 'bulk_order',
    name: 'Bulk orders',
  },
  {
    id: 'request_registration',
    name: 'Request Registration',
  },
  {
    id: 'request_licenses',
    name: 'Request licenses',
  },
]

export const TYPES = [
  {
    id: 'EMS',
    name: 'EMS',
  },
  {
    id: 'Fire',
    name: 'Fire',
  },
  {
    id: 'Law',
    name: 'Law',
  },
]

export const ORG_ACTIONS = {
  DELETE: 'DELETE',
  PUBLISHED: 'PUBLISHED',
  UNPUBLISHED: 'UNPUBLISHED',
}

export const ORG_CONFIRM_MSG = {
  DELETE:
    "You are deleting this organization. This organization and all of its data will not be recoverable. Type 'DELETE' to confirm.",
  PUBLISHED:
    "You are publishing this organization. This will make the organization available in the MCP mobile application and bookstore. Type 'PUBLISH' to confirm.",
  UNPUBLISHED:
    "You are unpublishing this organization. This will make the organization no longer available in the MCP mobile application and bookstore. Type 'UNPUBLISH' to confirm.",
}

export const JIT_ACTIONS = {
  DELETE: 'DELETE',
  DELETED: 'DELETED',
  PUBLISHED: 'PUBLISHED',
  UNPUBLISHED: 'UNPUBLISHED',
  DRAFT: 'DRAFT',
  INREVIEW: 'INREVIEW',
  APPROVED: 'APPROVED',
}

export const JIT_CONFIRM_MSG = {
  DELETE_DRAFT:
    "You are deleting this draft. This draft will not be recoverable. Type 'DELETE' to confirm.",
  DELETE: "You are deleting this JIT Education. Type 'DELETE' to confirm.",
  PUBLISHED: "You are publishing this JIT Education. Type 'PUBLISH' to confirm.",
  UNPUBLISHED: "You are unpublishing this JIT Education. Type 'UNPUBLISH' to confirm.",
}

export const PROTOCOL_ACTIONS = {
  DRAFT: 'DRAFT',
  UNPUBLISHED: 'UNPUBLISHED',
  INREVIEW: 'INREVIEW',
  APPROVED: 'APPROVED',
  PUBLISHED: 'PUBLISHED',
  DELETE: 'DELETE',
}

export const PROTOCOLS_CONFIRM_MSG = {
  DELETE_DRAFT:
    "You are deleting this draft. This draft will not be recoverable. Type 'DELETE' to confirm.",
  DELETE: "You are deleting this protocol. Type 'DELETE' to confirm.",
  PUBLISHED: "You are publishing this protocol. Type 'PUBLISH' to confirm.",
  UNPUBLISHED: "You are unpublishing this protocol. Type 'UNPUBLISH' to confirm.",
}

export const DIFF_VIEW_STYLES = {
  variables: {
    light: {
      codeFoldGutterBackground: '#6F767E',
      codeFoldBackground: '#E2E4E5',
      diffViewerTitleBackground: '#f0f2f5',
      diffViewerTitleColor: '#1f2532',
    },
  },
}

export const COMPONENTS_TYPES = ['Sections', 'Texts', 'Blocks', 'Medications', 'Links']
