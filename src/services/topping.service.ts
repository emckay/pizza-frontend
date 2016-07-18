import { Injectable } from '@angular/core';

@Injectable()
export class ToppingService {
    getToppings() {
        return fetch('https://pizza-backend.herokuapp.com/toppings')
            .then((resp) => resp.json());
    }
}
