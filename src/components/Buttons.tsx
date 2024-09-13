interface ButtonsProps {
  inputText: string;
  fetchData: (operation: string, expression: string) => void;
}

export function Buttons({ inputText, fetchData }: ButtonsProps) {
  const makeButton = (expression: string) => {
    return (
      <div
        className="operation-element"
        onClick={() => fetchData(expression, inputText)}
      >
        {expression.charAt(0).toUpperCase() + expression.slice(1)}
      </div>
    );
  };
  return (
    <>
      <h2>Choose operation</h2>
      <div className="operation-container">
        {makeButton("simplify")}
        {makeButton("factor")}
        {makeButton("derive")}
        {makeButton("integrate")}
      </div>
    </>
  );
}
