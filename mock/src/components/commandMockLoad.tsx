import { REPLFunction, commandHub, registerCommand } from "./CommandHub";
import { dataMap } from "../../mockedJson";
import { configValue } from "./REPL";

// mock load function that gets static data from a map,
// sets that as the current csv then returns the filepath
const mockLoadCommand: REPLFunction = (
  args: Array<string>,
  configs: Map<string, configValue>,
  updateConfigs: (key: string, val: configValue) => void
): String => {
  // parameter handling for bad user input
  if (args.length < 1) {
    return "Please input a filepath.";
  } else if (args.length > 1) {
    return "Please do not give extra parameters.";
  }

  // gets the 2D mocked data from the dataMap in mockedJson
  const filepath = args[0];

  // mock malformed csv response
  if (filepath === "malformed.csv") {
    return "Error loading file.";
  }

  // gets csv data and sets the csv variable in shared variable map
  const csv = dataMap[filepath];
  updateConfigs("csv", csv);

  return filepath;
};

registerCommand("load_file", mockLoadCommand);
