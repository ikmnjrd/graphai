import { DataSource, ResultData, PropFunction } from "@/type";

import { GraphNodes } from "@/node";

import { parseNodeName, isNamedInputs, isObject, isNull } from "@/utils/utils";
import { getDataFromSource } from "@/utils/data_source";

const resultsOfInner = (input: any, nodes: GraphNodes, propFunction: PropFunction): ResultData => {
  if (Array.isArray(input)) {
    return input.map((inp) => resultsOfInner(inp, nodes, propFunction));
  }
  if (isNamedInputs(input)) {
    return resultsOf(input, nodes, propFunction);
  }
  if (typeof input === "string") {
    const templateMatch = [...input.matchAll(/\${(:[^}]+)}/g)].map((m) => m[1]);
    if (templateMatch.length > 0) {
      const results = resultsOfInner(templateMatch, nodes, propFunction);
      return Array.from(templateMatch.keys()).reduce((tmp, key) => {
        return tmp.replaceAll("${" + templateMatch[key] + "}", (results as any)[key]);
      }, input);
    }
  }
  return resultOf(parseNodeName(input), nodes, propFunction);
};

export const resultsOf = (inputs: Record<string, any> | Array<string>, nodes: GraphNodes, propFunction: PropFunction) => {
  // for inputs. TODO remove if array input is not supported
  if (Array.isArray(inputs)) {
    return inputs.reduce((tmp: Record<string, ResultData>, key) => {
      tmp[key] = resultsOfInner(key, nodes, propFunction);
      return tmp;
    }, {});
  }
  return Object.keys(inputs).reduce((tmp: Record<string, ResultData>, key) => {
    const input = inputs[key];
    tmp[key] = isNamedInputs(input) ? resultsOf(input, nodes, propFunction) : resultsOfInner(input, nodes, propFunction);
    return tmp;
  }, {});
};

export const resultOf = (source: DataSource, nodes: GraphNodes, propFunction: PropFunction) => {
  const { result } = source.nodeId ? nodes[source.nodeId] : { result: undefined };
  return getDataFromSource(result, source, propFunction);
};

// clean up object for anyInput
export const cleanResultInner = (results: ResultData): ResultData | null => {
  if (Array.isArray(results)) {
    return results.map((result: ResultData) => cleanResultInner(result)).filter((result) => !isNull(result));
  }

  if (isObject(results)) {
    return Object.keys(results).reduce((tmp: Record<string, ResultData>, key: string) => {
      const value = cleanResultInner(results[key]);
      if (!isNull(value)) {
        tmp[key] = value;
      }
      return tmp;
    }, {});
  }

  return results;
};

export const cleanResult = (results: Record<string, ResultData | undefined>) => {
  return Object.keys(results).reduce((tmp: Record<string, ResultData | undefined>, key: string) => {
    const value = cleanResultInner(results[key]);
    if (!isNull(value)) {
      tmp[key] = value;
    }
    return tmp;
  }, {});
};
