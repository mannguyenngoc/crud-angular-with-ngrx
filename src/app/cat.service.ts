import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Cat } from './cat';

@Injectable({
  providedIn: 'root',
})
export class CatService {
  constructor(private http: HttpClient) {}

  getAllCats(): Observable<Cat[]> {
    return this.http.get<Cat[]>('http://localhost:3000/api/todo');
  }
  getCat(name: string): Observable<Cat> {
    return this.http.get<Cat>('http://localhost:3000/api/cats/' + name);
  }
  insertCat(cat: Cat): Observable<Cat> {
    return this.http.post<Cat>('http://localhost:3000/api/cats', cat);
  }

  updateCat(cat: Cat): Observable<void> {
    return this.http.put<void>(
      'http://localhost:3000/api/cats/' + cat.name,
      cat
    );
  }

  deleteCat(name: string) {
    return this.http.delete('http://localhost:3000/api/cats/' + name);
  }
}
