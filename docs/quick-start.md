# Quick Start Guide

**Table of Contents**

- [Quick Start Guide](#quick-start-guide)
  - [Introduction](#introduction)
  - [Installation](#installation)
    - [CDN](#cdn)
    - [NPM](#npm)
  - [Run](#run)
  - [Reduce](#reduce)
  - [Reuse](#reuse)
  - [Filter](#filter)
  - [Find](#find)
  - [Map](#map)
  - [Search](#search)

## Introduction

In this guide we are going to look at some examples of how to use AwaitAll. We are going to use A CDN to for this guide.

## Installation

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/await-all"></script>
```

or

```html
<script src="https://unpkg.com/await-all"></script>
```

### NPM

`$ npm i --save await-all`

## Run

Let us run a few processes at once. We will use the function `promises`, the only export of AwaitAll. The function takes, only one parameter, an object containing options which specify functions, inputs, the expected output and more.

```js
(async () => {
  const process1 = () => console.info("Running process 1.");
  const process2 = () => console.info("Running process 2.");
  const process3 = () => console.info("Running process 3.");

  await AwaitAll.promises({
    actions: [process1, process2, process3],
    outputType: "none"
  });
})();
```

## Reduce

Let us look at how you can reduce an array of inputs into a single value. We are going to add multiple numbers at once.

```js
(async () => {
  const numbers = [1, 2, 3];
  let sum = 0;
  const add = (number) => (sum += number);

  await AwaitAll.promises({
    action: add,
    inputs: numbers,
    outputType: "none"
  });

  console.log(sum);
})();
```

## Reuse

Let us see how we can use a single input to run multiple unique processes. We are going to format a string in Pascal case, Kebab case and Camel case.

```js
(async () => {
  const text = "await all";

  const toPascalCase = (text) => {
    const firstCharToUpperCase = (word) => word.replace(/^\w/, (char) => char.toUpperCase());
    const words = text.trim().toLowerCase().split(/\s+/g);
    return words.map(firstCharToUpperCase).join("");
  };

  const toKebabCase = (text) => text.trim().toLowerCase().replace(/\s+/g, "-");

  const toCamelCase = (text) => {
    let firstWord = "";

    text = text.replace(/^\w+/, (word) => {
      firstWord = word;
      return "";
    });

    return text ? [firstWord, toPascalCase(text.trim())].join("") : firstWord;
  };

  const formattedText = await AwaitAll.promises({
    actions: [toPascalCase, toKebabCase, toCamelCase],
    input: text,
    outputType: "multiple"
  });

  console.log(formattedText);
})();
```

## Filter

```js
(async () => {
  const ages = [17, 18, 21];

  const isAtLeast18 = (age) => {
    if (age >= 18) return age;
  };

  const agesAtLeast18 = await AwaitAll.promises({
    action: isAtLeast18,
    inputs: ages,
    outputType: "multiple",
    filterOutput: true
  });

  console.log(agesAtLeast18);
})();
```

## Find

We are going to look at how you can find a single value that matches particular conditions in an array. We are going to find a user with a particular ID in an array of users.

```js
(async () => {
  const users = [
    {
      id: 1,
      name: "First User"
    },
    {
      id: 2,
      name: "Second User"
    },
    {
      id: 3,
      name: "Third User"
    }
  ];

  const getUser = (id) => {
    const getMatchedUser = (user) => {
      if (id === user.id) return user;
    };

    await AwaitAll.promises({
      action: getMatchedUser,
      inputs: users,
      outputType: "single"
    });
  };

  const user = await getUser(2);
  console.log(user);
})();
```

## Map

We are going to convert an array of numbers to another array containing numbers that are double the corresponding numbers in the original array.

```js
(async () => {
  const numbers = [1, 2, 3];

  const doubleNumber = (number) => {
    return number * 2;
  };

  const doubledNumbers = await AwaitAll.promises({
    action: doubleNumber,
    inputs: numbers,
    outputType: "multiple"
  });

  console.log(doubledNumbers);
})();
```

## Search

We are going to find a post that match a particular search string in an array of posts.

```js
(async () => {
  const posts = [
    {
      id: 1,
      author: 1,
      title: "First Post",
      description: "The first post ever created.",
      tags: ["post", "first"]
    },
    {
      id: 2,
      author: 1,
      title: "Second Post",
      description: "The second post.",
      tags: ["post", "second"]
    },
    {
      id: 3,
      author: 2,
      title: "Third Post",
      description: "The third post.",
      tags: ["post", "third"]
    }
  ];

  const searchPosts = async (text) => {
    const words = text.split(/\s+/g);

    const getMatchedPost = async (post) => {
      const searchWord = (word) => {
        const wordRegex = new RegExp(word, "gi");
        let matchedProperties = [];

        if (post.title.search(wordRegex) !== -1) matchedProperties.push("title");
        if (post.description.search(wordRegex) !== -1) matchedProperties.push("description");
        if (post.tags.includes(word)) matchedProperties.push("tags");

        if (matchedProperties.length > 0) return matchedProperties;
      };

      const matches = await AwaitAll.promises({
        action: searchWord,
        inputs: words,
        outputType: "multiple",
        filterOutput: true
      });

      const matchedProperties = matches.flat();
      if (matchedProperties.length > 0) return {post, matchedProperties};
    };

    return AwaitAll.promises({
      action: getMatchedPost,
      inputs: posts,
      outputType: "multiple",
      filterOutput: true
    });
  };

  const matchedPosts = await searchPosts("second");

  console.log(matchedPosts);
})();
```
