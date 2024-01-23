import { compile } from 'stylis';
import { fulfillVarsContract } from './assign-vars.js';
import { mapper } from './css.js';
import { Interpolation } from './types.js';

export const css = (
    strings: TemplateStringsArray,
    ...interpolations: Interpolation<object>[]
) => mapper(compile(String.raw({ raw: strings }, ...interpolations)));

export const assignVars = fulfillVarsContract;

export const pure = {
    css,
    assignVars,
};
export default pure;
