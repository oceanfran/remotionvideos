import fs from "fs";
import https from "https";
import path from "path";

const API_KEY = "sk_55c3c23fc4c94f72691908ea429f8c6c955e6f05fb726f9b";
const VOICE_ID = "21m00Tcm4TlvDq8ikWAM"; // Rachel — professional female voice
const OUTPUT_FILE = path.join("public", "voiceover.mp3");

const SCRIPT = `How many calls did your business miss this week? Be honest. Every one of those callers didn't leave a voicemail — they called the next company on Google. And depending on your business, that's anywhere from five hundred to fifteen thousand dollars per missed call. Gone.

Now imagine every single call gets answered — twenty-four seven. An AI receptionist picks up, answers the caller's questions about your business, collects their info, qualifies leads, and transfers them to the right team member or books them straight to your calendar and sends reminder notifications to your customers so they actually show up.

Set it to answer every call, or just the ones you can't get to. Either way, no more losing customers to voicemail.

It comes with its own built-in CRM so everything is tracked in one place. Works in English and Spanish. And you don't need to pay anyone to set it up — you can do it yourself in under ten minutes. Or book a consultation and we'll help you set it up.

Sign up today at crecimos dot com.`;

const body = JSON.stringify({
  text: SCRIPT,
  model_id: "eleven_turbo_v2_5",
  voice_settings: {
    stability: 0.5,
    similarity_boost: 0.8,
    style: 0.4,
    use_speaker_boost: true,
    speed: 1.15,
  },
});

console.log("Generating voiceover with ElevenLabs (Rachel voice, speed 1.15x)...");
console.log(`Script length: ${SCRIPT.length} characters`);

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
    console.log(
      `Voiceover saved to ${OUTPUT_FILE} (${(stats.size / 1024).toFixed(1)} KB)`,
    );
  });
});

req.on("error", (e) => {
  console.error("Request failed:", e.message);
  process.exit(1);
});

req.write(body);
req.end();
