# Quick Start

__Table of Contents__

- [Quick Start](#quick-start)
  - [Introduction](#introduction)
  - [Run](#run)
  - [Reduce](#reduce)
  - [Reuse](#reuse)
  - [Filter](#filter)
  - [Find](#find)
  - [Map](#map)
  - [Search](#search)

## Introduction

## Run

```js
(async () => {
  const process1 = () => console.info("Running process 1.");
  const process2 = () => console.info("Running process 2.");
  const process3 = () => console.info("Running process 3.");

  await AwaitAll.promises({ actions: [process1, process2, process3], outputType: "none" });
})();
```

## Reduce

```js
(async () => {
  const numbers = [1, 2, 3];
  let sum = 0;
  const add = (number) => sum += number;

  await AwaitAll.promises({ action: add, inputs: numbers, outputType: "none" });
  console.log(sum);
})();
```

## Reuse

```js
(async () => {
  const text = "await all";
  const toPascalCase = (text) => // Convert to Pascal case;
  const toKebabCase = (text) => // Convert to Kebab case;
  const toCamelCase = (text) => // Convert to Camel case;

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
    filter: true
  });

  console.log(agesAtLeast18);
})();
```

## Find

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
    const getMatchedUser = (id) => {
      if (id === user.id) return user;
    }

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

```js
(async () => {
  const posts = [
    {
      id: 1,
      title: "First Post"
      description: "The first post ever created.",
      tags: ["post", "first"]
    },
    {
      id: 2,
      title: "Second Post"
      description: "The second post.",
      tags: ["post", "second"]
    },
    {
      id: 3,
      title: "Third Post"
      description: "The third post.",
      tags: ["post", "third"]
    }
  ];
  
  const searchPosts = async (text) => {
    const words = text.split(/\s*/);

    const getMatchedPost = async (post) => {
      const searchWord = (word) => {
        let matchedEntities = [];

        if (post.title.search(word)) matchedEntities.push["title"];
        if (post.description.search(word)) matchedEntities.push["description"];
        if (post.tags.includes(word)) matchedEntities.push["tags"];

        if (matchedEntities.length > 0) return matchedEntities;
      }

      const matches = await AwaitAll.promises({
        action: searchWord,
        inputs: words,
        outputType: "multiple",
        filter: true
      });

      const matchedEntities = matches.flat();
      if (matchedEntities.length > 0) return { id: post.id, matchedEntities };
    }

    return AwaitAll.promises({
      action: getMatchedPost,
      inputs: users,
      outputType: "multiple",
      filter: true
    });
  };

  const matchedPosts = await searchPosts("second");

  console.log(matchedPosts);
})();
```
