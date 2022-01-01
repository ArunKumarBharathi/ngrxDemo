import { User } from "src/app/Model/user.model";

export interface AuthState {
    user:User
}

export const initialState: AuthState = {
    user:null
};
