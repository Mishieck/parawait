# AwaitAll

## Introduction

AwaitAll is a JavaScript library for concurrency and parallelism using promises. You can achieve concurrency and parallelism without using workers. AwaitAll provides various ways of running processes at once.

## Features

JavaScript provides native ways of running processes at once. These include `Promise.all`, `Promise.race` and `Promise.allSettled`. The similarity between AwaitAll and the aforementioned methods is that they all use promises.

### Memory Efficiency

All of the JavaScript native methods take an array of promises as the parameter. However, AwaitAll does not require you to make an array of promises. It does not event use an array of promises under the hood. This makes it more memory efficient.

### Synchronous Functions

The functions you want to run at once do not have to be synchronous. AwaitAll promisifies all functions on your behalf.

### A Variaty of Methods

AwaitAll provides various methods to suit different needs. You can use different methods based on how many inputs you provide, how many outputs you expect and how many unique functions you want to invoke.

## Quick Start

Refer to our [Quick Start Guide](./docs/quick-start.md) for a quick introduction to how AwaitAll works.

## Documentation

Refer to our [Documentation](./docs/home.md) for an in-depth look at AwaitAll.

## License

This library is under the [MIT Licence](https://).

(c) 2021, __Mishieck Mwale__.
