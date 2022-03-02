import { Component, Input, OnInit } from '@angular/core';
import { ArticleComment } from '../../models/article-comment.model';

@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.css']
})
export class ArticleCommentComponent {
  @Input('comment') comment?: ArticleComment;
}
