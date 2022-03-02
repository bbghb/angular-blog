import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';

import { Article } from './models/article.model';
import { ArticlesService } from './articles.service';


@Injectable()
export class ArticleResolver implements Resolve<Article> {
  constructor(
    private router: Router,
    private articlesService: ArticlesService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Article> {
    return this.articlesService.getArticleById(+route.params['id']).pipe(
      catchError(() => {
        this.router.navigate(['/articles']);
        return EMPTY;
      })
    );
  }
}
