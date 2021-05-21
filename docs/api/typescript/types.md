# Types

## Introduction

## Action

### Description

User defined function.

### Structure

```ts
(input: Input, actionIndex: number) => Output | Promise<Output>
```

## ActionCount

### Description

The number of [`Actions`](#actions) provided or the number of times a particular action must be performed if only one action has been provided.

### Structure

```ts
number
```

## ActionIndex

### Description

The position of an [`Action`](#action) in the promise schedule. If multiple [`Actions`](#actions) have been provided, it is the index of the action in the array. If only one action has been provided, it will be the index of the current input if multiple inputs have been provided. If a single input or no inputs have been provided, it is the position at which the function is involked.

### Structure

```ts
any
```

## Actions

### Description

User defined functions.

### Structure

```ts
Array<Action>
```

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
any
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
"throw" | "return" | "continue" | "break"
```

#### `break`

This means that the promise will be resolved immediately with the available output. If multiple outputs are expected, the output array will be returned with the expected length. The outputs for the processes run successfully before then will be set on the appropriate indeces and the rest of the positions will be left empty.

#### `continue`

This means that the promise will not be resolved untill all processes have been run. If an output is expected, the promise will be resolved with the output. However, the output for the failed process will be set to `undefined`.

#### `return`

This means that the promise will be resolved immediately with no output.

#### `throw`

This means that the promise will be rejected immediately with an error.

## Output

### Description

Output of user defined functions.

### Structure

```ts
any
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

## Promises

### Description

Used to run multiple processes at once.

### Structure

```ts
(options: PromisesOptions) => PromisesOutput
```

## PromisesOptions

### Description

Input for [`promises`](#promises).

### Structure

```ts
type PromisesOptions = {
  input?: Input,
  inputs?: Inputs,
  action?: Action,
  actions?: Actions,
  actionCount?: ActionCount,
  outputType?: OutputType,
  filterOutput?: FilterOutput,
  onerror?: Onerror
}
```
