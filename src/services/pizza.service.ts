import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Pizza } from '../models/pizza.ts';

@Injectable()
export class PizzaService {
    constructor(private http: Http) { }

    private pizzasUrl = 'https://pizza-backend.herokuapp.com/pizzas';

    getPizzas() {
        return this.http.get(this.pizzasUrl)
            .toPromise()
            .then((resp) => resp.json())
            .catch(this.handleError);
    }

    getPizza(id: number) {
        return this.getPizzas()
            .then((pizzas) => pizzas.find(pizza => pizza.id === id));
    }

    save(pizza: Pizza): Promise<Pizza> {
        if (pizza.id) {
            return this.put(pizza);
        }
        return this.post(pizza);
    }

    destroy(pizza: Pizza) {
        return this.http.delete(`${this.pizzasUrl}/${pizza.id}`)
            .toPromise()
            .catch(this.handleError);
    }

    private post(pizza: Pizza): Promise<Pizza> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http
                .post(this.pizzasUrl, JSON.stringify(pizza), { headers })
                .toPromise()
                .then((resp) => resp.json())
                .catch(this.handleError);
    }

    private put(pizza: Pizza): Promise<Pizza> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const url = `${this.pizzasUrl}/${pizza.id}`;
        return this.http
                .put(url, JSON.stringify(pizza), { headers })
                .toPromise()
                .then((resp) => resp.json())
                .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
