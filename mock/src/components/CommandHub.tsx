export interface REPLFunction {
  (args: Array<string>): String | String[][];
}

export const commandHub: Map<string, REPLFunction> = new Map();

export const registerCommand = (commandName: string, commandFunction: REPLFunction) => {
  commandHub.set(commandName, commandFunction);
};

export const getCommand = (commandName: string): REPLFunction | undefined => {
  return commandHub.get(commandName);
};

export const hasCommand = (commandName: string): boolean => {
  return commandHub.has(commandName);
};


