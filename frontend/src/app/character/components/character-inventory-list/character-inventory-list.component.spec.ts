import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterInventoryListComponent } from './character-inventory-list.component';

describe('CharacterInventoryListComponent', () => {
  let component: CharacterInventoryListComponent;
  let fixture: ComponentFixture<CharacterInventoryListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterInventoryListComponent]
    });
    fixture = TestBed.createComponent(CharacterInventoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
