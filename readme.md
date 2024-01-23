# pure-vanilla-extract

A simple `css` template tag that allows you to write styled for @vanilla-extract in the **purest** form.

## Usage

In your \*.css.ts file...

### pure.css

```ts
import { css } from 'pure-vanilla-extract'
import { createVar, style } from '@vanilla-extract/css'

const veCompliantVar = createVar();

export const style(css`
    display: block;
    position: relative;

    ${veCompliantVar}: blue;
    color: ${veCompliantVar};

    /* Non-compliant variables can be used. They will NOT be prefixed, however. */
    --non-compliant-var: red;
    background-color: var(--non-compliant-var);

    /* MEDIA QUERIES */
    @media (min-width: 200px) {
        width: 300px;
        ${veCompliantVar}: black;
    }

    /* SELECTORS */
    /* If a selector rule does not include an &, it will be placed at the start of the rule! */
    :hover, &:hover {
        /* both resolve to: &:hover */
    }
    :hover > div {
        /* resolves to: &:hover > div */
    }
`)
```

### pure.assignVars

Use assignVars() within a `pure.css` call as you would with
`@vanilla-extract/css`.
