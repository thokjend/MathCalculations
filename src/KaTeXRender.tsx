import React from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

type KaTeXProps = {
  expression: string;
  filter?: boolean;
};

const KaTeXRender: React.FC<KaTeXProps> = ({ expression, filter = false }) => {
  const filterExpression = (expression: string) => {
    const formattedExpression: string = expression.replace(
      /exp\((.*?)\)/g, // Matches exp(inside parentheses)
      "e^{$1}" // Replace with LaTeX-compatible format
    );
    const expressionList: string[] = formattedExpression.split(" ");

    const filteredList: string[] = [];

    const containsMultipleTerms = (str: string) => {
      return (
        str.includes("+") ||
        str.includes("-") ||
        str.includes("*") ||
        str.includes("/")
      );
    };

    const formatFraction = (element: string) => {
      const fractionRegex = /^([0-9]+)\/([0-9]+)$/; // Match simple fractions like "1/2"
      const match = element.match(fractionRegex);

      if (match) {
        // If it's a fraction, format as \frac{numerator}{denominator}
        const numerator = match[1];
        const denominator = match[2];
        return `\\frac{${numerator}}{${denominator}}`;
      }

      return element;
    };

    for (let i = 0; i < expressionList.length; i++) {
      let element = expressionList[i];
      element = formatFraction(element);
      if (element === "/") {
        const numerator: string = filteredList.pop() || "";
        const denominator: string = expressionList[i + 1];

        const numGrouped = containsMultipleTerms(numerator)
          ? `(${numerator})`
          : numerator;
        const denomGrouped = containsMultipleTerms(denominator)
          ? `(${denominator})`
          : denominator;

        filteredList.push(`\\frac{${numGrouped}}{${denomGrouped}}`);
        i++;
      } else {
        filteredList.push(element);
      }
    }

    return filteredList.join(" ");
  };

  const expressionToRender = filter ? filterExpression(expression) : expression;

  const html = katex.renderToString(expressionToRender, {
    throwOnError: false,
  });

  return (
    <div className="display-input" dangerouslySetInnerHTML={{ __html: html }} />
  );
};

export default KaTeXRender;
