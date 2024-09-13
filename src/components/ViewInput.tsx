import KaTeXRender from "../KaTeXRender";
interface ViewInputProps {
  inputText: string;
}
export function ViewInput({ inputText }: ViewInputProps) {
  return <KaTeXRender expression={inputText}></KaTeXRender>;
}
