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

type OutputSetters = {
  [outputType in OutputType]: OutputSetter;
};

type OutputType = InputType;

type Onerror = "throw" | "return" | "continue" | "break";

type AllOptions = {
  input?: Input;
  inputs?: Inputs;
  action?: Action;
  actions?: Actions;
  actionCount?: ActionCount;
  outputType?: OutputType;
  filterOutput?: FilterOutput;
  onerror?: Onerror;
};

type AllOutput = Promise<Output | Outputs>;
type All = (options: AllOptions) => AllOutput;

export {
  Action,
  ActionCount,
  ActionGetter,
  Actions,
  ActionType,
  FilterOutput,
  Input,
  InputGetter,
  Inputs,
  InputType,
  Onerror,
  Output,
  OutputGetter,
  Outputs,
  OutputSetter,
  OutputSetters,
  OutputType,
  All,
  AllOptions,
  AllOutput
};
