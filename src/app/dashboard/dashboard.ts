import { Component } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  imports: [Sidebar],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {}
