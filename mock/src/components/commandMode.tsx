import { REPLFunction, commandHub, registerCommand } from "./CommandHub"; // Adjust import path as needed
import { configValue } from "./REPL";

// Core mode command function!
const modeCommand: REPLFunction = (
  args: Array<string>,
  configs: Map<string, configValue>,
  updateConfigs: (key: string, val: configValue) => void
): String => {
  // We are ignoring all args after the first
  // For now, no error if someone enters may args. Just look at first one.
  const newMode = args[0];
  if (newMode === "brief" || newMode === "verbose") {
    // sets mode in configs
    updateConfigs("outputMode", newMode);

    return `Switched to ${newMode} mode.`;
  }
  return "Invalid mode. You need to use 'brief' or 'verbose' only";
};

registerCommand("mode", modeCommand);
