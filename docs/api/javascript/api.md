# API

__Table of Contents__

- [Introduction](#introduction)
- [`promises`](#promises)
  - [Syntax](#syntax)
  - [Parameters](#parameters)
  - [Return Value](#return-value)
  - [Promises Options](#promises-options)
    - [Structure](#structure)
    - [Properties](#properties)

## Introduction

This is the API documentation recommended for JavaScript developers who are not familiar with TypeScript.

## `promises`

### Syntax

```js
promises(options)
```

### Parameters

- `options`:
  - Type: `Object`
  - Required: Yes
  - Usage: Used to do the following:
    - Provide functions you want to run.
    - Provide inputs to the functions
    - Specify how the output should be returned.
    - Specify what should happen is an error is encountered.
  - Reference: [Promises Options](#promises-options).

### Return Value

A promise that resolves to a value as specified in `options`.

### Promises Options

The input to [`promises`](#promises).

#### Structure

```js
{
  action: Function,
  actionCount: number,
  actions: Array,
  filterOutput: boolean,
  input: any,
  inputs: Array,
  onerror: string,
  outputType: string
}
```

#### Properties

`action`

The function you want to run multiple times at once.

`actionCount`

Specifies how many times a function is supposed to be called. It is used only when a single `action` has been provided. If multiple `inputs` have been provided, there is no need to add `actionCount` to `options` because the number of inputs always equal the number of times the provided action is invoked.

`actions`

An array of functions you want to run at once.

`filterOutput`

Specifies whether or not the outputs should be filters. It is used when multiple outputs are expected. The default value is `false`;

`input`

An input of that will be used in the provided function(s).

`inputs`

An array of inputs that will be used in the provided function(s).

`onerror`

Specifies what should happen if an error has been encountered. Refer to [On Error](../onerror.md) for more information.

`outputType`

Specifies what type of output should be returned. It can be any of the following values:

- `none`: This means that no output is expected.
- `single`: This means that only a single output should be returned.
- `multiple`: This means that multiple outputs should be returned.
