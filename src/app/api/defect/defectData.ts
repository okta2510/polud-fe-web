import mock from '../mock';
import { sub } from 'date-fns';
import { Chance } from 'chance';

const chance = new Chance();

const DefectData = [
  {
    id: 1,
    general: {
      type: 'PILOT',
      defect: '41324',
      item: '2',
      status: 'OPEN',
      aircraft: 'MIG-21',
      chapter: '',
      section: '',
      paragrapgh: '',
      flight: '',
      gate: '',
      station: '',
      sdr_mmr: '',
      position: '',
      defect_category: 'NORMAL',
      defect_description: 'its a ',
      internal_capability: '',
      etops: true,
      rii: true,
      estimated_tat: '',
      hours_min: '',
      groundtime: '',
      reliability: '',
      no: '',
      letter: '',
      reported_by: '',
      reported_date: '',
      reported_hour: '',
      reported_min: '',
    },
    defer: {
      type: 'TRANSFER',
      status: '',
      defer_category: 'OP',
      defer_by: '',
      defer_date: '',
      defer_hour: '',
      defer_min: '',
      mddr: 'SDF',
      class: 'GMM',
      gmm_ctl: 'MEL1',
      gmm_category: 'B',
      plan_defect: false,
      calendar_days: false,
      schedule_hours: '',
      schedule_cycles: '',
      schedule_days: '',
      defer_due_date: '',
      due_date_hour: '',
      due_date_min: '',
      capability_area: '',
      defer_note: '',
      not_allow_extention: false,
      allow_approval: false,
      allow_extention: false,
    },
    resolution: {
      category: 'TRANSFER',
      resolved_by: '',
      resolved_date: '',
      resolved_hour: '',
      resolved_min: '',
      resolved_station: '',
      ongoing_trouble: false,
      fault: 'CONFIRMED',
      res_description: '',
      work_order: '',
      task_card: '',
      item: '',
      root_cause: '',
      inspected_by: '',
      rel_srv_by: '',
      rel_srv_date: '',
      reference: '',
      fault_code1: '',
      fault_code2: '',
      fault_code3: '',
    }
  },
];




export const intialGeneral = {
  type: '',
  defect: '',
  item: '',
  status: '',
  aircraft: '',
  chapter: '',
  section: '',
  paragrapgh: '',
  flight: '',
  gate: '',
  station: '',
  sdr_mmr: '',
  position: '',
  defect_category: '',
  defect_description: '',
  internal_capability: '',
  etops: true,
  rii: true,
  estimated_tat: '',
  hours_min: '',
  groundtime: '',
  reliability: '',
  no: '',
  letter: '',
  reported_by: '',
  reported_date: '',
  reported_hour: '',
  reported_min: '',
}

export const initialDefer = {
  type: '',
  status: '',
  defer_category: '',
  defer_by: '',
  defer_date: '',
  defer_hour: '',
  defer_min: '',
  mddr: '',
  class: '',
  gmm_ctl: '',
  gmm_category: '',
  plan_defect: false,
  calendar_days: false,
  schedule_hours: '',
  schedule_cycles: '',
  schedule_days: '',
  defer_due_date: '',
  due_date_hour: '',
  due_date_min: '',
  capability_area: '',
  defer_note: '',
  not_allow_extention: false,
  allow_approval: false,
  allow_extention: false,
}

export const initialResolution = {
  category: '',
  resolved_by: '',
  resolved_date: '',
  resolved_hour: '',
  resolved_min: '',
  resolved_station: '',
  ongoing_trouble: false,
  fault: '',
  res_description: '',
  work_order: '',
  task_card: '',
  item: '',
  root_cause: '',
  inspected_by: '',
  rel_srv_by: '',
  rel_srv_date: '',
  reference: '',
  fault_code1: '',
  fault_code2: '',
  fault_code3: '',
}


export const defect_type_ops = [
  {
    value: 'PILOT',
    label: 'PILOT',
  },
  {
    value: 'MAINTENANCE',
    label: 'MAINTENANCE',
  },
  {
    value: 'CABIN',
    label: 'CABIN',
  },
];

export const defect_status_ops = [
  {
    value: 'OPEN',
    label: 'OPEN',
  },
  {
    value: 'CLOSED',
    label: 'CLOSED',
  },
];

export const defect_category_ops = [
  {
    value: 'NORMAL',
    label: 'NORMAL',
  },
  {
    value: 'URGENT',
    label: 'URGENT',
  },
  {
    value: 'AOG',
    label: 'AOG',
  },
  {
    value: 'CRITICAL',
    label: 'CRITICAL',
  },
];

export const resolution_category_ops = [
  {
    value: 'INSPECTION',
    label: 'INSPECTION',
  },
  {
    value: 'CHECKED',
    label: 'CHECKED',
  },
  {
    value: 'INSTALLATION',
    label: 'INSTALLATION',
  },
  {
    value: 'TRANSFER',
    label: 'TRANSFER',
  },
];

mock.onGet('/api/data/defect').reply(() => {
  return [200, DefectData];
});

export default DefectData;