import { type StyleRule } from '@vanilla-extract/css';
import { compile } from 'stylis';

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
            continue;
        }

        if (
            type === 'rule' &&
            Array.isArray(props) &&
            Array.isArray(children)
        ) {
            // if an & is missing, place it at the start (and suffer the
            // consequences if you intended it to be elsewhere)

            // Stylis removes & in the output, replaces them with '&\f' in the
            // raw string value. @VE hates the `\f`
            const val = value.toString();
            const selector = val
                .split(',')
                .map(v => (v.includes('&') ? v.replace('&\f', '&') : `&${v}`))
                .join(', ');
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
    return result;
};
