import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ToppingService {
    constructor(private http: Http) { }

    private toppingsUrl = 'https://pizza-backend.herokuapp.com/toppings';

    getToppings() {
        return this.http.get(this.toppingsUrl)
            .toPromise()
            .then((resp) => resp.json())
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
