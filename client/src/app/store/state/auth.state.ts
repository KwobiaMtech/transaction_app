import {State, Action, StateContext } from '@ngxs/store';
import {LoginToken} from '../actions/auth.action';

export interface TokenModel {
    token: string | null;
}

@State<TokenModel>({
    name: 'set_token',
    defaults: {
        token: null
    }
})

export class SetToken {
    @Action(LoginToken)
    setToken({getState, patchState}: StateContext<TokenModel>, {payload}: LoginToken): any {
        patchState({
            token: payload
        });
    }
}

