import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router/src/utils/preactivation";
import { Router } from "@angular/router";
import { GlobalService } from "../services/global.service";

@Injectable()
export class AuthGuard implements CanActivate {
  path: import("@angular/router").ActivatedRouteSnapshot[];
  route: import("@angular/router").ActivatedRouteSnapshot;

  constructor(private router: Router, private globalServices:GlobalService) { }

  canActivate() {
    if(this.globalServices.username==null)
    {
      this.router.navigate(['/login']);
      return false;
    }
    else{
      return true;
    }
  }


}
