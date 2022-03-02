import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, combineLatest, EMPTY, map, of, switchMap, throwError } from 'rxjs';

import { Article } from './models/article.model';
import { ArticleComment } from './models/article-comment.model';
import { CategoriesService } from '../categories/categories.service';
import { Category } from '../categories/category.model';
import { environment } from '../../environments/environment';


interface ArticleResponseData {
  id: number;
  title: string;
  body: string;
  category_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}

interface ArticlesListResponseData {
  data: Array<ArticleResponseData>;
  current_page: number;
  total: number;
  per_page: number;
}

interface ArticleCommentResponseData {
  id: number;
  title: string;
  description: string;
  article_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}

interface ArticleCommentsListResponseData {
  data: Array<ArticleCommentResponseData>;
}

function mapArticleComment(comment: ArticleCommentResponseData): ArticleComment {
  const { id, title, description, user_id, created_at, updated_at } = comment;

  return {
    id,
    title,
    description,
    userId: user_id,
    createdAt: created_at,
    updatedAt: updated_at
  };
}

function mapArticle(
  article: ArticleResponseData,
  comments?: Array<ArticleComment>,
  category?: Category
): Article {
  const { id, title, body, created_at, updated_at } = article;

  const mapped = {
    id,
    title,
    body,
    createdAt: created_at,
    updatedAt: updated_at
  } as Article;

  if (comments) mapped.comments = comments;
  if (category) mapped.category = category;

  return mapped;
}


@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private readonly baseUrl = `${environment.apiBaseUrl}/articles`;

  constructor(
    private http: HttpClient,
    private categoriesService: CategoriesService
  ) {}

  getArticles(page: number) {
    return this.http.get<ArticlesListResponseData>(this.baseUrl, { params: new HttpParams().set('page', page) })
      .pipe(map(response =>  ({
        articles: response.data.map(article => mapArticle(article)),
        pagination: {
          page: response.current_page,
          total: response.total,
          perPage: response.per_page
        }
      })));
  }

  getArticleById(id: number) {
    return this.http.get<{ data: ArticleResponseData }>(`${this.baseUrl}/${id}`)
      .pipe(
        switchMap(({ data: article }) => combineLatest([this.getArticleComments(article.id), this.categoriesService.getCategoryById(article.category_id)])
          .pipe(
            map(([comments, category]) =>  mapArticle(article, comments, category))
          )
        )
      );
  }

  createArticle(payload: { title: string; body: string; category_id: number; }) {
    return this.http.post<{ data: ArticleResponseData }>(this.baseUrl, payload)
      .pipe(
        map(({ data }) => mapArticle(data)),
        catchError(e => {
          // weird error on back-end related to JSON parsing
          if (e instanceof HttpErrorResponse && e.status === 200) {
            return of(EMPTY);
          }

          return throwError(() => e);
        })
      );
  }

  updateArticle(id: number, payload: { title: string; body: string; category_id: number; }) {
    return this.http.put<{ data: ArticleResponseData }>(`${this.baseUrl}/${id}`, payload)
      .pipe(map(({ data }) => mapArticle(data)));
  }

  deleteArticle(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  private getArticleComments(articleId: number) {
    return this.http.get<ArticleCommentsListResponseData>(`${this.baseUrl}/${articleId}/comments`)
      .pipe(
        map(({ data }) => data.map(mapArticleComment))
      );
  }
}
