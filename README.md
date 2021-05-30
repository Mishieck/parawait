# AwaitAll

## Introduction

AwaitAll is a JavaScript library for achieving concurrency and parallelism using promises. On single-core processors, the processes are run concurrently. On multi-core processors, the processes are run in parallel.

## Features

JavaScript provides native ways of running multiple processes at once. These include `Promise.all`, `Promise.race`, `Promise.any` and `Promise.allSettled`. The similarity between AwaitAll and the aforementioned methods is that they all use promises. However, there are a few significant differences between these methods and AwaitAll in terms of how they differ in terms of how they run the processes. Let us look at the features of AwaitAll.

### Memory Efficiency

All of the JavaScript native methods take an array of promises as the parameter. However, AwaitAll does not use an array of promises. This makes it more memory efficient.

### Synchronous Functions

The functions you want to run at once do not have to be asynchronous. AwaitAll wraps all functions in promises on your behalf.

### Error Handling

AwaitAll gives you the choice to choose how errors should be handled. You can choose whether or not the promise should be rejected. You can also choose whether or not the promised should resolve with an output.

## Quick Start

Refer to our [Quick Start Guide](./docs/quick-start.md) for a quick introduction to how AwaitAll works.

## Documentation

Refer to our [Documentation](./docs/home.md) for an in-depth look at AwaitAll.

## License

This library is under the [MIT Licence](https://).

Copyright (c) 2021, **Mishieck Mwale**.
