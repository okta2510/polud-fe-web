
export interface AircraftType {
  id: number;
  general?: {
    image: string;
    aircraft_type: string;
    aircraft_name: string;
    serial_number: string;
    series: string;
    status: string;
    effectivity: string;
    description: string;
    authority_no: string;
    service_date: string;
    authoity: string;
  };
}

export interface ProductFiterType {
  id: number;
  filterbyTitle?: string;
  name?: string;
  sort?: string;
  icon?:  any;
  devider?: boolean;
}

export interface ProductCardProps {
  id?: string | number;
  color?: string;
  like: string;
  star: number;
  value?: string;
}
