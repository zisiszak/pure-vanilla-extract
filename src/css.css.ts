import { createVar, style } from '@vanilla-extract/css';
import { css } from './';

const testFunction = (string: string) => string.toUpperCase();

const test2 = (string: string) => ({
    background: string,
});

const vanilla = style({
    'vars': {},
    '@media': {
        '(min-width: 780px)': {
            'height': '10px',
            ':hover': {},
        },
    },
});

const syntaxCompliantVar = createVar();

const createVarInStyle = style({
    vars: {
        [createVar()]: 'banana',
        [syntaxCompliantVar]: 'banana',
    },
    selectors: {
        '&:hover, &.fldsakjfha': {
            position: '-moz-initial',
        },
    },
});

// This shows we can create vars within a style function call, meaning that we can assign @ve css variables using interpolations
const functionVar = (string: string) => {
    const newVar = createVar();

    // conclusion: assignment of variables should always be enclosed within a vars object (at any level).
    // whenever a -- prefix is identified as a property key (not enclosed within a var() func), then it must assigned into vars and excluded from the body.
    return {
        vars: {
            [newVar]: string,
            ['var(--non-compliant-var)']: string,
            ['--non-compliant-var']: string,
        },
        // this doesn't work
        [newVar]: 'test',
        // this is equivalent to the above
        [newVar.toString()]: 'test1',
        // this does (and it replaces the value originally assigned)
        ['--non-compliant-var']: 'test2',

        // referencing variables: Both work
        background: newVar,
        color: `var(--non-compliant-var)`,
    };
};
const createVarUsingFunctionInStyle = style(functionVar('banana'));

export const pureTest = style(css`
    position: absolute;
    top: 0;
    right: sometihng;

    ${syntaxCompliantVar}: 10px;
    --non-compliant-var: 10px;

    @media screen and (min-width: 500px), (max-width: 500px) {
        &::selection,
        .banaana[title] + & {
            --non-compliant-var: 200px;
            ${syntaxCompliantVar}: 400px;
            width: ${syntaxCompliantVar};
            height: var(--non-compliant-var);
        }
        color: red;
        padding: 10rem;
    }

    &:hover {
        content: 'undefined';
        --non-compliant-var: 0;

        @media print {
            display: none;
        }
    }
`);
