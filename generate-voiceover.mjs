import fs from "fs";
import https from "https";
import path from "path";

const API_KEY = "sk_55c3c23fc4c94f72691908ea429f8c6c955e6f05fb726f9b";
const VOICE_ID = "21m00Tcm4TlvDq8ikWAM"; // Rachel - professional female voice
const OUTPUT_FILE = path.join("public", "voiceover.mp3");

const SCRIPT = `Crecimos. Never miss a call again.

Every day, businesses lose thousands of dollars from unanswered calls. Sixty-two percent of calls go unanswered. Eighty-five percent of those callers will never call back.

Meet Crecimos. Your AI-powered phone assistant that answers every call, books appointments instantly, and keeps your business running twenty-four seven.

With twenty-four seven AI answering, smart booking, five-minute setup, and seamless CRM integration, Crecimos has everything you need to grow.

It's simple. A customer calls. Your AI answers. Appointments are booked and confirmed automatically.

One hundred percent of calls answered. Three times more bookings. Always available.

Start growing today. Set up in five minutes. Try Crecimos free at crecimos.com.`;

const body = JSON.stringify({
  text: SCRIPT,
  model_id: "eleven_turbo_v2_5",
  voice_settings: {
    stability: 0.6,
    similarity_boost: 0.8,
    style: 0.3,
    use_speaker_boost: true,
  },
});

console.log("Generating voiceover with ElevenLabs...");

const options = {
  hostname: "api.elevenlabs.io",
  path: `/v1/text-to-speech/${VOICE_ID}`,
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
    console.log(`Voiceover saved to ${OUTPUT_FILE} (${(stats.size / 1024).toFixed(1)} KB)`);
  });
});

req.on("error", (e) => {
  console.error("Request failed:", e.message);
  process.exit(1);
});

req.write(body);
req.end();
