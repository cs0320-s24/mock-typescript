import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { commandHub, getCommand } from "./CommandHub";
import {} from "./commandMode";
import {} from "./commandMockLoad";
import { configValue } from "./REPL";

interface REPLInputProps {
  history: { command: string; result: String | String[][] }[];
  setHistory: React.Dispatch<
    React.SetStateAction<{ command: string; result: String | String[][] }[]>
  >;
  configs: Map<string, configValue>;
  updateConfigs: (key: string, val: configValue) => void;
}

export function REPLInput(props: REPLInputProps) {
  const [commandString, setCommandString] = useState<string>("");
  
  const handleSubmit = () => {
    // Source: https://stackoverflow.com/questions/10346722/how-to-split-a-string-by-white-space-or-comma
    const [coreCommand, ...args] = commandString.split(/\s+/);

    const commandFunction = getCommand(coreCommand);

    let result;
    if (commandFunction) {
      result = commandFunction(args, props.configs, props.updateConfigs);
    } else {
      result = `Command not found: ${coreCommand}`;
    }

    props.setHistory([
      ...props.history,
      { command: commandString, result: result },
    ]);

    setCommandString("");
  };

  return (
    <div className="repl-input">
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSubmit()
            }
          }}
        />
      </fieldset>
      <button aria-label={"Submit button"} onClick={handleSubmit}>
        Submit Command
      </button>
    </div>
  );
}
