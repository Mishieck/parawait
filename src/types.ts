type Action = (input: Input, actionIndex: ActionIndex) => Output;
type ActionCount = number;
type ActionGetter = (index: number) => Action;
type ActionIndex = number;
type Actions = Array<Action>;
type ActionType = "single" | "multiple";

type Input = unknown;
type InputGetter = (index: number) => Input;
type Inputs = Array<Input>;
type InputType = ActionType | "none";

type FilterOutput = Boolean;
type Output = unknown;
type OutputGetter = () => Output | Outputs;
type Outputs = Array<Output>;
type OutputSetter = (output: Output, index: ActionIndex) => void;
type OutputType = InputType;

type Onerror = "throw" | "return" | "continue" | "break";

type PromisesOptions = {
  input?: Input;
  inputs?: Inputs;
  action?: Action;
  actions?: Actions;
  actionCount?: ActionCount;
  outputType?: OutputType;
  filterOutput?: FilterOutput;
  onerror?: Onerror;
};

type PromisesOutput = Promise<Output | Outputs>;
type Promises = (options: PromisesOptions) => PromisesOutput;

export {
  Action,
  ActionCount,
  ActionGetter,
  Actions,
  ActionType,
  Input,
  InputGetter,
  Inputs,
  InputType,
  Onerror,
  Output,
  OutputGetter,
  Outputs,
  OutputSetter,
  OutputType,
  Promises,
  PromisesOptions,
  PromisesOutput
};
