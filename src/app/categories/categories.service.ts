import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin, map, of, switchMap } from 'rxjs';

import { environment } from '../../environments/environment';
import { Category } from './category.model';
import { PaginatedResponseData } from '../common/models/paginated-response-data.model';

interface CategoryResponseData {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

function mapCategory(category: CategoryResponseData): Category {
  const { id, name, description } = category;
  return {
    id,
    name,
    description
  };
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private readonly baseUrl = `${environment.apiBaseUrl}/categories`;

  constructor(private http: HttpClient) {}

  getCategories(page: number) {
    return this.http.get<PaginatedResponseData<CategoryResponseData>>(this.baseUrl, { params: new HttpParams().set('page', page) })
      .pipe(
        map(response => ({
          categories: response.data.map(c => mapCategory(c)),
          pagination: {
            page: response.current_page,
            total: response.total,
            perPage: response.per_page
          }
        }))
      );
  }

  getCategoryById(id: number) {
    return this.http.get<{ data: CategoryResponseData }>(`${this.baseUrl}/${id}`)
      .pipe(map(({ data }) => mapCategory(data)));
  }

  createCategory(payload: { name: string; description: string; }) {
    return this.http.post<{ data: CategoryResponseData }>(this.baseUrl, payload).pipe(
      map(({ data }) => mapCategory(data))
    );
  }

  updateCategory(id: number, payload: { name: string; description: string }) {
    return this.http.put<{ data: CategoryResponseData }>(`${this.baseUrl}/${id}`, payload)
      .pipe(map(({ data }) => mapCategory(data)));
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  /**
   * Ugly looking method used as a hack to retrieve a list of all categories.
   * Back-end returns paginated categories and does not expose endpoint for retrieving all categories.
   *
   * @returns Observable<Array<Category>>
   */
  getAllCategories() {
    return this.getCategories(1).pipe(
      switchMap(({ categories, pagination }) => {
        const pagesCount = Math.ceil(pagination.total / pagination.perPage);

        if (isNaN(pagesCount) || !isFinite(pagesCount) || !pagesCount) {
          return of([]);
        }
        if (pagesCount === 1) {
          return of(categories);
        }

        return forkJoin(range(2, pagesCount).map(page => this.getCategories(page)))
          .pipe(map(values => categories.concat(...values.map(v => v.categories).flat())
        ));
      })
    );
  }
}

function range(start: number, end: number): Array<number> {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}
