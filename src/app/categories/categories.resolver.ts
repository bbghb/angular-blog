import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { Category } from './category.model';
import { CategoriesService } from './categories.service';

@Injectable()
export class CategoriesResolver implements Resolve<Array<Category>> {
  constructor(private categoriesService: CategoriesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<Category>> {
    return this.categoriesService.getAllCategories().pipe(
      catchError(() => {
        return of([]);
      })
    );
  }
}
