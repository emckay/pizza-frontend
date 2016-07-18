import { Component, Input } from '@angular/core';

import { PizzaService } from '../services/pizza.service.ts';

import { Pizza } from '../models/pizza.ts';
import { Topping } from '../models/topping.ts';

@Component({
  selector: 'pizza-detail',
  providers: [ PizzaService ],
  template: `
    <div *ngIf="pizza">
        <h2 class="pizza-title">{{pizza.name}}</h2>
        <div>
            <label><b>Name</b></label>
            <input [(ngModel)]="pizza.name" value="{{pizza.name}}" (keyup)="pizza.touched = true" placeholder="name">
        </div>
        <div>
            <b>Status</b>
            {{pizza.pizza_status.name}}
            <span *ngIf="pizza.touched">(Unsaved changes)</span>
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
        <div>
            <a class="btn btn-default" (click)="save()">Save</a>
            <a *ngIf="pizza.pizza_status.order === 0 && !pizza.touched" class="btn btn-primary" (click)="advanceStatus()">Submit Order</a>
        </div>
    </div>
  `,
  styles: [`
    h2 {
        margin-top: 0;
    }
    .new-pizza {
        margin: 0 auto;
    }
    .topping-options {
        margin: 20px;
    }
  `],
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
        this.pizza.touched = true;
        if (this.toppingIncluded(topping)) {
            this.pizza.toppings = this.pizza.toppings.filter((t) => t.id !== topping.id);
        } else {
            this.pizza.toppings.push(topping);
        }
    }

    save() {
        this.pizzaService.save(this.pizza).then((pizza) => Object.assign(this.pizza, pizza));
        this.pizza.touched = false;
    }

    advanceStatus() {
        this.pizzaService.advanceStatus(this.pizza).then((pizza) => Object.assign(this.pizza, pizza));
    }
}
