import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { DataStorageService } from './shared/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private dataStorageService: DataStorageService
  ) {}
  ngOnInit(): void {
    this.authService.autoLogin();
  }
  title = 'Recipe Book';
  loadedFeature = 'recipe';
}
