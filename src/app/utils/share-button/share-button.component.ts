import { HttpUrlEncodingCodec } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-share-button',
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.scss']
})
export class ShareButtonComponent implements OnInit {

  @Input()
  public icon!: 'facebook' | 'whatsapp' | 'link' | 'twitter';

  @Input()
  public url$!: Observable<string>;

  @Input()
  public tooltip!: string;

  @ViewChild('shareLink')
  shareLink!: ElementRef;

  url!: string;

  isDesktop: boolean;

  shareUrl!: string;


  constructor(private deviceService: DeviceDetectorService,
    private router: Router,
    private clipboardApi: ClipboardService) {
    this.isDesktop = this.deviceService.isDesktop();

  }

  private loadHref() {
    const urlEncoder = new HttpUrlEncodingCodec();
    switch (this.icon) {
      case 'facebook':
        this.shareUrl = urlEncoder.encodeKey(`https://www.facebook.com/sharer/sharer.php?u=${this.url}`);
        break;
      case 'whatsapp':
        this.shareUrl = urlEncoder.encodeKey(`https://wa.me?text=I Solved this word in 3 tries! Think you can beat me?\n${this.url}`);
        break;
      case 'twitter':
        this.shareUrl = urlEncoder.encodeKey(`http://twitter.com/share?text=I Solved this word in 3 tries! Think you can beat me\n${this.url}\n#milala #guessmyword`);
        break;

      default:
        break;
    }
  }

  ngOnInit(): void {
    this.url$?.subscribe(url => {
      this.url = url;
      this.loadHref();
    });
  }


  onShare() {
    if(this.icon === 'link') {
      this.clipboardApi.copyFromContent(this.url)
    } else {
      this.shareLink.nativeElement.click();
    }
  }
}
