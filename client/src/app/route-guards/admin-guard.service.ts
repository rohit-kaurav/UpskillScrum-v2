import { UserService } from './../services/user.service';
import { CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminGuard implements CanActivate{

    constructor(private user: UserService,private router:Router){}

    canActivate(route, state:RouterStateSnapshot){
        if(this.user.isLoggedIn()){
            if(this.user.isAdmin()) return true;
            this.router.navigate(['/project']);
            return false;
        }
        return false;
    }

}