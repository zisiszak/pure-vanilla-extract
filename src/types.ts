import { type ComplexStyleRule } from './vanilla-types.js';
export type Interpolation<Props extends object> =
    | string
    | null
    | false
    | undefined
    | number
    | TemplateStringsArray
    | ComplexStyleRule
    | Interpolation<Props>[];

export type Contract = {
    [key: string]: string | Contract;
};
export type Answers<Conditions extends Contract> = {
    [key in keyof Conditions]?: Conditions[key] extends Contract
        ? Answers<Conditions[key]>
        : string | number;
};
