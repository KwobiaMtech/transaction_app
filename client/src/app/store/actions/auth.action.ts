export class  LoginToken{
    static readonly  type = '[AUTH] Set Token';
    constructor(public payload: string) {}
}
