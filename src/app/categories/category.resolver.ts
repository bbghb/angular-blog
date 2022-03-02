import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';

import { Category } from './category.model';
import { CategoriesService } from './categories.service';

@Injectable()
export class CategoryResolver implements Resolve<Category> {
  constructor(
    private router: Router,
    private categoriesService: CategoriesService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category> {
    return this.categoriesService.getCategoryById(+route.params['id']).pipe(
      catchError(() => {
        this.router.navigate(['/categories']);
        return EMPTY;
      })
    );
  }
}
