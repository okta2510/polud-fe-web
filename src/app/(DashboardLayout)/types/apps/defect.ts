
export interface DefectType {
  id: number;
  general?: {
    type: string,
    defect: string,
    item: string,
    status: string,
    aircraft: string,
    chapter: string,
    section: string,
    paragrapgh: string,
    flight: string,
    gate: string,
    station: string,
    sdr_mmr: string,
    position: string,
    defect_category: string,
    defect_description: string,
    internal_capability: string,
    etops: boolean,
    rii: boolean,
    estimated_tat: string,
    hours_min: string,
    groundtime: string,
    reliability: string,
    no: string,
    letter: string,
    reported_by: string,
    reported_date: string,
    reported_hour: string,
    reported_min: string,
  };
}
