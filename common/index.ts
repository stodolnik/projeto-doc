import { isNumber } from "lodash";
import * as moment from "moment";

export interface ODataQuery<T> {
  filter?: T,
  select?: T,
  expand?: T,
  orderBy?: T,
  top?: number,
  skip?: number
}

export const formatDate = (date: string, format: string) => {

    if (!date || date !== "") {
      const validFormats = ['YYYY-MM-DDTHH:mm:ss.SSSSZ', 'DD/MM/YYYY', 'YYYY/MM/DD'];
      let formattedDate = moment(date, validFormats);
      if (formattedDate.isValid()){
        return formattedDate.format(format);
      } 
      else {
        return null;
      }      
    } 
    else {
      return null;
    }    

}

export const parseQuery = (query: ODataQuery<any> = {}, propertiesMap: Object = {}, valuesMap: Object = {}) => {

  const parseValue = (value, type) => {
    
    Object.keys(value).forEach(k => {
      switch (type){
        case 'date': {
          value[k] = moment(value[k], 'DD/MM/YYYY').format('YYYY-MM-DD');
          break;
        }
        case 'number': {          
          value[k] = parseInt(value[k]);
          break;
        }
      }
    });

    return value;
    
  }
  const objectMapper = (source: any) => {    
    let ret = {};
    if (source) {
      Object.keys(source).forEach((k: string) => {

        let propMap = propertiesMap[k];
        let originalValue = source[k];
        let type = 'string';

        if (typeof originalValue == 'object' && originalValue.length > 0) {
          ret[k] = originalValue.map(o => objectMapper(o));
        }
        else {
          if (originalValue.type){
            type = originalValue.type;
            delete originalValue.type;
          }
  
          if (propMap) {
            let valMap = valuesMap[k];
            if (valMap) {
              ret[propMap] = valMap[source[k].toString()];
            } else {
              ret[propMap] = parseValue(originalValue, type);
            }          
          } else {
            ret[k] = parseValue(originalValue, type);
          }
        }

        
      });
    }    
    return ret;
  }

  const stringMapper = (source: any) => {
    if (source && typeof source === 'string') {
      let key = source.replace('asc','').replace('desc','').trim();
      let propMap = propertiesMap[key];
      if (propMap) {
        return source.replace(key, propMap); 
      } else {
        return source;
      }
    } else {
      return null;
    }
  }

  query.filter = objectMapper(query.filter);
  query.orderBy = stringMapper(query.orderBy);

  return query;

}