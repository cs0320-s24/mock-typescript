import { REPLFunction, commandHub, registerCommand } from "./CommandHub";
import { configValue } from "./REPL";

// test command showing how our commmandHub works with extra functions!
const viewFirstRowCommand: REPLFunction = (
  args: Array<string>,
  configs: Map<string, configValue>,
  updateConfigs: (key: string, val: configValue) => void
): String | String[][] => {
  // parameter handling for bad user input
  if (args.length > 0) {
    return "Please do not give extra parameters.";
  }

  const data = configs.get("csv");

  // if the csv entry is nonexistent, the csv has not been loaded
  if (!data) {
    return "No CSV file is loaded. Please load a file using the load command to view!";
  } 
  
  if (Array.isArray(data) && Array.isArray(data[0])) {
    return [data[0]];
  } else{
    return [[]]
  }
};

registerCommand("view_first", viewFirstRowCommand);