type IOType = "none" | "single" | "multiple";
type Input = any;
type Inputs = Array<Input>;
type Output = any;
type Outputs = Array<Output>;
type Action = (input: Input, actionIndex: number) => Output;
type Actions = Array<Action>;

type SAMAInput = {
  input?: any;
  inputs?: Array<any>;
  filterOutput?: boolean;
};

type SAInput = SAMAInput & {
  action: Action;
  actionCount: number;
};

type MAInput = SAMAInput & {
  actions: Actions;
};

type SAMAOutput = Promise<Output | Outputs>;
type SA = (options: SAInput) => SAMAOutput;
type MA = (options: MAInput) => SAMAOutput;

type SAMA = {
  sa: SA,
  ma: MA
};

export {
  Action,
  Actions,
  IOType,
  Input,
  Inputs,
  MA,
  MAInput,
  Output,
  Outputs,
  SA,
  SAInput,
  SAMA,
  SAMAOutput,
};