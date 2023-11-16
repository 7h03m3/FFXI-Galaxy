import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ItemApiService } from '../../../api/item-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { ItemSearchDto } from '../../../shared/dto/item-search.dto';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CharacterDto } from '../../../shared/dto/character.dto';
import { CharacterApiService } from '../../../api/character-api.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.scss'],
})
export class ItemSearchComponent implements OnInit, AfterViewInit {
  public tableColumns = [
    'image',
    'name',
    'character',
    'location',
    'server',
    'count',
    'action',
  ];
  public tableData = new MatTableDataSource<ItemSearchDto>();
  public searchString = '';
  public characterList = new Array<CharacterDto>();
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;
  public characterFilter = '-';

  constructor(
    private itemApi: ItemApiService,
    private characterApi: CharacterApiService,
  ) {}

  public ngOnInit() {
    this.characterApi.getAll().subscribe((response) => {
      this.characterList = new Array<CharacterDto>();

      const none = new CharacterDto();
      none.id = 0;
      none.name = '-';
      this.characterList.push(none);

      response.forEach((character) => {
        this.characterList.push(character);
      });
    });
  }

  public ngAfterViewInit() {
    this.tableData.paginator = this.paginator;
    this.tableData.sort = this.sort;
  }

  public onSearch() {
    if (this.searchString.length == 0) {
      return;
    }

    if (this.characterFilter == '-') {
      this.itemApi.searchByName(this.searchString).subscribe((response) => {
        this.tableData.data = response;
      });
    } else {
      this.itemApi
        .searchByNameAndCharacter(this.searchString, this.characterFilter)
        .subscribe((response) => {
          this.tableData.data = response;
        });
    }
  }

  public getItemImage(element: ItemSearchDto): string {
    return this.itemApi.getItemImage(element.itemId);
  }

  public openFfxiAh(element: ItemSearchDto) {
    window.open('https://www.ffxiah.com/item/' + element.itemId, '_blank');
  }

  public onCharacterChange(event: MatSelectChange) {
    if (event.value == '-') {
      this.characterFilter = '';
    } else {
      this.characterFilter = event.value;
    }

    this.onSearch();
  }
}
