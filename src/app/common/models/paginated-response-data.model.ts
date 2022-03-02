export interface PaginatedResponseData<T> {
  data: Array<T>;
  current_page: number;
  total: number;
  per_page: number;
}
