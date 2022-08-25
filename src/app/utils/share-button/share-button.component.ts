import { HttpUrlEncodingCodec } from '@angular/common/http';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-share-button',
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.scss']
})
export class ShareButtonComponent implements OnInit, OnDestroy {

  @Input()
  public icon!: 'facebook' | 'whatsapp' | 'link' | 'twitter';

  @Input()
  public url$!: Observable<string>;

  @Input()
  public solveTries$!: Observable<number | null>;

  @Input()
  public tooltip!: string;

  @Input()
  public tries!: number;

  @ViewChild('shareLink')
  shareLink!: ElementRef;

  url!: string;

  isDesktop: boolean;

  shareUrl!: string;

  private subscriptions = new Array<Subscription>();

  private shareText: string = 'Lets see you try out this word!\n';

  constructor(private deviceService: DeviceDetectorService,
    private router: Router,
    private clipboardApi: ClipboardService) {
    this.isDesktop = this.deviceService.isDesktop();

  }
  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  private loadHref() {
    const urlEncoder = new HttpUrlEncodingCodec();
    switch (this.icon) {
      case 'facebook':
        this.shareUrl = urlEncoder.encodeKey(`https://www.facebook.com/sharer/sharer.php?u=${this.url}`);
        break;
      case 'whatsapp':
        this.shareUrl = urlEncoder.encodeKey(`https://wa.me?text=${this.shareText}${this.url}`);
        break;
      case 'twitter':
        this.shareUrl = urlEncoder.encodeKey(`http://twitter.com/share?text=${this.shareText}${this.url}\n#milala #guessmyword`);
        break;

      default:
        break;
    }
  }

  ngOnInit(): void {
    this.subscriptions.push(this.url$?.subscribe(url => {
      this.url = url;
      this.loadHref();
    }));
    this.subscriptions.push(this.solveTries$.subscribe(tries => {
      if(tries && tries > 0) {
        this.shareText = `I Solved this word in ${tries} tries! Think you can beat me?\n`;
        this.loadHref();
      }
    }))
  }


  onShare() {
    if(this.icon === 'link') {
      this.clipboardApi.copyFromContent(this.url)
    } else {
      this.shareLink.nativeElement.click();
    }
  }
}
