import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CharacterApiService } from '../../../api/character-api.service';
import { InventoryContainerEnum } from '../../../shared/enums/inventory-container.enum';
import { CharacterInventoryItemDto } from '../../../shared/dto/character-inventory-item.dto';
import { ItemApiService } from '../../../api/item-api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ItemSearchDto } from '../../../shared/dto/item-search.dto';

@Component({
  selector: 'app-character-inventory-list',
  templateUrl: './character-inventory-list.component.html',
  styleUrls: ['./character-inventory-list.component.scss'],
})
export class CharacterInventoryListComponent
  implements OnInit, AfterViewInit, OnChanges
{
  public tableColumns = ['image', 'name', 'count', 'action'];
  public tableData = new MatTableDataSource<CharacterInventoryItemDto>();
  public itemCount = 0;
  @Input() characterId: number = 0;
  @Input() containerType: InventoryContainerEnum =
    InventoryContainerEnum.Inventory;
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  constructor(
    private characterApi: CharacterApiService,
    private itemApi: ItemApiService,
  ) {}

  public ngOnInit() {
    if (this.characterId == 0) {
      return;
    }

    this.loadData();
  }

  public ngAfterViewInit() {
    this.tableData.paginator = this.paginator;
    this.tableData.sort = this.sort;
  }

  public ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    console.log(this.containerType);
    this.loadData();
  }

  public getItemImage(element: CharacterInventoryItemDto): string {
    return this.itemApi.getItemImage(element.itemId);
  }

  public loadData() {
    this.characterApi
      .getInventoryContainer(this.characterId, this.containerType)
      .subscribe((response) => {
        this.itemCount = 0;
        if (
          response == null ||
          response.containers == undefined ||
          response.containers.length != 1
        ) {
          return;
        }

        this.itemCount = response.containers[0].items.length;
        if (this.itemCount != 0) {
          this.tableData.data = response.containers[0].items;
        }
      });
  }

  public openFfxiAh(element: ItemSearchDto) {
    window.open('https://www.ffxiah.com/item/' + element.itemId, '_blank');
  }
}
