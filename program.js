import * as std from 'std';
import * as os from 'os';

import arg from 'ext/arg.js';
import * as path from 'ext/path.js';

const VERSION = '0.1.0';

const mySelf = path.getScriptName(true);

/*
    generate usage message
 */
const getUsage = () => {
    const message = `
Usage: ${mySelf} [option]...

    -f, --first (*)       : first number
    -s, --second (*)      : second number
    -o, --operation (*)   : operation to perform (+,x)
    -v, --verbose         : display extra informations on stderr
    -h, --help            : print help
`.trim();
    return message;
}

/*
    generate help message (displayed when using --help)
 */
const getHelp = () => {
    // program purpose
    const message = `
Sample command-line program

https://github.com/ctn-malone/cli-example

Version ${VERSION}
`.trimStart();

    // some examples to display
    const examples = `
Examples:

    ${mySelf} -f 1 -s 1 -o + (result = 2)
    ${mySelf} -f 2 -s 2 -o x (result = 4)
`.trimStart();
    return `${message}\n${getUsage()}\n\n${examples}`;
}

/*
    arguments parsing
 */
let args;
try {
    args = arg({
        // first number
        '--first': (val, name, prev, index) => {
            const value = val.trim();
            const num = parseInt(value);
            if (isNaN(num)) {
                const err = new Error(`Invalid option value: ${n} ${value} (should be an integer)`);
                err.code = 'ARG_INVALID_OPTION';
                throw err;
            }
            return num;
        },
        // second number
        '--second': (val, name, prev, index) => {
            const value = val.trim();
            const num = parseInt(value);
            if (isNaN(num)) {
                const err = new Error(`Invalid option value: ${n} ${value} (should be an integer)`);
                err.code = 'ARG_INVALID_OPTION';
                throw err;
            }
            return num;
        },
        // operation
        '--operation': (val, name, prev, index) => {
            const operations = ['+', 'x'];
            if (!operations.includes(val)) {
                const err = new Error(`Invalid option value: ${n} ${value} (should be one of [${operations.join(',')}])`);
                err.code = 'ARG_INVALID_OPTION';
                throw err;
            }
            return val;
        },
        '--verbose': Boolean,
        '--help': Boolean,
        // aliases
    	'-h': '--help',
        '-f': '--first',
        '-s': '--second',
        '-o': '--operation',
        '-v': '--verbose'
    });
}
catch (e) {
    switch (e.code) {
        case 'ARG_UNKNOWN_OPTION':
        case 'ARG_INVALID_OPTION':
        case 'ARG_MISSING_REQUIRED_SHORTARG':
        case 'ARG_MISSING_REQUIRED_LONGARG':
            std.err.printf(`${e.message.trim()}\n`);
            std.err.printf(`${getUsage()}\n`);
            std.exit(2);
    }
    throw e;
}
if (args['--help']) {
    std.err.printf(`${getHelp()}\n`);
    std.exit(2);
}
// ensure all required arguments were provided
['--first', '--second', '--operation'].forEach((n) => {
    if (undefined === args[n]) {
        std.err.printf(`Option ${n} is required\n`);
        std.err.printf(`${getUsage()}\n`);
        std.exit(2);
    }
});

// display extra information on stderr
if (args['--verbose']) {
    std.err.puts(`${args['--first']} ${args['--operation']} ${args['--second']}\n`)
}

// compute result
let result;
if ('+' == args['--operation']) {
    result = args['--first'] + args['--second'];
}
else {
    result = args['--first'] * args['--second'];
}

std.out.puts(`${result}\n`);
