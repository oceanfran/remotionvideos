import fs from "fs";
import https from "https";
import path from "path";

const API_KEY = "sk_55c3c23fc4c94f72691908ea429f8c6c955e6f05fb726f9b";
const OUTPUT_FILE = path.join("public", "bgmusic.mp3");

// ElevenLabs Sound Effects API — generate upbeat background music
const body = JSON.stringify({
  text: "Upbeat modern corporate background music, energetic and positive, electronic synth pads with a driving beat, suitable for a tech product advertisement, 60 seconds, no vocals",
  duration_seconds: 60,
  prompt_influence: 0.5,
});

console.log("Generating background music with ElevenLabs Sound Effects API...");

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
      console.log(
        "\nNote: Sound generation has a max of 30s per call.",
      );
      console.log(
        "If this fails, you can use any royalty-free upbeat background track instead.",
      );
      console.log(
        "Place the file as public/bgmusic.mp3 in your project.",
      );
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
