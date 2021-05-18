type IOType = "none" | "single" | "multiple";
type Input = any;
type Inputs = Array<Input>;
type Output = any;
type Outputs = Array<Output>;
type ActionIndex = number;
type Action = (input: Input, actionIndex: ActionIndex) => Output;
type Actions = Array<Action>;
type FilterOutput = Boolean;
type ActionCount = number;

type SAMAInput = {
  input?: any;
  inputs?: Array<any>;
  filterOutput?: FilterOutput;
};

type SAInput = SAMAInput & {
  action: Action;
  actionCount: ActionCount;
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