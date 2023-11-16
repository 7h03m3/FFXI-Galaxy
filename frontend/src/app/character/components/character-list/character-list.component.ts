import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CharacterApiService } from '../../../api/character-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { CharacterDto } from '../../../shared/dto/character.dto';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CharacterAddDialogComponent } from '../character-add-dialog/character-add-dialog.component';
import { DeleteConfirmDialogComponent } from '../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
})
export class CharacterListComponent implements OnInit, AfterViewInit {
  public tableColumns = ['name', 'server', 'action'];
  public tableData = new MatTableDataSource<CharacterDto>();
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  constructor(
    private characterApi: CharacterApiService,
    public dialog: MatDialog,
    private router: Router,
  ) {}

  public ngOnInit() {
    this.loadList();
  }

  public ngAfterViewInit() {
    this.tableData.paginator = this.paginator;
    this.tableData.sort = this.sort;
  }

  public onAdd() {
    const dialogRef = this.dialog.open(CharacterAddDialogComponent, {
      data: new CharacterDto(),
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.characterApi.create(data).subscribe(() => {
          this.loadList();
        });
      } else {
        this.loadList();
      }
    });
  }

  public onDelete(element: CharacterDto) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: {
        itemName: element.name + ' on ' + element.server,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.characterApi.delete(element.id).subscribe(() => {
          this.loadList();
        });
      } else {
        this.loadList();
      }
    });
  }

  public onShowInfo(element: CharacterDto) {
    this.router.navigate(['/character/info', { id: element.id }]);
  }

  private loadList() {
    this.characterApi.getAll().subscribe((response) => {
      this.tableData.data = response;
    });
  }
}
