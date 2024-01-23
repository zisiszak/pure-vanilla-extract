export { type ComplexStyleRule } from '@vanilla-extract/css';
import { type Properties } from 'csstype';

// utils from @VE

// Tokens
export type VE_NullableTokens = {
    [key: string]: string | VE_NullableTokens | null;
};
export type VE_Tokens = {
    [key: string]: string | VE_Tokens;
};

// Properties
export interface VE_ContainerProperties {
    container?: string;
    containerType?: 'size' | 'inline-size' | (string & {});
    containerName?: string;
}
export type VE_CSSTypeProperties = Properties<number | (string & {})> &
    VE_ContainerProperties;
export type VE_CSSVarFunction =
    | `var(--${string})`
    | `var(--${string}, ${string | number})`;
export type VE_CSSProperties = {
    [Property in keyof VE_CSSTypeProperties]:
        | VE_CSSTypeProperties[Property]
        | VE_CSSVarFunction
        | Array<VE_CSSVarFunction | VE_CSSTypeProperties[Property]>;
};

// Theme Vars
export type VE_ThemeVars<ThemeContract extends VE_NullableTokens> =
    VE_MapLeafNodes<ThemeContract, VE_CSSVarFunction>;

// Contracts and Primitives
export type VE_Primitive = string | boolean | number | null | undefined;
export type VE_MapLeafNodes<Obj, LeafType> = {
    [Prop in keyof Obj]: Obj[Prop] extends VE_Primitive
        ? LeafType
        : Obj[Prop] extends Record<string | number, any>
          ? VE_MapLeafNodes<Obj[Prop], LeafType>
          : never;
};
export type VE_Contract = {
    [key: string]: VE_CSSVarFunction | null | VE_Contract;
};
