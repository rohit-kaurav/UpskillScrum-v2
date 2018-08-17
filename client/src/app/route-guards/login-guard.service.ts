import { UserService } from './../services/user.service';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginGuard implements CanActivate{

    constructor(private user: UserService, private router: Router){

    }

    canActivate(route, state:RouterStateSnapshot){
        if(this.user.isLoggedIn()) {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }
}