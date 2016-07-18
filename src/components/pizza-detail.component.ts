import { Component, Input } from '@angular/core';

import { PizzaService } from '../services/pizza.service.ts';

import { Pizza } from '../models/pizza.ts';
import { Topping } from '../models/topping.ts';

@Component({
  selector: 'pizza-detail',
  providers: [ PizzaService ],
  template: `
    <div *ngIf="pizza">
        <h2>{{pizza.name}} details!</h2>
        <div>
            <b>Status</b>
            {{pizza.pizza_status.name}}
        </div>
        <div>
            <label><b>Name</b></label>
            <input [(ngModel)]="pizza.name" value="{{pizza.name}}" placeholder="name">
        </div>
        <div class="topping-options">
            <div *ngFor="let topping of toppings">
                <label>
                    <input
                        type="checkbox"
                        [checked]="toppingIncluded(topping)"
                        (change)="toggleTopping(topping)"
                    >
                    {{topping.name}}
                </label>
            </div>
        </div>
    </div>
  `,
})
export class PizzaDetailComponent {
    constructor(private pizzaService: PizzaService) { }

    @Input()
    pizza: Pizza;

    @Input()
    toppings: Array<Topping>;

    toppingIncluded(topping: Topping) {
        return this.pizza.toppings.map((t) => t.id).indexOf(topping.id) >= 0;
    }

    toggleTopping(topping: Topping) {
        if (this.toppingIncluded(topping)) {
            this.pizza.toppings = this.pizza.toppings.filter((t) => t.id !== topping.id);
        } else {
            this.pizza.toppings.push(topping);
        }
    }
}
