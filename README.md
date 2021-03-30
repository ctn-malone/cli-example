Simple command-line program example using [qjs-ext-lib](https://github.com/ctn-malone/qjs-ext-lib)

# Compile

```
qjsc.sh -o program program.js
```

This will compile a static binary

# Usage

```
./program -h
Sample command-line program

https://github.com/ctn-malone/cli-example

Version 0.1.0

Usage: program [option]...

    -f, --first (*)       : first number
    -s, --second (*)      : second number
    -o, --operation (*)   : operation to perform (+,x)
    -v, --verbose         : display extra informations on stderr
    -h, --help            : print help

Examples:

    program -f 1 -s 1 -o + (result = 2)
    program -f 2 -s 2 -o x (result = 4)
```
