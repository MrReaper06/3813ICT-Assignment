import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestChannel } from './request-channel';

describe('RequestChannel', () => {
  let component: RequestChannel;
  let fixture: ComponentFixture<RequestChannel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestChannel],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestChannel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
