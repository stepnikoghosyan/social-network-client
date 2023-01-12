import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessangesContainerComponent } from './messanges-container.component';

describe('MessangesContainerComponent', () => {
  let component: MessangesContainerComponent;
  let fixture: ComponentFixture<MessangesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessangesContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessangesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
