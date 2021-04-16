import actions from "./actions.js";


type Actions = {
  sa(): Promise<any>;
  ma(): Promise<any>;
};

// type IO = {
//   nino: Actions;
//   niso: Actions;
//   nimo: Actions;
//   sino: Actions;
//   siso: Actions;
//   simo: Actions;
//   mino: Actions;
//   miso: Actions;
//   mimo: Actions;
// };


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