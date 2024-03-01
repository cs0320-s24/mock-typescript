import { REPLFunction, commandHub, registerCommand } from "./CommandHub";
import { configValue } from "./REPL";

// view function that returns whatever is currently loaded
const mockViewCommand: REPLFunction = (
  args: Array<string>,
  configs: Map<string, configValue>,
  updateConfigs: (key: string, val: configValue) => void
): String | String[][] => {
  if (args.length > 0) {
    return "Please do not give extra parameters.";
  }

  const data = configs.get("csv") as String[][];

  if (!data) {
    return "No CSV file is loaded. Please load a file using the load command to view!";
  } else {
    return data;
  }
};

registerCommand("view", mockViewCommand);
