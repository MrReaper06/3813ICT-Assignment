import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestGroup } from './request-group';

describe('RequestGroup', () => {
  let component: RequestGroup;
  let fixture: ComponentFixture<RequestGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestGroup],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestGroup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
