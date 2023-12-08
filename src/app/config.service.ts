import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private apiKey: string = 'AIzaSyDck7uesZBxaBm8vOt5VG7w6nFpgM25jxI';

  getApiKey(): string {
    return this.apiKey;
  }
}