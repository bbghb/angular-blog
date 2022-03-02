import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable, switchMap, tap } from 'rxjs';

import { ArticlesService } from '../../articles.service';
import { Article } from '../../models/article.model';
import { Pagination } from '../../../common/models/pagination.model';
import { BROWSE_ARTICLES_PAGE_TITLE } from '../../constants';

interface ArticlesComponentViewModel {
  articles: Array<Article>;
  pagination: Pagination;
}

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent {
  vm$: Observable<ArticlesComponentViewModel>;

  constructor(
    private route: ActivatedRoute,
    private title: Title,
    private articlesService: ArticlesService
  ) {
    this.vm$ = this.route.queryParams.pipe(
      switchMap(params => this.articlesService.getArticles(+params['page'] || 1))
    );
    this.title.setTitle(BROWSE_ARTICLES_PAGE_TITLE);
  }
}
