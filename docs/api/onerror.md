# Onerror

## Introduction

It is one of the properties of `options`, a parameter `promises`. It specifies what should happen if an error has been encountered while performing the provided actions. It is a string which can take four values, `break`, `continue`, `return` or `throw`. Let us look at what each one of these values means.

## `break`

This means that the promise will be resolved immediately with the available output. If multiple outputs are expected, the output array will be returned with the expected length. The outputs for the processes run successfully before then will be set on the appropriate indeces and the rest of the positions will be left empty.

## `continue`

This means that the promise will not be resolved untill all processes have been run. If an output is expected, the promise will be resolved with the output. However, the output for the failed process will be set to `undefined`.

## `return`

This means that the promise will be resolved immediately with no output.

## `throw`

This means that the promise will be rejected immediately with an error.