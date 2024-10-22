import{ Validator } from "./validator";
import { required, minLength, email, no_op} from "./basic_rules";
import { Address } from "../order_models";
import { Customer } from "../customer_models";

export const CustomerValidator = new Validator<Customer> 
({
    name: [ required, minLength(6)],
    email: email,
    federatedID: no_op //no valation required for this field
});

export const AddressValidator = new Validator<Address>({
    street: required,
    city: required,
    state: required,
    zip: no_op
});