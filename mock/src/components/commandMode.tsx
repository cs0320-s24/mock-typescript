import { REPLFunction, commandHub, registerCommand } from "./CommandHub";
import { configValue } from "./REPL";

// Core mode command function!
const modeCommand: REPLFunction = (
  args: Array<string>,
  configs: Map<string, configValue>,
  updateConfigs: (key: string, val: configValue) => void
): String => {
  if (args.length < 1) {
    return "Please input an output mode.";
  } else if (args.length > 1) {
    return "Please do not give extra parameters.";
  }

  // We are ignoring all args after the first
  const newMode = args[0];
  if (newMode === "brief" || newMode === "verbose") {
    // sets mode in configs
    updateConfigs("outputMode", newMode);

    return `Switched to ${newMode} mode.`;
  }
  return "Invalid mode. You need to use 'brief' or 'verbose' only";
};

registerCommand("mode", modeCommand);
