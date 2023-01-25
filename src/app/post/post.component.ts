import { Component, OnInit } from '@angular/core';
import { IPost } from '../models/post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts: IPost[] = []

  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {
    this.postService.getAll().subscribe({
      next: (response) => {
        console.log('risposta dalla get dei post: ', response)
        this.posts = response
      },
      error: (err) => { console.error('si è verificato il seguente errore: ', err) },
      complete: () => { console.log('completato') }
    })
  }

}
