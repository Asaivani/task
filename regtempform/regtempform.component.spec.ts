import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegtempformComponent } from './regtempform.component';

describe('RegtempformComponent', () => {
  let component: RegtempformComponent;
  let fixture: ComponentFixture<RegtempformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegtempformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegtempformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
