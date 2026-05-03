import { actualTypeWritter } from "./actualTypeWritter";
import { checkbox } from "@inquirer/prompts";

export async function executionForTool(message: any) {
  if (message.tool_calls && message.tool_calls.length > 0) {
    for (const toolCall of message.tool_calls) {
      const functionName = toolCall.function.name;
      console.log(toolCall.function.arguments);
      const args = JSON.parse(toolCall.function.arguments);

      console.log(`\n\x1b[33m[Action: ${functionName}]\x1b[0m`);
      console.log(`\x1b[32mCreating File: ${args.filename}\x1b[0m`);

      if (
        ["create_html_file", "create_css_file", "create_js_file"].includes(
          functionName,
        )
      ) {
        console.log("\x1b[36mFile Content:\x1b[0m");
        await typewriter(args.content, 5, args.filename);
      }
    }
  } else {
    await typewriter(message.content || "No content returned.", 40);
  }

  async function userConsent(filename?: string): Promise<boolean> {
    const label = filename
      ? `Sage wants to create "${filename}". Do you allow it?`
      : "Sage wants to respond. Do you allow it?";

    const answer = await checkbox({
      message: label,
      choices: [
        { name: "Yes", value: "true" },
        { name: "No", value: "false" },
      ],
      validate: (answer) => answer.length > 0 || "You must select an option!",
    });

    return answer.includes("true");
  }

  async function typewriter(
    text: string,
    delay: number = 1,
    filename?: string,
  ) {
    const userC = await userConsent(filename);
    if (!userC) return;

    await actualTypeWritter(text, delay);

    if (filename) {
      await Bun.write(filename, text);
    }
  }
}
