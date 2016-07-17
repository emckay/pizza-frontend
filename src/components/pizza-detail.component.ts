import { Component, Input } from '@angular/core';
import { Pizza } from '../models/pizza.ts';

@Component({
  selector: 'pizza-detail',
  template: `
    <div *ngIf="pizza">
        <h2>{{pizza.name}} details!</h2>
        <div>
            <b>Status</b>
            {{pizza.status}}
        </div>
        <div>
            <label><b>Name</b></label>
            <input [(ngModel)]="pizza.name" value="{{pizza.name}}" placeholder="name">
        </div>
    </div>
  `,
})
export class PizzaDetailComponent {
    @Input()
    pizza: Pizza;
}
