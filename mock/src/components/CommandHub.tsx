import { configValue } from "./REPL";

// REPLFunction taken from write-up and modified for our purposes
// takes in a configs and updateConfigs map for commands to use and access shared variables
// returns String or String[][], this can be amended by developers for furhter use
export interface REPLFunction {
  (
    args: Array<string>,
    configs: Map<string, configValue>,
    updateConfigs: (key: string, val: configValue) => void
  ): String | String[][];
}

// map that stores command name to function
export const commandHub: Map<string, REPLFunction> = new Map();

// uploads commands into the map
export const registerCommand = (
  commandName: string,
  commandFunction: REPLFunction
) => {
  commandHub.set(commandName, commandFunction);
};

// retrieves commands
export const getCommand = (commandName: string): REPLFunction | undefined => {
  return commandHub.get(commandName);
};

export const hasCommand = (commandName: string): boolean => {
  return commandHub.has(commandName);
};
