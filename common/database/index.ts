import { Table, Column, Filter, Order } from "./interfaces";



export class QueryBuilder {
  private databaseName: string;
  private table: Table;
  private filters: Filter[];
  private order: Order[];
  private limit: number;
  private offset: number;

  database(databaseName: string) {
    this.databaseName = databaseName;
    return this;
  }

  model(model: Table) {
    this.table = model;
    return this;
  }

  take(take: number) {
    this.limit = take;
    return this;
  }
  
  skip(skip: number) {
    this.offset = skip;
    return this;
  }

  filter(filters: Filter[]){
    this.filters = filters;
    return this;
  }

  orderBy(order: Order[]){
    this.order = order;
    return this;
  }

  query() {
    
    let query = 
`
SELECT 
  ${this.getSelectColumns()}
FROM 
  ${this.getTableNameWithAlias(this.table)} 

${this.getRelatioships()}

${this.getWhere()}

${this.getOrder()}

${this.getLimit()} 

${this.getOffset()}
`;
    
    return query;
  }

  private getSelectColumns() {

    this.table.columns = this.table.columns || [];
    this.table.relationships = this.table.relationships || [];
    this.table.customColumns = this.table.customColumns || [];

    let columns = this.table.columns.map(column => {
      return this.getColumnNameWithAlias(this.table, column);
    });

    let relations = [];    
    this.table.relationships.forEach(relation => {      
      relation.model.alias = relation.alias;
      relation.model.columns.forEach(column => {
        let columnName = this.getColumnNameWithAlias(relation.model, column);
        relations.push(columnName);
      });
    });

    let customColumns = [];
    this.table.customColumns.forEach(c => {
      customColumns.push(c);
    });

    return `${columns.concat(relations).concat(customColumns).join(`, 
  `)},
  COUNT (*) OVER () AS TotalRows`;

  }
  
  private getRelatioships() {

    this.table.relationships = this.table.relationships || [];

    let joins = [];    
    this.table.relationships.forEach(relationship => {
      relationship.model.alias = relationship.alias;
      let join = `${relationship.type} JOIN ${this.getTableNameWithAlias(relationship.model)}`;
      let connectors = [];
      relationship.connectors.forEach(connector => {
        let from = this.getColumnName(this.table, connector.from);
        let to = this.getColumnName(relationship.model, connector.to);
        let joinWhere = `${from} ${connector.operator} ${to}`;
        connectors.push(joinWhere);
      });

      joins.push(` ${join} ON ${connectors.join(' AND ')}`);
    });

    if (this.table.customRelationships && this.table.customRelationships.length > 0) {
      this.table.customRelationships.forEach(cr => {
        joins.push(cr.replace(new RegExp("{{databaseName}}", 'g'), this.databaseName));
      });
    }

    return `${joins.join(`
    
`)}`;

  }

  private getOrder() {

    this.order = this.order || [];

    let orderQuery = this.order.map(o => {
        return ` ${this.getColumnName(o.tableAlias, o.columnName)} ${o.direction} `    
    });

    if (orderQuery.length > 0) {
      return `
ORDER BY     
  ${orderQuery.join(', ')}`;
    } else {
      return ``;
    }
    
  }

  private getWhere() {

    this.filters = this.filters || [];

    let where = this.filters.map(filter => {
      if (filter.columnName) {
        return ` ${this.getColumnName(filter.tableAlias, filter.columnName)} ${filter.operator} ${this.getColumnValue(filter)} `
      } else {        
        return `
${filter.operator} `;
      }
    });

    if (where.length > 0) {
      return `
WHERE 1=1         
AND ${where.join('')}`;
    } else {
      return ``;
    }
    
  }

  private getLimit() {
    if (this.limit) {
      return `LIMIT ${this.limit} `;
    } 
    else {
      return ``;
    }
  }
  
  private getOffset() {
    if (this.offset) {
      return `OFFSET ${this.offset} `;
    }
    else {
      return ``;
    }
  }

  private getColumnName(table: any, column: any) {
    let alias = typeof table === 'string' ? table : table.alias;
    let name = typeof column === 'string' ? column : column.name;
    return `${alias}."${name}"`.trim();
  }

  private getColumnNameWithAlias(model: Table, column: Column) {
    return `${this.getColumnName(model, column)} ${column.alias ? 'AS "' + column.alias + '"' : ''}`.trim();
  }

  private getTableName(model: Table) {
    return `${this.databaseName}."${model.name}"`;
  }

  private getTableNameWithAlias(model: Table) {
    return `${this.getTableName(model)} ${model.alias ? 'AS "' + model.alias + '"' : ''}`.trim();
  }
  
  private getColumnValue(filter: Filter) {
    let value;

    switch (filter.type) {
      case 'int': 
        value = parseInt(filter.value);
        break;
      case 'array': 
        value = `(${filter.value.join(',')})`;
        break;
      default:
        value = `'${filter.value}'`;
        break;
    }
    
    if (filter.operator === 'LIKE') {
      value = `'%${filter.value}%'`
    }

    return value;  

  }

}

// export function parseQuery(defaultQuery: DatabaseQuery, query: DatabaseQuery = null, propertiesMap: any = {}, valuesMap: any = {}): DatabaseQueryParts {
  
//   let newQuery: DatabaseQuery = {};

//   query = query || {};
//   if (query.filter === undefined || query.filter.length === 0) {
//     query.filter = [];
//     query.filter.push({field: '1', value: '1', operator: '='});
//   }
//   query.order = query.order || [];

//   defaultQuery = defaultQuery || {};
//   if (defaultQuery.filter === undefined || defaultQuery.filter.length === 0) {
//     defaultQuery.filter = [];
//     defaultQuery.filter.push({field: '1', value: '1', operator: '='});
//   }
//   defaultQuery.order = defaultQuery.order || [];

//   newQuery.filter = [...defaultQuery.filter, ...[{operator: 'AND'}], ...query.filter];  
//   newQuery.order = query.order || defaultQuery.order;
//   newQuery.top = query.top || defaultQuery.top || 0;
//   newQuery.skip = query.skip || defaultQuery.skip || 0;

//   let where: string = '';
//   if (newQuery.filter && newQuery.filter.length > 0) {
//     let filters = [];
//     newQuery.filter.forEach(f => {
//       let realProperty = propertiesMap[f.field] || f.field || '';
//       if (realProperty !== '') {
//         realProperty = `UPPER(${realProperty})`;
//       }
//       let realValue = (valuesMap[f.field] && valuesMap[f.field][f.value]) || f.value || '';
//       let formattedValue = realValue;
//       switch (f.type) {
//         case 'string': {          
//           formattedValue = f.operator.toUpperCase() === 'LIKE' ? `UPPER('%${realValue}%')` : `UPPER('${realValue}')`;
//           break;
//         }
           
//       }
//       filters.push(` ${realProperty} ${f.operator} ${formattedValue} `);
//     });
//     where = ` WHERE ${filters.join(' ')}`;
//   }

//   let order: string = '';
//   if (newQuery.order && newQuery.order.length > 0) {
//     let orders = [];
//     newQuery.order.forEach(f => {
//       let realProperty = propertiesMap[f.field] || f.field || '';
//       orders.push(` ${realProperty} ${f.direction} `);
//     });
//     order = ` ORDER BY ${orders.join(', ')}`;
//   }

//   return {
//     limit: ` LIMIT ${newQuery.top}`,
//     offset: ` OFFSET ${newQuery.skip}`,
//     order,
//     where
//   }

// }