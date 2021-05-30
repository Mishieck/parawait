const Parawait = require("parawait/lib/cjs/main");

Parawait.all({
  action: () => console.info("Passed"),
  actionCount: 1
});
