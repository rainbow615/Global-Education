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
    "You are about to delete this organization. This organization and all of its data will not be recoverable. Type 'DELETE' to confirm.",
  PUBLISHED:
    "You are publishing this organization. This will make the organization available in the MCP mobile application and bookstore. Type 'PUBLISH' to confirm.",
  UNPUBLISHED:
    "You are unpublishing this organization. This will make remove the organization from MCP mobile application and bookstore. Type 'UNPUBLISH' to confirm.",
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
    "You are about to delete this draft. It will not be recoverable after this action. Type 'DELETE' to confirm.",
  DELETE:
    "You are about to delete this Education Document. It will not be recoverable after this action. Type 'DELETE' to confirm.",
  PUBLISHED: "You are about to publish this Education Document. Type 'PUBLISH' to confirm.",
  UNPUBLISHED: "You are about to unpublish this Education Document. Type 'UNPUBLISH' to confirm.",
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
    "You are about to delete this draft. It will not be recoverable after this action. Type 'DELETE' to confirm.",
  DELETE:
    "You are about to delete this Protocol. It will not be recoverable after this action. Type 'DELETE' to confirm.",
  PUBLISHED: "You are about to publish this Protocol. Type 'PUBLISH' to confirm.",
  UNPUBLISHED: "You are about to unpublish this protocol. Type 'UNPUBLISH' to confirm.",
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

export const COMPONENTS_TYPES = [
  { id: 'section', label: 'Section' },
  { id: 'text', label: 'Text' },
  { id: 'block', label: 'Block' },
  { id: 'medication', label: 'Medication' },
  { id: 'link', label: 'Link' },
]

export const NEW_COMPONENTS_MENU = [
  {
    id: 'block',
    name: 'Add Block',
    shortKeyLabel: 'Cntl-B',
  },
  {
    id: 'medication',
    name: 'Add Medication',
    shortKeyLabel: 'Cntl-M',
  },
  {
    id: 'link',
    name: 'Add Protocol Link',
    shortKeyLabel: 'Cntl-L',
  },
  {
    id: 'text',
    name: 'Add Text',
    shortKeyLabel: 'Cntl-T',
  },
  {
    id: 'section',
    name: 'Add Section',
    shortKeyLabel: 'Cntl-s',
  },
]

export const COMPONENTS_CONFIRM_MSG = {
  DELETE:
    "You are about to delete this component. It will not be recoverable after this action. Type 'DELETE' to confirm.",
}

export const DOSE_UNITS = [
  'g',
  'g/kg',
  'inch(es)',
  'liters',
  'liters/min',
  'mcg',
  'mcg/min',
  'mcg/hr',
  'mcg/kg',
  'mcg/kg/min',
  'mcg/kg/hr',
  'metered dose',
  'mEq',
  'mEq/min',
  'mEq/hr',
  'mEq/kg',
  'mEq/kg/min',
  'mEq/kg/hr',
  'mg',
  'mg/min',
  'mg/hr',
  'mg/kg',
  'mg/kg/min',
  'mg/kg/hr',
  'ml',
  'ml/min',
  'ml/hr',
  'ml/kg/min',
  'ml/kg/hr',
  'puff(s)',
  'tabs',
  'units',
  'units/min',
  'units/hr',
  'units/kg/min',
  'units/kg/hr',
]

export const FORMULARY_UNIT = ['g/ml', 'mcg/ml', 'mEq/ml', 'mg/ml', 'units/ml']
