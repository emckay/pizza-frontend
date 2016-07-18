import { Component, OnInit } from '@angular/core';
import {NGB_DIRECTIVES, NGB_PRECOMPILE} from '@ng-bootstrap/ng-bootstrap';

import { Pizza } from '../models/pizza.ts';
import { Topping } from '../models/topping.ts';
import { PizzaService } from '../services/pizza.service.ts';
import { ToppingService } from '../services/topping.service.ts';

import { PizzaDetailComponent } from './pizza-detail.component.ts';

@Component({
    directives: [ NGB_DIRECTIVES, PizzaDetailComponent ],
    precompile: [ NGB_PRECOMPILE ],
    providers: [ PizzaService, ToppingService ],
    selector: 'app',
    template: `
        <div class="container">
            <div class="row">
                <div class="col-xs-3">
                    <ul class="pizza-list list-group">
                        <li *ngFor="let pizza of pizzas"
                            class="list-group-item"
                            [class.active]="pizza === selectedPizza"
                            (click)="onSelect(pizza)">
                            {{pizza.name}}
                        </li>
                    </ul>
                    <div>
                        <a class="btn btn-default" (click)="newPizza()">+ New Pizza</a>
                    </div>
                </div>
                <div class="col-xs-9">
                    <pizza-detail [pizza]="selectedPizza" [toppings]="toppings"></pizza-detail>
                </div>
            </div>
        </div>
    `,
})
export class AppComponent implements OnInit {
    constructor(private pizzaService: PizzaService, private toppingService: ToppingService) { }

    selectedPizza: Pizza;
    toppings: Array<Topping>;
    pizzas: Array<Pizza>;

    onSelect(pizza: Pizza) { this.selectedPizza = pizza; }

    getPizzas() {
        this.pizzaService.getPizzas().then((pizzas) => this.pizzas = pizzas);
    }

    getToppings() {
        this.toppingService.getToppings().then((toppings) => this.toppings = toppings);
    }

    newPizza() {
        this.pizzas.push(new Pizza({ }));
    }

    ngOnInit() {
        this.getPizzas();
        this.getToppings();
    }
}

