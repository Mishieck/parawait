const AwaitAll = require("await-all");

AwaitAll.promises({
  action: () => console.info("Passed"),
  actionCount: 1
});
