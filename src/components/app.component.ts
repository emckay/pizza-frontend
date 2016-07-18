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
        <div class="app container" *ngIf="!loading">
            <div class="row">
                <div class="col-xs-3">
                    <h2>Pizzas</h2>
                    <ul class="pizza-list list-group">
                        <li *ngFor="let pizza of pizzas"
                            class="list-group-item"
                            [class.active]="pizza === selectedPizza"
                            (click)="onSelect(pizza)">
                            {{pizza.name}}
                            <a class="pull-right close" (click)="destroyPizza(pizza, $event)">&times;</a>
                        </li>
                    </ul>
                    <div class="options">
                        <a class="btn btn-default" (click)="newPizza()">+ New Pizza</a>
                    </div>
                </div>
                <div class="col-xs-9">
                    <pizza-detail [pizza]="selectedPizza" [toppings]="toppings"></pizza-detail>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .app {
            margin: 10% auto;
            max-width: 900px;
        }
        h2 {
            margin-top: 0;
        }
        .options {
            text-align: center;
        }
    `],
})
export class AppComponent implements OnInit {
    constructor(private pizzaService: PizzaService, private toppingService: ToppingService) { }

    selectedPizza: Pizza;
    toppings: Array<Topping>;
    pizzas: Array<Pizza>;
    loading: boolean = true;

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
        this.loading = true;
        Promise.all([
            this.getPizzas(),
            this.getToppings(),
        ]).then(() => this.loading = false);
    }

    destroyPizza(pizza: Pizza, event: any) {
        event.stopPropagation();
        this.pizzaService.destroy(pizza)
            .then(() => {
                this.pizzas = this.pizzas.filter((p) => p.id !== pizza.id);
                if (this.selectedPizza && this.selectedPizza.id === pizza.id) {
                    this.selectedPizza = undefined;
                }
            })
            .catch((error) => console.log('error', error));
    }
}

