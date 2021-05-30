import {
  Action,
  ActionCount,
  ActionGetter,
  Input,
  InputGetter,
  Onerror,
  OutputGetter,
  OutputSetter,
  PromisesOutput
} from "./types";

type PerformActionInput = {
  getAction: ActionGetter;
  actionCount: ActionCount;
  getInput: InputGetter;
  setOutput: OutputSetter;
  getOutput: OutputGetter;
  onerror: Onerror;
};

type PerformActions = (options: PerformActionInput) => PromisesOutput;
type Promisify = (action: Action, input: Input, actionIndex: number) => PromisesOutput;

type RejectionHandlers = {
  [onerror in Onerror]: RejectionHandler;
};

type RejectionHandler = (reason: Object) => void;
type CreateRejectionHandlers = (resolve: Function, reject: Function, getOutput: OutputGetter) => RejectionHandlers;

const performActions: PerformActions = (options) => {
  const { getAction, actionCount, getInput, setOutput, getOutput, onerror = "throw" } = options;

  return new Promise((resolve: Function, reject: Function) => {
    let resolveCount: number = actionCount;
    const onReject = createRejectionHandlers(resolve, reject, getOutput)[onerror];

    for (let actionIndex = 0; actionIndex < actionCount; actionIndex++) {
      promisify(getAction(actionIndex), getInput(actionIndex), actionIndex)
        .then((output: any) => {
          setOutput(output, actionIndex);
          --resolveCount || resolve(getOutput());
        })
        .catch((reason: Object) => onReject(reason));
    }
  });
};

const promisify: Promisify = async (action, input, actionIndex) => action(input, actionIndex);

const createRejectionHandlers: CreateRejectionHandlers = (resolve, reject, getOutput) => {
  return {
    throw: (reason) => reject(reason),
    return: () => resolve(),
    break: () => resolve(getOutput()),
    continue: () => undefined
  };
};

export default performActions;
