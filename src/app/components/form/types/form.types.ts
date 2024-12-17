export type CnaeOptionsProps={
  id: string;
  description: string;
}

export type StateProps = {
  nome: string;
  sigla: string;
}

export type CityProps = {
  id: string;
  description: string;
}

export type CityByStateProps = {
  estados:{
    sigla: string;
    cities: {
      id:string;
      nome:string;
    }[]
  }[]
}

export interface TableDataProps {
  id: string;
  cnae: string;
  estado: string;
  cidade: string;
}