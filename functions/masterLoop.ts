import { llmtools } from "../tools/tools";
import axios from "axios";

export async function masterLoop(prompt: string) {
  const res = await axios.post("http://localhost:8080/v1/chat/completions", {
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    tools: llmtools,
    tool_choice: "auto",
  });

  const final = await res.data;
  return final.choices[0].message;
}
