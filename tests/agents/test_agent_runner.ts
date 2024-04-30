import stringSplitterAgentInfo from "@/experimental_agents/string_agents/string_splitter_agent";
import stringTemplateAgentInfo from "@/experimental_agents/string_agents/string_template_agent";

import totalAgentInfo from "@/experimental_agents/data_agents/total_agent";
import dataObjectMergeTemplateAgentInfo from "@/experimental_agents/data_agents/data_object_merge_template_agent";
import dataSumTemplateAgentInfo from "@/experimental_agents/data_agents/data_sum_template_agent";
import propertyFilterAgentInfo from "@/experimental_agents/data_agents/property_filter_agent";
import functionAgentInfo from "@/experimental_agents/function_agent";

//import sleeperAgentInfo from "@/experimental_agents/sleeper_agents/sleeper_agent";
//import sleeperAgentDebugInfo from "@/experimental_agents/sleeper_agents/sleeper_agent_debug";

import pushAgentInfo from "@/experimental_agents/array_agents/push_agent";
import popAgentInfo from "@/experimental_agents/array_agents/pop_agent";
import shiftAgentInfo from "@/experimental_agents/array_agents/shift_agent";

// import sortByValuesAgent from "@/experimental_agents/matrix_agents/sort_by_values_agent";
import dotProductAgent from "@/experimental_agents/matrix_agents/dot_product_agent";

// import tokenBoundStringsAgent from "@/experimental_agents/token_agent";
import echoAgent from "@/experimental_agents/test_agents/echo_agent";
import bypassAgent from "@/experimental_agents/test_agents/bypass_agent";
import countingAgent from "@/experimental_agents/test_agents/counting_agent";
import copyMessageAgent from "@/experimental_agents/test_agents/copy_message_agent";
import copy2ArrayAgent from "@/experimental_agents/test_agents/copy2array_agent";
import mergeNodeIdAgent from "@/experimental_agents/test_agents/merge_node_id_agent";

import { agentTestRunner } from "@/utils/test_utils";

[
  stringSplitterAgentInfo,
  stringTemplateAgentInfo,
  dataSumTemplateAgentInfo,
  totalAgentInfo,
  dataObjectMergeTemplateAgentInfo,
  propertyFilterAgentInfo,
  functionAgentInfo,
  pushAgentInfo,
  popAgentInfo,
  shiftAgentInfo,
  dotProductAgent,
  echoAgent,
  bypassAgent,
  countingAgent,
  copyMessageAgent,
  copy2ArrayAgent,
  mergeNodeIdAgent,
].map((agentInfo) => {
  agentTestRunner(agentInfo);
});
