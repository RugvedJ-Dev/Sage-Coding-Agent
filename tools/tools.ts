export const llmtools: Array<object> = [
  {
    type: "function",
    function: {
      name: "create_html_file",
      description: "Create an HTML file. Call this first.",
      parameters: {
        type: "object",
        properties: {
          filename: {
            type: "string",
            description: "e.g. index.html",
          },
          content: {
            type: "string",
            description: "Full HTML code",
          },
        },
        required: ["filename", "content"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "create_css_file",
      description: "Create a CSS file. Call this second.",
      parameters: {
        type: "object",
        properties: {
          filename: {
            type: "string",
            description: "e.g. style.css",
          },
          content: {
            type: "string",
            description: "Full CSS code",
          },
        },
        required: ["filename", "content"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "create_js_file",
      description: "Create a JavaScript file. Call this third.",
      parameters: {
        type: "object",
        properties: {
          filename: {
            type: "string",
            description: "e.g. script.js",
          },
          content: {
            type: "string",
            description: "Full JavaScript code",
          },
        },
        required: ["filename", "content"],
      },
    },
  },
];
