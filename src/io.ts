import actions from "./actions.js";


const nino = actions("none", "none"),
  niso = actions("none", "single"),
  nimo = actions("none", "multiple"),
  sino = actions("single", "none"),
  siso = actions("single", "single"),
  simo = actions("single", "multiple"),
  mino = actions("multiple", "none"),
  miso = actions("multiple", "single"),
  mimo = actions("multiple", "multiple");
  

export { nino, niso, nimo, sino, siso, simo, mino, miso, mimo };