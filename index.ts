import { masterLoop } from "./functions/masterLoop";
import { executionForTool } from "./functions/afterToolExecution";
import { bannerStyling } from "./functions/bannerStyling";
import { checkLlamaCppServer } from "./functions/checkLlamaCppServer";
import { checkbox } from "@inquirer/prompts";
import ora from "ora";
import chalk from "chalk";

async function startAgent() {
  let serverStat: boolean = false;
  while (!serverStat) {
    const spinner = ora("Checking LlamaCpp server...").start();
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const isRunning = await checkLlamaCppServer();
    if (isRunning) {
      spinner.succeed("LlamaCpp server is running!");
      serverStat = true;
      return;
    }
    spinner.stop();
    const answer = await checkbox({
      message: "LlamaCpp server failed to connect!, Do you want to retry?",
      choices: [
        { name: "yes", value: "true" },
        { name: "no", value: "false" },
      ],
      validate: (answer) => answer.length > 0 || "You must select an option!",
    });
    if (answer.includes("false")) {
      process.exit(0);
    }
  }
}

async function primaryLoop() {
  while (true) {
    let userPrompt = prompt(
      chalk.yellowBright("What do you want me to create today! \n"),
    );
    let masterLoopResponse = await masterLoop(userPrompt as string);
    await executionForTool(masterLoopResponse);
  }
}

async function main() {
  bannerStyling();
  await startAgent();
  await primaryLoop();
}

main();
