import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EditLinkComponent } from './edit-link.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('EditLinkComponent', () => {
  let component: EditLinkComponent;
  let fixture: ComponentFixture<EditLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLinkComponent, RouterTestingModule], // Import RouterTestingModule for routerLink
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(new Map([['id', '123']])), // Mock paramMap observable
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
