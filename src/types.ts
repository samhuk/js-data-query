import { DataFilterNodeOrGroup } from '@samhuk/data-filter/dist/types'
import { PagingRecord } from './paging/types'
import { SortingRecord } from './sorting/types'

export type DataQueryRecord<TFieldNames extends string = string> = PagingRecord & {
  sorting?: SortingRecord<TFieldNames>
  filter?: DataFilterNodeOrGroup<TFieldNames>
}

export type DataQueryOptions<TFieldNames extends string = string> = DataQueryRecord<TFieldNames>

export type DataQuerySql = {
  /**
   * The ORDER BY, LIMIT, and OFFSET SQL statement
   */
  orderByLimitOffset: string
  /**
   * The WHERE SQL clause
   */
  where: string
  /**
   * `orderByLimitOffset` and `where` concatenated together.
   *
   * This is useful if the SQL query does not require any statements between
   * the order by, limit, or offset, and the where (i.e. group by, etc.).
   */
  orderByLimitOffsetWhere: string
}

export type DataQueryUrlParameters = {
  page: string
  pageSize: string
  sort: string
  filter: string
}

export type ToSqlOptions = {
  /**
   * Determines whether "WHERE" will be included in the SQL statement.
   *
   * This is useful if the where statement needs to be combined with
   * other, external, custom, where statements.
   *
   * @default true
   */
  includeWhereWord?: boolean
}

export type DataQuery<TFieldNames extends string = string> = {
  page: number | null
  pageSize: number | null
  sorting: SortingRecord | null
  filter: DataFilterNodeOrGroup<TFieldNames> | null
  /**
   * Updates the data query value.
   */
  update: <TFieldNames2 extends string = string>(newValue: DataQueryRecord<TFieldNames>) => DataQuery<TFieldNames | TFieldNames2>
  /**
   * Updates the page of the data query.
   */
  updatePage: (newPage: number) => DataQuery<TFieldNames>
  /**
   * Updates the page size of the data query.
   */
  updatePageSize: (newPageSize: number) => DataQuery<TFieldNames>
  /**
   * Updates the sorting of the data query.
   */
  updateSorting: (newSorting: SortingRecord) => DataQuery<TFieldNames>
  /**
   * Updates the data filter of the data query.
   */
  updateFilter: <TFieldNames2 extends string = string>(
    newFilter: DataFilterNodeOrGroup<TFieldNames | TFieldNames2>,
  ) => DataQuery<TFieldNames | TFieldNames2>
  /**
   * Converts the current value of the data query to SQL statements.
   */
  toSql: (options?: ToSqlOptions) => DataQuerySql
  /**
   * Converts the current value of the data query to URL query parameters.
   */
  toUrlParams: () => DataQueryUrlParameters
  /**
   * Converts the current value of the data query to a URL query parameters string.
   */
  toUrlParamsString: () => string
  /**
   * Updates the current value of the data query according to the given data query URL parameters.
   */
  fromUrlParams: (urlParams: DataQueryUrlParameters) => DataQuery
}
