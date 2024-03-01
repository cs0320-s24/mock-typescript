import "../styles/main.css";
import { configValue } from "./REPL";

interface REPLHistoryProps {
  history: { command: string; result: string | string[][] }[];
  configs: Map<string, configValue>;
}

const displayResultStringOrTable = (result: string | string[][]) => {
  // Function will either display:
  // A) 2D table (if input was string[][]), or
  // B) plain string that was given as input

  // check if result is string[][] and is not empty (causes bug with table if so!)
  if (Array.isArray(result) && Array.isArray(result[0]) && result.length > 0) {
    const tableRows = result.map((row, rowIndex) => {
      const cells = row.map((cell, cellIndex) => (
        <td key={`cell-${rowIndex}-${cellIndex}`}>{cell}</td>
      ));
      return <tr key={`row-${rowIndex}`}>{cells}</tr>;
    });

    return (
      <table>
        <tbody>{tableRows}</tbody>
      </table>
    );
  } else {
    // result is just a string
    return <span>{result}</span>;
  }
};

export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {props.history.map((elem, idx) => {
        let displayText;
        if (props.configs.get("outputMode") === "verbose") {
          displayText = (
            <div>
              <strong>Command:</strong> {elem.command} <br />
              <strong>Output:</strong> {displayResultStringOrTable(elem.result)}
            </div>
          );
        } else {
          displayText = displayResultStringOrTable(elem.result);
        }
        return <div key={idx}>{displayText}</div>;
      })}
    </div>
  );
}
