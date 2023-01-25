import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {

  allControls = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })

  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {
    this.allControls.valueChanges.subscribe({
      next: (controlsValue) => { console.log('valore di allControls: ', controlsValue) },
      error: (err) => { console.error(err) },
      complete: () => { console.log('completato') }
    })
  }

  onSavePost() {
    console.log('Invio dei dati in corso...')

    let newPost = {
      title: this.allControls.value.title ? this.allControls.value.title : '',
      author: this.allControls.value.author ? this.allControls.value.author : '',
      description: this.allControls.value.description ? this.allControls.value.description : ''
    }

    this.postService.add(newPost).subscribe(
      {
        next: (response) => { console.log('nuovo post: ', response) },
        error: (err) => { console.error(err) },
        complete: () => { console.log('completato') }
      }
    )
  }

}
