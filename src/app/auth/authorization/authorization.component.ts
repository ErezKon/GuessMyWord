import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AuthorizationComponent>) { }

  ngOnInit(): void {
  }

  loginWith(platform: string) {
    console.log(`Log in with: ${platform}`);
    this.dialogRef.close(platform);
  }
}
