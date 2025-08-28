import "reflect-metadata";

const columnMetadataKey = Symbol("Column");
const tableMetadataKey = Symbol("Table");

export const ColumnName = (name: string) =>  {
    return Reflect.metadata(columnMetadataKey, name);
}

export const getColumnName = (target: any, propertyKey: string) => {
    return Reflect.getMetadata(columnMetadataKey, target, propertyKey);
}

export const TableName = (name: string) =>  {
    return Reflect.metadata(tableMetadataKey, name);
}

export const getTableName = (target: any) => {
    return Reflect.getMetadata(tableMetadataKey, target);
}
