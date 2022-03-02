import { Category } from '../../categories/category.model';
import { ArticleComment } from './article-comment.model';

export interface Article {
  id: number;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  category?: Category;
  comments?: Array<ArticleComment>;
}
