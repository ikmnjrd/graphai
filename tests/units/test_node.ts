import { GraphAI } from "@/graphai";
import { StaticNode } from "@/node";
import { NodeState } from "@/type";
import { defaultTestAgents } from "~/agents/agents";
import { graph_data } from "~/units/graph_data";

import test from "node:test";
import assert from "node:assert";

test("test static node injection", async () => {
  const graph = new GraphAI(graph_data, defaultTestAgents);
  const nodeId = "nodeId";
  const node = new StaticNode(nodeId, { value: { data: "123" } }, graph);
  assert.deepStrictEqual(node.value, { data: "123" });
  assert.equal(undefined, node.result);
  assert.equal(node.state, NodeState.Waiting);

  node.injectValue({ updated: "abc" });
  assert.deepStrictEqual(node.result, { updated: "abc" });
  assert.equal(node.state, NodeState.Injected);
});
