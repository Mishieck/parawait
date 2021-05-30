# Quick Start Guide

**Table of Contents**

- [Introduction](#introduction)
- [Installation](#installation)
  - [CDN](#cdn)
  - [NPM](#npm)
- [Importing](#importing)
  - [CDN](#cdn-1)
  - [NPM](#npm-1)
- [Usage](#usage)
  - [Run](#run)
  - [Reduce](#reduce)
  - [Reuse](#reuse)
  - [Map](#map)
  - [Find](#find)
  - [Filter](#filter)
  - [Search](#search)

## Introduction

This an introductory guide to Parawait. We are going to look at how to install and use Parawait.

## Installation

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/parawait"></script>
```

or

```html
<script src="https://unpkg.com/parawait"></script>
```

### NPM

`$ npm i --save parawait`

## Importing

### CDN

```js
const { all } = Parawait;
```

### NPM

```js
import { all } from "parawait";
```

## Usage

### Run

Running multiple processes at once with no inputs and no outputs.

```js
(async () => {
  const process1 = () => console.info("Running process 1.");
  const process2 = () => console.info("Running process 2.");
  const process3 = () => console.info("Running process 3.");

  await all({
    actions: [process1, process2, process3],
    outputType: "none"
  });
})();
```

Functions `processes1`, `processes2` and `processes3` are invoked at once using `all`. The property `actions` of parameter to `all` specifies the processes that are run at once. The property `outputType` indicates the type of output expected. The default value of `outputType` is `"none"`. So, leaving it out would be okay in this case.

### Reduce

Finding the sum of numbers in an array.

```js
(async () => {
  const numbers = [1, 2, 3];
  let sum = 0;
  const add = (number) => (sum += number);

  await all({
    action: add,
    inputs: numbers,
    outputType: "none"
  });

  console.log(sum);
})();
```

The function `add` adds a number in the array `numbers` to the accumulated sum of previously added numbers. `all` is used to add the numbers. The property `action` specifies the function that is invoked multiple times at once. The property `inputs` specifies the inputs for the provided function. The property `outputType` indicates the type of output expected. Because the `sum` is not returned by `add`, the `outputType` is set to `"none"`.

### Reuse

Converting text into different case styles.

```js
(async () => {
  const text = "await all";

  const toPascalCase = (text) => {
    const firstCharToUpperCase = (word) => word.replace(/^\w/, (char) => char.toUpperCase());
    const words = text.trim().toLowerCase().split(/\s+/g);
    return words.map(firstCharToUpperCase).join("");
  };

  const toCamelCase = (text) => {
    let firstWord = "";

    text = text.replace(/^\w+/, (word) => {
      firstWord = word;
      return "";
    });

    return text ? [firstWord, toPascalCase(text.trim())].join("") : firstWord;
  };

  const toKebabCase = (text) => text.trim().toLowerCase().replace(/\s+/g, "-");

  const formattedText = await all({
    actions: [toPascalCase, toKebabCase, toCamelCase],
    input: text,
    outputType: "multiple"
  });

  console.log(formattedText);
})();
```

The function `toPascalCase` converts the `text` to Pascal case. The function `toCamelCase` converts the `text` to Camel case. The function `toKebabCase`converts `text` to Kebab case.

### Map

Doubling every number in an array.

```js
(async () => {
  const numbers = [1, 2, 3];

  const doubleNumber = (number) => {
    return number * 2;
  };

  const doubledNumbers = await all({
    action: doubleNumber,
    inputs: numbers,
    outputType: "multiple"
  });

  console.log(doubledNumbers);
})();
```

The function `doubleNumber` doubles a given `number` and returns the result. Output is set to `"multiple"` because all the outputs are expected to be returned.

### Find

Finding a user by ID in an array of user objects.

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

  const getUser = async (id) => {
    const getMatchedUser = (user) => {
      if (id === user.id) return user;
    };

    const matchedUser = await all({
      action: getMatchedUser,
      inputs: users,
      outputType: "single"
    });

    return matchedUser;
  };

  const user = await getUser(2);
  console.log(user);
})();
```

The function `getUser` returns a user that matches the provided `id`. The function `getMatchedUser` returns a user object if the property `id` matches. Because only one output is expected, `outputType` is set to `"single"`.

### Filter

Filtering products that are below a given price from an array.

```js
(async () => {
  const products = [
    {
      id: 1,
      name: "T-shirt",
      size: "lg",
      price: 100
    },
    {
      id: 2,
      name: "Socks",
      size: "md",
      price: 40
    },
    {
      id: 3,
      name: "Cap",
      size: "sm",
      price: 65
    }
  ];

  const getProductsBelowPrice = async (price) => {
    const getProductBelowPrice = (product) => {
      if (product.price < price) return product;
    };

    return all({
      action: getProductBelowPrice,
      inputs: products,
      outputType: "multiple",
      filterOutput: true,
      onerror: "continue"
    });
  };

  const productsBelowPrice = await getProductsBelowPrice(50);
  console.log(productsBelowPrice);
})();
```

The function `getProductsBelowPrice` checks if a given product is below a given price. It returns the product if it is below the price and `undefined` otherwise. The property `filterOutput` indicates that only values that are not `undefined` should be returned from the outputs of `getProductBelowPrice`. The property `onerror` specifies what should happen if any of the processes throws an error. Its value is set to `"continue"` which means that the error will be ignored and all results that will be successfully collected will be returned.

### Search

Search for posts that match a particular search text in an array of posts.

```js
(async () => {
  const posts = [
    {
      id: 1,
      author: 1,
      title: "About Parawait",
      description: `A JavaScript library for achieving concurrency and parallelism using all.`,
      tags: [
        "acom",
        "about",
        "javascript",
        "js",
        "library",
        "concurrency",
        "parallelism",
        "all"
      ]
    },
    {
      id: 2,
      author: 1,
      title: "Acom and Concurrency",
      description: `On processors with only one core, Acom runs processes concurrently.`,
      tags: ["acom", "concurrent", "single-core"]
    },
    {
      id: 3,
      author: 2,
      title: "Acom and Parallelism",
      description: `Acom runs processes in parallel on multi-core processors.`,
      tags: ["acom", "parallel", "multi-core"]
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

      const matches = await all({
        action: searchWord,
        inputs: words,
        outputType: "multiple",
        filterOutput: true
      });

      const matchedProperties = Array.from(new Set(matches.flat()));
      if (matchedProperties.length > 0) return {post, matchedProperties};
    };

    return all({
      action: getMatchedPost,
      inputs: posts,
      outputType: "multiple",
      filterOutput: true
    });
  };

  const matchedPosts = await searchPosts("call multiple functions in parallel using js");

  console.log(matchedPosts);
})();
```

The function `searchPosts` returns all matching posts. The function `getMatchedPosts` returns an object containing a post and matched properties if a post matches the search text. The matched properties can be used to rank the posts or highlight the matched parts in a user interface. The function `searchWord` finds a matching post for a given word of the search text.
