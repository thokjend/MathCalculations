interface InputProps {
  inputText: string;
  setInputText: (text: string) => void;
}

export function Input({ inputText, setInputText }: InputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };
  return (
    <>
      <h1>Enter math expression</h1>
      <input
        className="input-field"
        type="text"
        value={inputText}
        onChange={handleChange}
      />
    </>
  );
}
