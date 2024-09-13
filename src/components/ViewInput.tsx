import KaTeXRender from "../KaTeXRender";
interface ViewInputProps {
  inputText: string;
}
export function ViewInput({ inputText }: ViewInputProps) {
  <KaTeXRender expression={inputText}></KaTeXRender>;
}
