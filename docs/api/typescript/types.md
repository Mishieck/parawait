# Types

## Introduction

This is a documentation of all types exposed via the [API](./api.md). The following sections describe these types in detail. Refer to this part of the documentation every time you encounter a type in the documentation that you do not recognize as a TypeScript native type.

## Action

### Description

User defined function.

### Structure

```ts
(input: Input, actionIndex: number) => Output | Promise<Output>
```

## ActionCount

### Description

A property of [allOptions](#alloptions) that specifies the number of times an [Action](#action) must be performed if only one action has been provided. If multiple [Inputs](#inputs) have been provided, it is not required. This is because the number of inputs should always be equal to the number of times an action is performed.

### Structure

```ts
number
```

## ActionIndex

### Description

The position of an [`Action`](#action) in the promise schedule. If multiple [`Actions`](#actions) have been provided, it is the index of the action in the array. If only one action has been provided, it will be the index of the current input if multiple inputs have been provided. If a single input or no inputs have been provided, it is the position at which the function is involked.

### Structure

```ts
number
```

## Actions

### Description

User defined functions.

### Structure

```ts
Array<Action>
```

## All

### Description

Used to run multiple processes at once. It can be used to either run a single process multiple times or run multiple unique processes at once.

### Structure

```ts
(options: AllOptions) => AllOutput
```

## AllOptions

### Description

Input for [`all`](#all).

### Structure

```ts
type AllOptions = {
  action?: Action;
  actionCount?: ActionCount;
  actions?: Actions;
  filterOutput?: FilterOutput;
  input?: Input;
  inputs?: Inputs;
  onerror?: Onerror;
  outputType?: OutputType;
}
```

### Properties

- `action`: A single function to be invoked multiple times.
- `actionCount`: Used when only when a single function has been provided. If multiple inputs have been used, there is no need to include this property because the number of inputs always equals the number of times the provided function is supposed to be invoked.
- `actions`: Multiple functions to be invoked at once.
- `filterOutput`: Specifies whether or not to filter outputs. This is used when multiple outputs are expected.
- `input`: A single input that is used as an argument every time a function is called.
- `inputs`: Multiple inputs that are used as arguments to the provided function(s).
- `onerror`: Used to indicate what should happen is an error occurs.
- `outputType`: Specifies what type of output should be returned. The default value is `"none"`

## FilterOutput

### Description

Indicates whether or not the expected [`Outputs`](#outputs) should be filtered. If true, they will be filtered. Any value that is `undefined` will be excluded from the filtered outputs.

### Structure

```ts
Boolean
```

## Input

### Description

An input of user-defined functions.

### Structure

```ts
unknown
```

## Inputs

### Description

Inputs of user-defined functions.

### Structure

```ts
Array<Input>
```

## Onerror

### Description

Specifies what should be done in case any of the functions provided throws an error or rejects a promise. It specifies whether the promise should be fulfilled or rejected. An if it should be fulfilled, how it should be fulfilled.

### Structure

```ts
"throw" | "return" | "continue" | "break";
```

Refer to [On Error](../onerror.md) for more information.

## Output

### Description

Output of user defined functions.

### Structure

```ts
unknown
```

## Outputs

### Description

Outputs of user defined functions.

### Structure

```ts
Array<Output>
```

## OutputType

### Description

Used to specify the type of output expected.

### Structure

```ts
"none" | "single" | "multiple"
```
