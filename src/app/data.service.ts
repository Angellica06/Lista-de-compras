import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface Item {
  id?: number;
  name: string;
  purchased: boolean;
  isEditing: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/shoppingList';


  constructor(private http: HttpClient) {}

  getItems(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item).pipe(
      catchError(this.handleError) 
    );
  }

  removeItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateItem(item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/${item.id}`, item);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      alert('Sua sessão expirou. Faça login novamente.');
    } else {
      console.error('Ocorreu um erro:', error.message);
      alert('Erro ao carregar dados. Tente novamente mais tarde.');
    }
    return throwError(error);
  }

  addUser(user: { name: string, email: string }): Observable<any> {
    return this.http.post(this.apiUrl, user);  
  }
}
