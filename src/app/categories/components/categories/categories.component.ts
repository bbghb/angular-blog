import { Component } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

import { Category } from '../../category.model';
import { Pagination } from '../../../common/models/pagination.model';
import { CategoriesService } from '../../categories.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BROWSE_CATEGORIES_PAGE_TITLE } from '../../constants';

interface CategoriesComponentViewModel {
  categories: Array<Category>;
  pagination: Pagination;
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  vm$: Observable<CategoriesComponentViewModel>;

  constructor(
    private route: ActivatedRoute,
    private title: Title,
    private categoriesService: CategoriesService
  ) {
    this.vm$ = this.route.queryParams.pipe(
      switchMap(params => this.categoriesService.getCategories(+params['page'] || 1))
    );
    this.title.setTitle(BROWSE_CATEGORIES_PAGE_TITLE);
  }
}
