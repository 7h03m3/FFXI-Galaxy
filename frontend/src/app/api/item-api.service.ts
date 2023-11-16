import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemSearchDto } from '../shared/dto/item-search.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemApiService {
  private url = 'http://127.0.0.1:3000/item';
  private imageUrl = 'http://127.0.0.1:3000/images';

  constructor(private httpClient: HttpClient) {}

  public searchByName(name: string): Observable<ItemSearchDto[]> {
    return this.httpClient.get<ItemSearchDto[]>(this.url + '/' + name);
  }

  public searchByNameAndCharacter(
    name: string,
    characterName: string,
  ): Observable<ItemSearchDto[]> {
    return this.httpClient.get<ItemSearchDto[]>(
      this.url + '/' + name + '/' + characterName,
    );
  }

  public getItemImage(itemId: number): string {
    return this.imageUrl + '/items/' + itemId + '.png';
  }
}
