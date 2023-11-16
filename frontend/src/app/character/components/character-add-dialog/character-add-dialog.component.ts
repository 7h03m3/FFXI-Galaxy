import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CharacterDto } from '../../../shared/dto/character.dto';

@Component({
  selector: 'app-character-add-dialog',
  templateUrl: './character-add-dialog.component.html',
  styleUrls: ['./character-add-dialog.component.scss'],
})
export class CharacterAddDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CharacterAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CharacterDto,
  ) {}

  public onCancel() {
    this.dialogRef.close();
  }

  public onSave() {
    this.dialogRef.close(this.data);
  }

  public isValid(): boolean {
    return (
      this.data.name != undefined &&
      this.data.server != undefined &&
      this.data.name.length > 0 &&
      this.data.server.length > 0
    );
  }
}
