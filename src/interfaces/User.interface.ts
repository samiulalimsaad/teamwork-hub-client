import { CommonInterface } from "./common.interface";

export interface UserInterface extends CommonInterface {
    name: string;
    email: string;
    password: string;
}
