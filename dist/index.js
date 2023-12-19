function mustargs(args) {
    const parsedArguments = {};
    for (let i = 0; i < args.length; i++) {
        if (args[i].startsWith('-')) {
            const key = args[i].replace(/^-+/, '');
            if (typeof parsedArguments[key] !== 'object' || parsedArguments[key] === null) {
                parsedArguments[key] = {};
            }
            let values = [];
            while (i + 1 < args.length && !args[i + 1].startsWith('-')) {
                i++;
                const valuePair = args[i];
                const parseValue = (val) => {
                    if (val === 'true')
                        return true;
                    if (val === 'false')
                        return false;
                    if (!isNaN(Number(val)))
                        return Number(val);
                    return val;
                };
                const parseArray = (val) => {
                    return val.split(',').map(parseValue);
                };
                if (valuePair.includes('=')) {
                    const [path, rawValue] = valuePair.split('=');
                    const value = rawValue.includes(',') ? parseArray(rawValue) : parseValue(rawValue);
                    if (path.includes('.')) {
                        let currentObject = parsedArguments[key];
                        const keys = path.split('.');
                        keys.forEach((nestedKey, index) => {
                            if (index === keys.length - 1) {
                                currentObject[nestedKey] = value;
                            }
                            else {
                                if (!currentObject[nestedKey] || typeof currentObject[nestedKey] !== 'object' || currentObject[nestedKey] === null) {
                                    currentObject[nestedKey] = {};
                                }
                                currentObject = currentObject[nestedKey];
                            }
                        });
                    }
                    else {
                        parsedArguments[key][path] = value;
                    }
                }
                else {
                    values.push(parseValue(valuePair));
                    parsedArguments[key] = valuePair.includes(',') ? parseArray(valuePair) : values.length <= 1 ? values[0] : values;
                }
            }
        }
    }
    return parsedArguments;
}
export default mustargs;
