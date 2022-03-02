import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-articles-list-item',
  templateUrl: './articles-list-item.component.html',
  styleUrls: ['./articles-list-item.component.css']
})
export class ArticlesListItemComponent {
  @Input('article') article?: Article;
}
