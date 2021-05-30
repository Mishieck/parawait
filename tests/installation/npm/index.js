const parawait = require("parawait/lib/cjs/main");

parawait.all({
  action: () => console.info("Passed"),
  actionCount: 1
});
