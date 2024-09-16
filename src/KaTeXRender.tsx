import React from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

type KaTeXProps = {
  expression: string;
  filter?: boolean;
};

/* const KaTeXRender: React.FC<KaTeXProps> = ({ expression }) => {
  const filterExpression = (expression: string) => {
    const filterWhitespace: string = expression.replace(/\s+/g, "");
    const formattedExpression: string = filterWhitespace.replace(
      /exp\((.*?)\)/g,
      "e^{$1}"
    );
    const handlePowers: string = formattedExpression.replace(
      /\^\((-?[0-9a-zA-Z]+)\)/g,
      "^{$1}"
    );

    const expressionList: string[] = handlePowers.split(/([+\-*])/);
    console.log(expressionList);

    return expressionList.join(" ");
  };

  const expressionToRender = filterExpression(expression);

  const html = katex.renderToString(expressionToRender, {
    throwOnError: false,
  });

  return (
    <div className="display-input" dangerouslySetInnerHTML={{ __html: html }} />
  );
  
}; */

const KaTeXRender: React.FC<KaTeXProps> = ({ expression }) => {
  const filterExpression = (expression: string) => {
    // Replace exp() with e^{...} for exponential expressions
    const formattedExpression: string = expression.replace(
      /exp\((.*?)\)/g,
      "e^{$1}"
    );

    // Handle powers with the custom function
    const handlePowers: string = formattedExpression.replace(
      /([a-zA-Z0-9]+)\^\((.*?)\)/g,
      "$1^{$2}"
    );

    // Handle the remaining formatting rules
    const expressionList: string[] = handlePowers.split(" ");
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

  const expressionToRender = filterExpression(expression);

  const html = katex.renderToString(expressionToRender, {
    throwOnError: false,
  });

  return (
    <div className="display-input" dangerouslySetInnerHTML={{ __html: html }} />
  );
};

export default KaTeXRender;
