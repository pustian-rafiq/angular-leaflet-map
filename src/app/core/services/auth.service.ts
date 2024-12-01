import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SigninInfo } from '../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  login(loginInfo: SigninInfo): Observable<any> {
    return of({
      success: true,
    });
  }
}
