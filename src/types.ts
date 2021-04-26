type IOType = "none" | "single" | "multiple";
type Input = any;
type Inputs = Array<Input>;
type Output = Promise<any>;
type Outputs = Promise<Array<Output>>;
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

type SAMAOutput = Output | Outputs;
type SA = (options: SAInput) => SAMAOutput;
type MA = (options: MAInput) => SAMAOutput;

type SAMA = {
  sa: SA,
  ma: MA
};

export {
  IOType,
  Input,
  Inputs,
  Output,
  Outputs,
  Action,
  Actions,
  SAInput,
  SA,
  MAInput,
  MA,
  SAMAOutput,
  SAMA,
};