import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthUser } from 'app/core/auth-user/auth-user.types';
import { AuthService } from '../auth.service';
import { AuthUserService } from 'app/core/auth-user/auth-user.service';

@Directive({
  selector: '[appRole]',
})
export class RoleDirective implements OnInit {
  private authenticatedUser: AuthUser;
  private permissions = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authUserService: AuthUserService
  ) { }

  ngOnInit(): void {
    this.authUserService.user$.subscribe((user: AuthUser) => {
      this.authenticatedUser = user;
      this.updateView();
    });
  }

  @Input()
  set appRole(val: Array<String>){
    // console.log(` ***`, val);

    this.permissions = val;
    this.updateView();
  }

  private updateView(): void {
    this.viewContainer.clear();
    
    if (this.checkPermissions()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  private checkPermissions(): boolean {
    let hasPermission = false;
    if(this.authenticatedUser && this.authenticatedUser.authorities) {
      for (const checkPermission of this.permissions) {
        const permissionFound = this.authenticatedUser.authorities.find((p: string) => {
          return p.toUpperCase() === checkPermission.toUpperCase();
        });
        
        if(permissionFound) {
          // console.warn("Tiene permiso");
          hasPermission = true;  
          break;  
        }
      }
      
      return hasPermission;
    }
  }
}
