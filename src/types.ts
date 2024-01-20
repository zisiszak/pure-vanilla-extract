import { ComplexStyleRule } from '@vanilla-extract/css';
import { Properties } from 'csstype';

export type Interpolation<Props extends object> =
    | string
    | null
    | false
    | undefined
    | number
    | TemplateStringsArray
    | ComplexStyleRule
    | Interpolation<Props>[];

// utils from @VE
export interface ContainerProperties {
    container?: string;
    containerType?: 'size' | 'inline-size' | (string & {});
    containerName?: string;
}
export type CSSTypeProperties = Properties<number | (string & {})> &
    ContainerProperties;
export type CSSVarFunction =
    | `var(--${string})`
    | `var(--${string}, ${string | number})`;
export type CSSProperties = {
    [Property in keyof CSSTypeProperties]:
        | CSSTypeProperties[Property]
        | CSSVarFunction
        | Array<CSSVarFunction | CSSTypeProperties[Property]>;
};
