import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, finalize, Observable } from 'rxjs';

import { Category } from '../../category.model';
import { CategoriesService } from '../../categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  private _isDeleting$ = new BehaviorSubject<boolean>(false);

  category: Category;
  isDeleting$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private categoriesService: CategoriesService
  ) {
    this.category = (this.route.snapshot.data as { category: Category }).category;
    this.isDeleting$ = this._isDeleting$.asObservable();
    this.title.setTitle(`${this.category.name} category`);
  }

  delete() {
    this._isDeleting$.next(true);
    this.categoriesService.deleteCategory(this.category.id)
      .pipe(finalize(() => {
        this._isDeleting$.next(false);
        this.router.navigate(['/categories'])
      }))
      .subscribe();
  }
}
