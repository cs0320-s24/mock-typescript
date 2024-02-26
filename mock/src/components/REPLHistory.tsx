import "../styles/main.css";
import { outputMode } from "./commandMode";

interface REPLHistoryProps {
  history: { command: string; result: string }[];
}
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {props.history.map((elem, idx) => {
        let displayText;
        if (outputMode === "verbose") {
          displayText = `Command: ${elem.command} \n Output: ${elem.result}`;
        } else {
          displayText = elem.result;
        }
        return <p key={idx}>{displayText}</p>;
      })}
    </div>
  );
}
