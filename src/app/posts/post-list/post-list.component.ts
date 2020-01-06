import { Component } from '@angular/core';


@Component({
  selector:'app-post-list',
  templateUrl:'./post-list.component.html',
  styleUrls:['./post-list.component.css']

})
export class PostListComponent {
posts = [
  {title:'First Post',
  content: ' This is my first content'
  },
  {title:'Second Post',
  content: ' This is my Second content'
  },
  {title:'Third Post',
  content: ' This is my third content'
  }
]
}
