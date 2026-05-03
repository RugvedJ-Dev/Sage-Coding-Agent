import figlet from "figlet";
import boxen from "boxen";
import chalk from "chalk";
import gradient from "gradient-string";

const P = {
  ash: "#fde68a",
  gold: "#fbbf24",
  amber: "#f59e0b",
  orange: "#ea580c",
  ember: "#dc2626",
  shadow: "#44403c",

  bone: "#e7e5e4",
  muted: "#78716c",
  faint: "#44403c",
  dim: "#292524",

  lavender: "#a78bfa",
  sky: "#60a5fa",
  jade: "#4ade80",
  rose: "#f43f5e",
} as const;

const fireGrad = gradient([P.ash, P.gold, P.amber, P.orange, P.ember]);
const taglineGrad = gradient([P.amber, P.orange]);

const $ = {
  amber: (s: string) => chalk.hex(P.amber)(s),
  gold: (s: string) => chalk.hex(P.gold)(s),
  orange: (s: string) => chalk.hex(P.orange)(s),
  bone: (s: string) => chalk.hex(P.bone)(s),
  muted: (s: string) => chalk.hex(P.muted)(s),
  faint: (s: string) => chalk.hex(P.faint)(s),
  lavender: (s: string) => chalk.hex(P.lavender)(s),
  sky: (s: string) => chalk.hex(P.sky)(s),
  jade: (s: string) => chalk.hex(P.jade)(s),
  rose: (s: string) => chalk.hex(P.rose)(s),
  dim: (s: string) => chalk.hex(P.dim)(s),
  shadow: (s: string) => chalk.hex(P.shadow)(s),
};

const W = 54;

function rule(char = "─"): string {
  return $.faint(char.repeat(W));
}

function center(styled: string, raw: string): string {
  const pad = Math.max(0, Math.floor((W - raw.length) / 2));
  return " ".repeat(pad) + styled;
}

function metaRow(
  key: string,
  value: string,
  valueStyle: (s: string) => string = $.bone,
): string {
  return $.amber("  ▸ ") + $.muted(key.padEnd(14)) + valueStyle(value);
}

function sessionId(): string {
  return Math.random().toString(36).slice(2, 10).toUpperCase();
}

export async function bannerStyling(): Promise<void> {
  let ascii: string;
  try {
    ascii = figlet.textSync("SAGE  AI", { font: "ANSI Shadow" });
  } catch {
    ascii = figlet.textSync("SAGE  AI", { font: "Slant" });
  }
  const styledAscii = fireGrad.multiline(
    ascii.split("\n").filter(Boolean).join("\n"),
  );

  const subtitleRaw = "···   A I   ·   A G E N T   ···";
  const subtitle = center(
    $.shadow("···") +
      "   " +
      $.muted("A I") +
      "   " +
      $.faint("·") +
      "   " +
      $.muted("A G E N T") +
      "   " +
      $.shadow("···"),
    subtitleRaw,
  );

  const taglineInner = "AUTONOMOUS · INTELLIGENT · PERSISTENT";
  const taglineRaw = "[ " + taglineInner + " ]";
  const tagline = center(
    $.faint("[") + " " + taglineGrad(taglineInner) + " " + $.faint("]"),
    taglineRaw,
  );

  const statusRaw = "◉  agent online   │  ◉  tools ready   │  ◉  memory live";
  const statusRow = center(
    $.amber("◉") +
      $.muted("  agent online   ") +
      $.dim("│") +
      "  " +
      $.amber("◉") +
      $.muted("  tools ready   ") +
      $.dim("│") +
      "  " +
      $.amber("◉") +
      $.muted("  memory live"),
    statusRaw,
  );

  const hintRaw = "help  ·  exit  ·  /cmd  ·  Ctrl-C";
  const hints = center(
    $.faint("type ") +
      $.gold("help") +
      $.faint("  ·  ") +
      $.gold("exit") +
      $.faint("  ·  ") +
      $.gold("/cmd") +
      $.faint("  ·  ") +
      $.amber("Ctrl-C"),
    hintRaw,
  );

  const content = [
    styledAscii,
    subtitle,
    "",
    rule("─"),
    "",
    tagline,
    "",
    rule("┄"),
    "",
    metaRow("version", "1.0.0", $.amber),
    metaRow("author", "Rugved", $.bone),
    metaRow("model", "sage-2.1-turbo", $.sky),
    metaRow("session", sessionId(), $.lavender),
    metaRow("status", "● online", $.jade),
    "",
    rule("┄"),
    "",
    statusRow,
    "",
    rule("─"),
    "",
    hints,
  ].join("\n");

  console.log(
    boxen(content, {
      padding: { top: 1, bottom: 1, left: 3, right: 3 },
      margin: { top: 1, bottom: 0, left: 2, right: 2 },
      borderStyle: "round",
      borderColor: "#92400e",
      title: chalk.hex(P.amber).bold(" SAGE AI "),
      titleAlignment: "center",
    }),
  );

  console.log(
    "  " +
      $.dim("━━") +
      "  " +
      $.muted("crafted with ") +
      $.rose("♥") +
      $.muted(" by ") +
      chalk.hex(P.bone).bold("Rugved") +
      "  " +
      $.faint("·") +
      "  " +
      $.faint("sage-ai · autonomous agent cli") +
      "  " +
      $.dim("━━"),
  );

  console.log();

  process.stdout.write(
    $.amber("◆") + " " + $.faint("~/sage") + " " + $.muted("›") + " ",
  );
}
