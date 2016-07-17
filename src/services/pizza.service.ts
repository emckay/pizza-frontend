import { Injectable } from '@angular/core';

@Injectable()
export class PizzaService {
    getPizzas() {
        return fetch('https://pizza-backend.herokuapp.com/pizzas')
            .then((resp) => resp.json());
    }
}
