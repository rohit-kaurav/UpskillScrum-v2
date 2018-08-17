import { UserService } from './../services/user.service';
import { Injectable } from "@angular/core";
import { CanActivate, RouterStateSnapshot, Router } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private user: UserService, private router: Router) { }
    
    canActivate(route, state:RouterStateSnapshot){
        if(this.user.isLoggedIn()) return true;
        this.router.navigate(['/login']);
        return false;
    }
}