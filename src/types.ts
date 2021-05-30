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

type allOptions = {
  input?: Input;
  inputs?: Inputs;
  action?: Action;
  actions?: Actions;
  actionCount?: ActionCount;
  outputType?: OutputType;
  filterOutput?: FilterOutput;
  onerror?: Onerror;
};

type allOutput = Promise<Output | Outputs>;
type all = (options: allOptions) => allOutput;

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
  all,
  allOptions,
  allOutput
};
