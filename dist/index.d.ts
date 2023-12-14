type ParsedValue = string | number | boolean;
interface NestedObject {
    [key: string]: ParsedValue | ParsedValue[] | NestedObject;
}
type ParsedArgs = {
    [key: string]: ParsedValue | ParsedValue[] | NestedObject;
};
declare function mustargs(args: string[]): ParsedArgs;
export default mustargs;
