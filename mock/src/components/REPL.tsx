import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";

/* 
  You'll want to expand this component (and others) for the sprints! Remember 
  that you can pass "props" as function arguments. If you need to handle state 
  at a higher level, just move up the hooks and pass the state/setter as a prop.
  
  This is a great top level component for the REPL. It's a good idea to have organize all components in a component folder.
  You don't need to do that for this gearup.
*/

export default function REPL() {
  const [history, setHistory] = useState<{ command: string; result: string }[]>(
    []
  );

  // configs is a map storing important info for all commands to access/update
  const [configs, setConfigs] = useState(new Map<string, any>());

  // function for the commands to update the configs map
  const updateConfigs = (key: string, val: any) => {
    const updated = new Map(configs);
    updated.set(key, val);
    setConfigs(updated);
  };

  return (
    <div className="repl">
      <REPLHistory history={history} configs={configs} />
      <hr></hr>
      <REPLInput
        history={history}
        setHistory={setHistory}
        configs={configs}
        updateConfigs={updateConfigs}
      />
    </div>
  );
}
