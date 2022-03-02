import { Component, Input } from '@angular/core';

import { ArticleComment } from '../../models/article-comment.model';

@Component({
  selector: 'app-article-comments',
  templateUrl: './article-comments.component.html',
  styleUrls: ['./article-comments.component.css']
})
export class ArticleCommentsComponent {
  @Input('comments') comments: Array<ArticleComment> = [];
}
