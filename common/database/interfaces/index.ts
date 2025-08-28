export interface Query {
  take?: number;
  skip?: number;
  orderByField?: string; 
  orderByDirection?: string;  
}

export interface DatabaseQuery {
  filter?: Filter[],
  order?: Order[],
  take?: number,
  skip?: number
}

export interface Table {
  name: string;
  alias: string;
  columns?: Column[];
  relationships?: Relationship[];
  customColumns?: string[],
  customRelationships?: string[]
}

export interface Column {
  name: string;
  alias?: string;
  type?: string;
}

export interface Relationship {
  model: Table;
  alias: string;
  type: string;
  connectors?: RelationshipConnector[];
}

export interface RelationshipConnector {
  from: Column;
  to: Column;
  operator: string;
}

export interface Filter {
  tableAlias?: string;
  columnName?: string;
  operator: string;
  value?: any;
  type?: string;
}

export interface Order {
  tableAlias?: string;
  columnName?: string;
  direction: string;
}

