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

Running multiple processes at once with no inputs and no outputs.

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

Functions `processes1`, `processes2` and `processes3` are invoked at once using `AwaitAll.promises`. The property `actions` of parameter to `AwaitAll.promises` specifies the processes that are run at once. The property `outputType` indicates the type of output expected. The default value of `outputType` is `"none"`. So, leaving it out would be okay in this case.

## Reduce

Finding the sum of numbers in an array.

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

The function `add` adds a number in the array `numbers` to the accumulated sum of previously added numbers. `AwaitAll.promises` is used to add the numbers. The property `action` specifies the function that is invoked multiple times at once. The property `inputs` specifies the inputs for the provided function. The property `outputType` indicates the type of output expected. Because the `sum` is not returned by `add`, the `outputType` is set to `"none"`.

## Reuse

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

  const formattedText = await AwaitAll.promises({
    actions: [toPascalCase, toKebabCase, toCamelCase],
    input: text,
    outputType: "multiple"
  });

  console.log(formattedText);
})();
```

The function `toPascalCase` converts the `text` to Pascal case. The function `toCamelCase` converts the `text` to Camel case. The function `toKebabCase`converts `text` to Kebab case.

## Filter

Filtering ages that are at least 18 from an array.

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

The function `isAtLeast18` checks if a given age is at least 18. It returns the age if it is 18 or greater. The property `filterOutput` indicates that only values that are not `undefined` should be returned from the outputs of `isAtLeast18`.

## Find

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

    const matchedUser = await AwaitAll.promises({
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

## Map

Doubling every number in an array.

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

The function `doubleNumber` doubles a given `number` and returns the result. Output is set to `"multiple"` because all the outputs are expected to be returned.

## Search

Search for posts that match a particular search text in an array of posts.

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

      const matchedProperties = Array.from(new Set(matches.flat()));
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

The function `searchPosts` returns all matching posts. The function `getMatchedPosts` returns an object containing a post and matched properties if a post matches the search text. The matched properties can be used to rank the posts or highlight the matched parts in a user interface. The function `searchWord` finds a matching post for a given word of the search text.
