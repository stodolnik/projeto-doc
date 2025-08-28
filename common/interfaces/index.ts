export interface Document {
    DocEntry?: number,
    DocNum?: string,
    NumAtCard?: string,
    CardCode?: string,
    CardName?: string,
    DocDate?: string,
    DocDueDate?: string,
    TaxDate?: string,
    BPLId?: number,
    BPL_IDAssignedToInvoice?: number,
    OpeningRemarks?: string,
    Comments?: string,
    DocStatus?: string,
    TrnspCode?: string,
    PaymentMethod?: string,
    PaymentGroupCode?: string,
    ClosingRemarks?: string,
    Address2?: string,
    Address?: string,
    TaxExtension?: TaxExtension,  
    DocumentAdditionalExpenses?: DocumentAdditionalExpenses[],
    DocumentLines?: DocumentLines[],
    U_SKILL_FormaPagto?: string,
    U_ALFA_NumSite?: string,
    U_ALFA_ThundersInvoiceId?: string,
    U_ALFA_ThundersOrderId?: string,
    U_ALFA_OperationTypeDescription?: string,
    U_EmailEnvDanfe?: string,
  }
  
  export interface DocumentLines {
    LineNum?: number,
    ItemCode?: string,
    Quantity?: number,  
    DiscountPercent?: number,
    UnitPrice?: number,
    Usage?: string,
    WarehouseCode?: string,
    Operation?: string  
  }
  
  export interface DocumentAdditionalExpenses {
    ExpenseCode?: number,
    LineTotal?: number
  }
  
  export interface TaxExtension {
    TaxId0?: string,
    TaxId1?: string,
    TaxId4?: string,
    Incoterms?: string,
    U_EmailEnvDanfe?: string,
    U_ALFA_OperationTypeDescription?: string
  }