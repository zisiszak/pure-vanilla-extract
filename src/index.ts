import { compile } from 'stylis';
import { mapper } from './css';
import { Interpolation } from './types';

export const css = (
    strings: TemplateStringsArray,
    ...interpolations: Interpolation<object>[]
) => mapper(compile(String.raw({ raw: strings }, ...interpolations)));

export default css;
