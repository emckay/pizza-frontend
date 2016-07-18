import { Topping } from './topping.ts'

export class Pizza {
    id: number;
    name: string;
    pizza_status: Object;
    toppings: Array<Topping>;

    constructor({ name = "New Pizza", pizza_status = { name: "Unsaved", order: -1 }, toppings = [], id }:
                { name?: string, pizza_status?: Object, toppings?: Array<Topping>, id?: number })
    {
        this.id = id;
        this.name = name;
        this.pizza_status = pizza_status;
        this.toppings = toppings;
    }
}
