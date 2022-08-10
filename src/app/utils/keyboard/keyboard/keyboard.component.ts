import { ChangeDetectorRef, Component, DoCheck, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { KeyboardProvider } from '../keyboard-provider/keyboard.provider';
import { KeyboardCustomClass } from './keyboard-custom-class.model';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit, OnDestroy, DoCheck {

  @Input()
  public language!: string | null;

  @Input()
  public language$!: Observable<string> | null;

  @Input()
  public customClasses!: KeyboardCustomClass | null;

  @Output()
  public keyPressed = new EventEmitter<string>();

  @Output()
  public delete = new EventEmitter<void>();

  public layout!: Array<Array<string>>;

  private langSub!: Subscription;

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.layout = new KeyboardProvider().getKeyboard(this.language as string);
    if (this.language$) {
      this.langSub = this.language$?.subscribe(lang => {
        this.layout = new KeyboardProvider().getKeyboard(lang);
        this.cdRef.detectChanges();
      });
    }
  }


  ngDoCheck(): void {
    this.customClasses?.classPerLetter?.forEach((value, key) => {
      document.getElementById(`keyboard-letter-${key}`)?.classList.add(value);
    });
  }

  onKeyPressed(key: string) {
    this.keyPressed.emit(key);
  }

  onDelete() {
    this.delete.emit();
  }
}
