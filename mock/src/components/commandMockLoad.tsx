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
  // gets the 2D mocked data from the dataMap in mockedJson
  const filepath = args[0];
  const csv = dataMap[filepath];

  // sets the csv variable in shared variable map
  updateConfigs("csv", csv);

  return filepath;
};

registerCommand("load_csv", mockLoadCommand);
