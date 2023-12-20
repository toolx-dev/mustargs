export type MustargsParsedValue = string | number | boolean;

export interface MustargsNestedObject {
    [key: string]: MustargsParsedValue | MustargsParsedValue[] | MustargsNestedObject;
}

export type MustargsParsedArgs = {
    [key: string]: MustargsParsedValue | MustargsParsedValue[] | MustargsNestedObject;
};

function mustargs(args: string[]): MustargsParsedArgs {
    const parsedArguments: MustargsParsedArgs = {};

    for (let i = 0; i < args.length; i++) {
        if (args[i].startsWith('-')) {
            const key: string = args[i].replace(/^-+/, '');
            if (typeof parsedArguments[key] !== 'object' || parsedArguments[key] === null) {
                parsedArguments[key] = {};
            }

            let values = [];

            while (i + 1 < args.length && !args[i + 1].startsWith('-')) {
                i++;
                const valuePair: string = args[i];

                const parseValue = (val: string): MustargsParsedValue => {
                    if (val === 'true') return true;
                    if (val === 'false') return false;
                    if (!isNaN(Number(val))) return Number(val);
                    return val;
                };

                const parseArray = (val: string): MustargsParsedValue[] => {
                    return val.split(',').map(parseValue);
                };

                if (valuePair.includes('=')) {
                    const [path, rawValue] = valuePair.split('=');
                    const value: MustargsParsedValue | MustargsParsedValue[] = rawValue.includes(',') ? parseArray(rawValue) : parseValue(rawValue);

                    if (path.includes('.')) {
                        let currentObject: MustargsNestedObject = parsedArguments[key] as MustargsNestedObject;
                        const keys: string[] = path.split('.');
                        keys.forEach((nestedKey, index) => {
                            if (index === keys.length - 1) {
                                currentObject[nestedKey] = value;
                            } else {
                                if (!currentObject[nestedKey] || typeof currentObject[nestedKey] !== 'object' || currentObject[nestedKey] === null) {
                                    currentObject[nestedKey] = {};
                                }
                                currentObject = currentObject[nestedKey] as MustargsNestedObject;
                            }
                        });
                    } else {
                        (parsedArguments[key] as MustargsNestedObject)[path] = value;
                    }
                } else {
                    values.push(parseValue(valuePair))
                    parsedArguments[key] = valuePair.includes(',') ? parseArray(valuePair) : values.length <= 1 ? values[0] : values;
                }
            }
        }
    }

    return parsedArguments;
}

export default mustargs;
