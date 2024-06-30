import { CommonInterface } from "./Common.interface";

export interface UserInterface extends CommonInterface {
    name: string;
    email: string;
    password: string;
}
