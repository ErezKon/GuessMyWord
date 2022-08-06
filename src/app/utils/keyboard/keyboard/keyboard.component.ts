import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { KeyboardProvider } from '../keyboard-provider/keyboard.provider';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit, OnDestroy {

  @Input()
  public language!: string | null;

  @Input()
  public language$!: Observable<string> | null;

  @Output()
  public keyPressed = new EventEmitter<string>();

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

  onKeyPressed(key: string) {
    this.keyPressed.emit(key);
  }
}
