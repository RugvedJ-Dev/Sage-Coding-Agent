import axios from "axios";

export async function checkLlamaCppServer() {
  try {
    const res = await axios.get("http://localhost:8080/health");
    return res.data.status === "ok";
  } catch (error) {
    return false;
  }
}
