import { StyleRule } from '@vanilla-extract/css';
import { compile } from 'stylis';
import { pureTest } from './css.css';

const isCreatedVarAssignment = (key: string) => key.startsWith('var(');
const isNewVarAssignment = (key: string) => key.startsWith('--');

export const mapper = (compiled: ReturnType<typeof compile>): StyleRule => {
    const result = {} as any;
    for (let i = 0; i < compiled.length; i++) {
        const { value, type, props, children } = compiled[i];
        if (type === 'decl') {
            if (typeof props === 'string' && typeof children === 'string') {
                if (
                    isNewVarAssignment(props) ||
                    isCreatedVarAssignment(props)
                ) {
                    result.vars ??= {};
                    result.vars![props] = children;
                    continue;
                }
                result[props] = children as any;
                continue;
            }
            if (typeof props === 'string') {
                // idk, when are children an element[] in a declaration?
            } else {
            }
            continue;
        }

        if (
            type === 'rule' &&
            Array.isArray(props) &&
            Array.isArray(children)
        ) {
            // if an & is missing, place it at the start (and suffer the consequences if you intended it to be elsewhere)
            // also stylis rmoves & characters in the output for some reason, but it's preserved in the raw value as &\f. But @VE hates the \f, so it gotta go
            const val = value.toString();
            const selector = val
                .split(',')
                .map(v => (v.includes('&') ? v.replace('&\f', '&') : `&${v}`))
                .join(', ');
            console.log(props);
            result['selectors'] ??= {};
            result['selectors'][selector] = mapper(children);
        }

        if (
            type === '@media' &&
            Array.isArray(props) &&
            Array.isArray(children)
        ) {
            result['@media'] ??= {};
            const rule = props.join(', ');
            result['@media'][rule] = mapper(children);
        }
    }
    console.log(result);
    return result;
};

export const test = pureTest;
