import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryContainerEnum } from '../../../shared/enums/inventory-container.enum';
import { MatSelectChange } from '@angular/material/select';
import { CharacterApiService } from '../../../api/character-api.service';
import { CharacterDto } from '../../../shared/dto/character.dto';

@Component({
  selector: 'app-character-information',
  templateUrl: './character-information.component.html',
  styleUrls: ['./character-information.component.scss'],
})
export class CharacterInformationComponent implements OnInit {
  public characterId = 0;
  public containerTypes = Object.values(InventoryContainerEnum).sort((a, b) => {
    if (a > b) {
      return 1;
    }

    if (a < b) {
      return -1;
    }

    return 0;
  });
  public inventoryTypeString = '';
  public inventoryType = InventoryContainerEnum.Inventory;
  public characterInformation = new CharacterDto();
  protected readonly InventoryContainerEnum = InventoryContainerEnum;

  constructor(
    private route: ActivatedRoute,
    private characterApi: CharacterApiService,
    private router: Router,
  ) {}

  public ngOnInit() {
    this.route.paramMap.subscribe((data) => {
      const idString = data.get('id');

      if (idString != null) {
        this.characterId = Number(idString);
        this.characterApi.get(this.characterId).subscribe((response) => {
          this.characterInformation = response;
        });
      }
    });
  }

  public onInventoryTypeChange(event: MatSelectChange) {
    this.inventoryTypeString = event.value;
    this.inventoryType = this.inventoryTypeString as InventoryContainerEnum;
  }

  public onBack() {
    this.router.navigate(['/character/list']);
  }
}
