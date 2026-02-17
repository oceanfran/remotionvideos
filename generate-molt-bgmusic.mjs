import fs from "fs";
import https from "https";
import path from "path";

const API_KEY = "sk_55c3c23fc4c94f72691908ea429f8c6c955e6f05fb726f9b";
const OUTPUT_FILE = path.join("public", "molt-bgmusic.mp3");

// ElevenLabs Sound Effects API — dark futuristic background music
const body = JSON.stringify({
  text: "Dark futuristic cinematic background music, deep bass synths with pulsing electronic beats, atmospheric pads, tech startup demo day energy, inspiring and powerful, suitable for a Y Combinator-style pitch video, loopable, no vocals",
  duration_seconds: 30,
  prompt_influence: 0.5,
});

console.log("Generating MoltMarket background music with ElevenLabs...");

const options = {
  hostname: "api.elevenlabs.io",
  path: "/v1/sound-generation",
  method: "POST",
  headers: {
    Accept: "audio/mpeg",
    "Content-Type": "application/json",
    "xi-api-key": API_KEY,
    "Content-Length": Buffer.byteLength(body),
  },
};

const req = https.request(options, (res) => {
  if (res.statusCode !== 200) {
    let data = "";
    res.on("data", (chunk) => (data += chunk));
    res.on("end", () => {
      console.error(`Error ${res.statusCode}:`, data);
      process.exit(1);
    });
    return;
  }

  if (!fs.existsSync("public")) fs.mkdirSync("public", { recursive: true });
  const file = fs.createWriteStream(OUTPUT_FILE);
  res.pipe(file);
  file.on("finish", () => {
    file.close();
    const stats = fs.statSync(OUTPUT_FILE);
    console.log(
      `Background music saved to ${OUTPUT_FILE} (${(stats.size / 1024).toFixed(1)} KB)`,
    );
  });
});

req.on("error", (e) => {
  console.error("Request failed:", e.message);
  process.exit(1);
});

req.write(body);
req.end();
