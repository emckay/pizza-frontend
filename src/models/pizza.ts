import { Topping } from './topping.ts'

export class Pizza {
    id: number;
    name: string;
    status: string;
    toppings: Array<Topping>;
}
