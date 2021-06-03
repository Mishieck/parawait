# API

**Table of Contents**

- [API](#api)
  - [Introduction](#introduction)
  - [`all`](#all)
    - [Description](#description)
    - [Syntax](#syntax)
    - [Parameters](#parameters)
    - [Return Value](#return-value)
    - [all Options](#all-options)
      - [Structure](#structure)
      - [Properties](#properties)
  - [`chunk`](#chunk)
    - [Description](#description-1)
    - [Syntax](#syntax-1)
    - [Parameters](#parameters-1)
    - [Return Value](#return-value-1)
    - [chunk Options](#chunk-options)
      - [Structure](#structure-1)
      - [Properties](#properties-1)

## Introduction

This is the API documentation recommended for JavaScript developers who are not familiar with TypeScript.

## `all`

### Description

Used to run multiple processes at once.

### Syntax

```js
all(options);
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
  - Reference: [all Options](#all-options).

### Return Value

A promise that resolves to a value as specified in `options`.

### all Options

The input to [`all`](#all).

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

- `action`: The function you want to run multiple times at once.
- `actionCount`: Specifies how many times a function is supposed to be called. It is used only when a single `action` has been provided. If multiple `inputs` have been provided, there is no need to add `actionCount` to `options` because the number of inputs always equal the number of times the provided action is invoked.
- `actions`: An array of functions you want to run at once.
- `filterOutput`: Specifies whether or not the outputs should be filters. It is used when multiple outputs are expected. The default value is `false`.
- `input`: An input of that will be used in the provided function(s).
- `inputs`: An array of inputs that will be used in the provided function(s).
- `onerror`: Specifies what should happen if an error has been encountered. Refer to [On Error](../onerror.md) for more information.
- `outputType`: Specifies what type of output should be returned. The default value is `"none"`. It can be any of the following values:
  - `none`: This means that no output is expected.
  - `single`: This means that only a single output should be returned.
  - `multiple`: This means that multiple outputs should be returned.

## `chunk`

### Description

Used to perform a single action multiple times on multiple inputs in chunks. Actions in a chunk are performed at once. Chunks are consumed sequentially.

### Syntax

```js
chunk(options);
```

### Parameters

- `options`:
  - Type: `Object`
  - Required: Yes
  - Usage: Used to do the following:
    - Provide an action you want to run in chunks.
    - Provide inputs to the function.
    - Specify the size of the chunks.
    - Provide an action to perform on each chunk.
    - Specify how the output should be returned.
    - Specify what should happen is an error is encountered.
  - Reference: [chunk Options](#chunk-options).

### Return Value

A promise that resolves to a value as specified in `options` or `undefined` if `chunkAction` is provided.

### chunk Options

The input to [`chunk`](#chunk).

#### Structure

```js
{
  action: Function,
  filterOutput: boolean,
  input: any,
  inputs: Array,
  onerror: string,
  outputType: string
}
```

#### Properties

- `action`: The function you want to run multiple times in chunks.
- `chunkAction`: The function you want to call on each chunk. If provided, the value of `outputType` is assumed to be `"none"`.
- `chunkSize`: The size of each chunk.
- `filterOutput`: Specifies whether or not the outputs should be filters. It is used when multiple outputs are expected. The default value is `false`.
- `inputs`: An array of inputs that will be used in the provided function(s).
- `onerror`: Specifies what should happen if an error has been encountered. Refer to [On Error](../onerror.md) for more information.
- `outputType`: Specifies what type of output should be returned. The default value is `"none"`. It can be any of the following values:
  - `none`: This means that no output is expected.
  - `single`: This means that only a single output should be returned.
  - `multiple`: This means that multiple outputs should be returned.
