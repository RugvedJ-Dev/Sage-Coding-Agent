export async function actualTypeWritter(text: string, delay: number = 30) {
  for (const char of text) {
    process.stdout.write(char);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  process.stdout.write("\n");
}
