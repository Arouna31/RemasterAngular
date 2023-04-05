import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutService } from '../core/services/layout.service';

@Component({
  selector: 'al-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.scss'],
})
export class ProtectedComponent {
  isSidenavCollapsed: boolean;
  private subscription: Subscription;

  constructor(private layoutService: LayoutService) {}

  ngOnInit() {
    this.subscription = this.layoutService.isSidenavCollapsed$.subscribe(
      (isSidenavCollapsed: boolean) =>
        (this.isSidenavCollapsed = isSidenavCollapsed)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
