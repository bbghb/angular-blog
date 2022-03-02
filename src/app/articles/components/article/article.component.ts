import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, finalize, Observable } from 'rxjs';

import { Article } from '../../models/article.model';
import { ArticlesService } from '../../articles.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {
  private _isDeleting$ = new BehaviorSubject<boolean>(false);

  article: Article;
  isDeleting$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private articlesService: ArticlesService
  ) {
    this.article = (this.route.snapshot.data as { article: Article; }).article;
    this.isDeleting$ = this._isDeleting$.asObservable();
    this.title.setTitle(this.article.title);
  }

  delete() {
    this._isDeleting$.next(true);
    this.articlesService.deleteArticle(this.article.id)
      .pipe(finalize(() => {
        this._isDeleting$.next(false);
        this.router.navigate(['/articles'])
      }))
      .subscribe();
  }
}
