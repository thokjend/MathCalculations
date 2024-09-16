import KaTeXRender from "../KaTeXRender";
interface ResultBoxProps {
  data: {
    result: string;
  } | null;
}

export function ResultBox({ data }: ResultBoxProps) {
  if (!data) return null;

  return (
    <>
      <h1>Result</h1>
      <KaTeXRender expression={data.result} />
    </>
  );
}
