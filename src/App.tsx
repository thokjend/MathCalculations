import { useState } from "react";
import KaTeXRender from "./KaTeXRender";
import "./styles.css";
import { Input } from "./components/Input";
import { Buttons } from "./components/Buttons";
import { ResultBox } from "./components/ResultBox";

export default function App() {
  type ApiResponse = {
    expression: string;
    result: string;
  };

  const [data, setData] = useState<ApiResponse | null>(null);
  const [inputText, setInputText] = useState("");

  const fetchData = async (operation: string, expression: string) => {
    try {
      const response = await fetch(
        `https://newton.vercel.app/api/v2/${operation}/${encodeURIComponent(
          expression
        )}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log(result);
      setData(result);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <>
      <Input inputText={inputText} setInputText={setInputText}></Input>
      <KaTeXRender expression={inputText}></KaTeXRender>
      <Buttons inputText={inputText} fetchData={fetchData}></Buttons>
      <ResultBox data={data}></ResultBox>
    </>
  );
}
