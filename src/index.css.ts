import { createThemeContract, style } from '@vanilla-extract/css';
import { css } from '.';
import { assignVars } from './index.js';

export const testTheme = createThemeContract({
    test: {
        variable: null,
        variable2: 'aaa',
    },
    test2: 'lol',
});

export const testeroni = style(css`
    ${assignVars(testTheme, {
        test: {
            variable: 'red',
        },
        test2: 'banana',
    })}

    display: none;
    background-color: ${testTheme.test.variable};

    @media (min-width: 600px) {
        ${assignVars(testTheme, {
            test: {
                variable: 'blue',
            },
        })}
    }
`);

export const test2 = style(css`
    display: block;
`);
