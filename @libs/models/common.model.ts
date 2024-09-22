export enum SortEnum {
  'asc' = 'asc',
  'desc' = 'desc'
}

export interface Page {
  size: number;
  page: number;
  total?: number;
}

export const DEFAULT_SIZE = 10;

export const DEFAULT_PAGE_OPTIONS = [10, 25, 50];

export interface Import1CTable {
  "Артикул"?: string;
  "Базовая единица измерения"?: string;
  "Вид номенклатуры"?: string;
  "Единица хранения остатков"?: string;
  "Код"?: string;
  "Комментарий"?: string;
  "Наименование"?: string;
  "Номенклатурная группа"?: string;
  "Полное наименование"?: string;
  "Ставка НДС"?: string;
  "Ценовая группа"?: string;
  level?: number;
  isCategory?: boolean;
  parentCategory?: string;
}
