import { HttpUrlEncodingCodec } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-share-button',
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.scss']
})
export class ShareButtonComponent implements OnInit {

  @Input()
  public icon!: 'facebook' | 'whatsapp';

  @Input()
  public url$!: Observable<string>;

  @ViewChild('shareLink')
  shareLink!: ElementRef;

  url!: string;

  isDesktop: boolean;

  shareUrl!: string;


  constructor(private deviceService: DeviceDetectorService, private router: Router) {
    this.isDesktop = this.deviceService.isDesktop();

  }

  private loadHref() {
    const urlEncoder = new HttpUrlEncodingCodec();
    switch (this.icon) {
      case 'facebook':
        this.shareUrl = urlEncoder.encodeKey(`https://www.facebook.com/sharer/sharer.php?u=${this.url}`);
        break;
      case 'whatsapp':
        this.shareUrl = this.isDesktop ?
          urlEncoder.encodeKey(`https://web.whatsapp.com/send?text=${this.url}`) :
          urlEncoder.encodeKey(`whatsapp://send?text=${this.url}`);
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
    this.shareLink.nativeElement.click();
  }
}
