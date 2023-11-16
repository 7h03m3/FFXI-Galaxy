import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterAddDialogComponent } from './character-add-dialog.component';

describe('CharacterAddDialogComponent', () => {
  let component: CharacterAddDialogComponent;
  let fixture: ComponentFixture<CharacterAddDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterAddDialogComponent]
    });
    fixture = TestBed.createComponent(CharacterAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
