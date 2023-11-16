import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CharacterDto } from '../shared/dto/character.dto';
import { InventoryContainerEnum } from '../shared/enums/inventory-container.enum';

@Injectable({
  providedIn: 'root',
})
export class CharacterApiService {
  private url = 'http://127.0.0.1:3000/character';

  constructor(private httpClient: HttpClient) {}

  public getAll(): Observable<CharacterDto[]> {
    return this.httpClient.get<CharacterDto[]>(this.url);
  }

  public create(newCharacter: CharacterDto): Observable<CharacterDto> {
    return this.httpClient.post<CharacterDto>(this.url, newCharacter);
  }

  public delete(id: number) {
    return this.httpClient.delete(this.url + '/' + id);
  }

  public get(id: number) {
    return this.httpClient.get<CharacterDto>(this.url + '/' + id);
  }

  public getInventory(id: number) {
    return this.httpClient.get<CharacterDto>(this.url + '/inventory/' + id);
  }

  public getInventoryContainer(id: number, container: InventoryContainerEnum) {
    return this.httpClient.get<CharacterDto>(
      this.url + '/inventory/' + id + '/' + container,
    );
  }
}
