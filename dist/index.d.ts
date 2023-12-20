export type MustargsParsedValue = string | number | boolean;
export interface MustargsNestedObject {
    [key: string]: MustargsParsedValue | MustargsParsedValue[] | MustargsNestedObject;
}
export type MustargsParsedArgs = {
    [key: string]: MustargsParsedValue | MustargsParsedValue[] | MustargsNestedObject;
};
declare function mustargs(args: string[]): MustargsParsedArgs;
export default mustargs;
