import performActions from "./perform-actions";
import {
  OutputType,
  OutputSetter,
  OutputSetters,
  Inputs,
  Outputs,
  Action,
  AllOutput,
  ActionGetter,
  InputGetter,
  OutputGetter,
  Output,
  Onerror
} from "./types";

type ChunkOutputSetters = OutputSetters & {
  chunk: OutputSetter;
};

type ChunkInput = {
  inputs: Inputs;
  action: Action;
  chunkSize: number;
  chunkAction?: (outputChunk: Outputs) => Promise<void>;
  outputType: OutputType;
  onerror: Onerror;
};

type Chunk = (options: ChunkInput) => AllOutput;

const chunk: Chunk = async ({ inputs, action, chunkSize, chunkAction, outputType = "none", onerror }) => {
  const getAction: ActionGetter = () => action;
  const getInput: InputGetter = (index) => inputs[chunkPosition + index];
  const getOutput: OutputGetter = () => (chunkAction ? undefined : output);

  let output: Output | Outputs,
    outputChunk: Output | Outputs = [];

  const outputSetters: ChunkOutputSetters = {
    none: () => undefined,
    single: (actionOutput) => {
      if (actionOutput) output = actionOutput;
    },
    multiple: (actionOutput, index) => {
      (output as Outputs)[chunkPosition + index] = actionOutput;
    },
    chunk: (actionOutput, index) => {
      (outputChunk as Outputs)[index] = actionOutput;
    }
  };

  const setOutput = chunkAction ? outputSetters.chunk : outputSetters[outputType];
  const inputCount = inputs.length;
  let chunkPosition = 0,
    chunkEnd = chunkSize;

  while (chunkEnd < inputCount) {
    if (chunkEnd > inputCount) chunkEnd = inputCount;
    await performActions({ getInput, getAction, setOutput, getOutput, actionCount: chunkSize, onerror });

    if (chunkAction) {
      await chunkAction(outputChunk as Outputs);
      outputChunk = [];
    }

    chunkPosition += chunkSize;
    chunkEnd += chunkSize;
  }
};

export default chunk;
