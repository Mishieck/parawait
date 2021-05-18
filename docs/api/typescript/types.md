# Types

## Introduction

## Abbreviations

## Input

### Description

An input of a user-defined function.

### Structure

```js
any
```

## Inputs

### Description

Inputs of user-defined functions.

### Structure

```js
Array<Input>
```

## Output

### Description

Output of a user defined functions.

### Structure

```js
any
```

## Outputs

### Description

Outputs of user defined functions.

### Structure

```js
Array<Output>
```

## ActionIndex

### Description

The position of an [`Action`](#action) in the promise schedule. If multiple [`Actions`](#actions) are provided, it is the index of the action in the array. If only one action has been provided, it will be the index of the current input if multiple inputs have been provided. If a single input or no inputs have been provided, it is the position at which the function is involked.

### Structure

```js
any
```

## Action

### Description

User defined function.

### Structure

```js
(input: Input, actionIndex: number) => Output | Promise<Output>
```

## Actions

### Description

User defined functions.

### Structure

```js
Array<Action>
```

## ActionCount

### Description

The number of [`Actions`](#actions) provided or the number of times a particular action must be performed if only one action has been provided.

### Structure

```js
number
```

## FilterOutput

### Description

Indicates whether or not the expected [`Outputs`](#outputs) should be filtered. If true, they will be filtered. Any value that is `undefined` will be excluded from the filtered outputs.

### Structure

```js
Boolean
```

## SAMAInput

### Description

A partial type of the input of [`SAMA`](#sama) methods.

### Structure

```js
{
  input?: Input;
  inputs?: Inputs;
  filterOutput?: FilterOutput;
};
```

## SAInput

### Description

An input of [`SA`](#sa).

### Structure

```js
SAMAInput & {
  action: Action;
  actionCount: ActionCount;
}
```

## MAInput

### Description

An input of [`MA`](#ma).

### Structure

```js
SAMAInput & {
  actions: Actions
}
```

## SAMAOutput

### Description

The out put of [`SAMA`](#sama) methods.

### Structure

```js
Promise<Output | Outputs>
```

## SA

### Description

The method used if you want to involke one function multiple times.

### Structure

```js
(options: SAInput) => SAMAOutput
```

## MA

### Description

The method used if you want to involke multiple unique functions.

### Structure

```js
(options: MAInput) => SAMAOutput
```

## SAMA

### Description

An object containing [`SA`](#sa) and [`MA`](#ma).

### Structure

```js
{
  sa: SA,
  ma: MA
}
```
