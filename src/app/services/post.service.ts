import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost } from '../models/post.model';

const BASE_URL = 'http://localhost:3000/'

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAll() {
    return this.httpClient.get<IPost[]>(BASE_URL + 'posts')
  }

  getOne(id: number) {
    return this.httpClient.get<IPost>(BASE_URL + 'posts/' + id)
  }

  add(body: { title: string, author: string, description: string }) {
    return this.httpClient.post<IPost>(BASE_URL + 'posts', body)
  }

  edit(id: number, body: { title: string, author: string, description: string }) {
    return this.httpClient.put(BASE_URL + 'posts/' + id, body)
  }

  delete(id: number) {
    return this.httpClient.delete(BASE_URL + 'posts/' + id)
  }

}
