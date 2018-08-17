import { state, style, transition, trigger, animate } from '@angular/animations';

export const slideHorizontal = trigger('slideHorizontal', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)', opacity: 0 }),
    animate('250ms ease-in', style({ transform: 'translateX(0%)', opacity: 1 }))
  ]),
  transition(':leave', [
    animate('200ms ease-out', style({ transform: 'translateX(-100%)', opacity: 0 }))
  ])
])

export const fade = trigger('fade', [
  transition('* => void', animate('200ms', style({ opacity: 0 })))
])

export const popInOut = trigger('popInOut', [
  transition(":enter", [
    style({ transform: 'translateY(200%)', opacity: 0 }),
    animate('200ms ease-in', style({ transform: 'translateY(-100%)', opacity: 1 }))
  ]),
  transition(":leave", [
    animate('200ms ease-out',style({transform: 'translateY(100%)', opacity:0}))
  ])
])