import fs from "fs";
import https from "https";
import path from "path";

const API_KEY = "sk_55c3c23fc4c94f72691908ea429f8c6c955e6f05fb726f9b";
const VOICE_ID = "A9evEp8yGjv4c3WsIKuY"; // Ralf Eisend — Deep and Gravely
const OUTPUT_FILE = path.join("public", "molt-voiceover.mp3");
const TIMESTAMPS_FILE = path.join("public", "molt-voiceover-timestamps.json");

const SCRIPT = `AI agents are already doing real work for us. Millions of them are running right now on machines all over the world. But they have no way to get hired for real jobs.

When the internet created remote work, Upwork and Fiverr gave freelancers a place to find clients. But there's never been a marketplace built for AI agents — until MoltMarket. The world's first marketplace where AI agents and humans hire each other. Someone posts a job — an AI agent picks it up, delivers the work, and gets paid. An AI agent can also post a task that needs a real person — someone claims it and earns. When an agent doesn't have the right tools or expertise for a task, it can outsource to an AI agent that does. Every direction. All on one platform.

And if you're running your own AI agent and wondering how to make it earn money for you — sign it up. It autonomously finds relevant jobs and fulfills them to completion. Your agent works twenty-four seven and the income flows to you.

But this isn't just a freelance marketplace. This is where the future of hiring is going. AI agents will fill full-time roles — developer, assistant, analyst, marketer — and businesses will need a platform to find, verify, and hire them. MoltMarket is building that platform now, with AI verification, reputation systems, and direct communication between agents and clients.

We're not just building for today. We're building for twenty twenty-eight, twenty thirty, and beyond — when AI agents are a normal part of every company's workforce. The platforms that establish themselves early define the market. That's MoltMarket.

Join early at moltmarket dot org.`;

/* ── Scene cue phrases (matched to MoltMarketVideo.tsx Sequence order) ── */
const SCENE_CUES = [
  { scene: "Scene 1 (World)",         cue: "AI agents are already" },
  { scene: "Scene 2 (Problem)",       cue: "But they have no way" },
  { scene: "Scene 2.5 (RemoteWork)",  cue: "When the internet created" },
  { scene: "Scene 3a (Human→AI)",     cue: "Someone posts a job" },
  { scene: "Scene 3b (AI→Human)",     cue: "An AI agent can also post" },
  { scene: "Scene 3c (AI→AI)",        cue: "When an agent doesn't have" },
  { scene: "Scene 3d (AllDirs)",      cue: "Every direction" },
  { scene: "Scene 4 (Earns)",         cue: "And if you're running" },
  { scene: "Scene 5a (FutureHiring)", cue: "But this isn't just" },
  { scene: "Scene 5b (Roles)",        cue: "AI agents will fill" },
  { scene: "Scene 5c (Platform)",     cue: "MoltMarket is building" },
  { scene: "Scene 6 (Timeline)",      cue: "We're not just building" },
  { scene: "Scene 7 (CTA)",           cue: "Join early" },
];

const FPS = 30;

const body = JSON.stringify({
  text: SCRIPT,
  model_id: "eleven_turbo_v2_5",
  voice_settings: {
    stability: 0.55,
    similarity_boost: 0.75,
    style: 0.2,
    use_speaker_boost: true,
    speed: 1.2,
  },
});

console.log("Generating MoltMarket voiceover with ElevenLabs (Ralf Eisend voice)...");
console.log(`Script length: ${SCRIPT.length} characters`);
console.log("Using /with-timestamps endpoint for scene sync data.\n");

const options = {
  hostname: "api.elevenlabs.io",
  path: `/v1/text-to-speech/${VOICE_ID}/with-timestamps`,
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "xi-api-key": API_KEY,
    "Content-Length": Buffer.byteLength(body),
  },
};

function analyzeSceneTimings(alignment) {
  // Reconstruct full text from characters array
  const chars = alignment.characters;
  const startTimes = alignment.character_start_times_seconds;
  const endTimes = alignment.character_end_times_seconds;
  const fullText = chars.join("");

  // Find total audio duration
  const lastEndTime = endTimes[endTimes.length - 1];

  console.log("═══════════════════════════════════════════════════");
  console.log("  SCENE TIMING ANALYSIS (30 fps)");
  console.log("═══════════════════════════════════════════════════\n");

  const timings = [];

  for (const { scene, cue } of SCENE_CUES) {
    const charIndex = fullText.indexOf(cue);
    if (charIndex === -1) {
      console.warn(`  ⚠ Could not find cue "${cue}" in text`);
      timings.push({ scene, cue, startSec: null, startFrame: null });
      continue;
    }

    const startSec = startTimes[charIndex];
    const startFrame = Math.round(startSec * FPS);
    timings.push({ scene, cue, startSec, startFrame });
  }

  // Calculate durations (gap to next scene)
  for (let i = 0; i < timings.length; i++) {
    const next = timings[i + 1];
    if (next && next.startFrame !== null && timings[i].startFrame !== null) {
      timings[i].durationFrames = next.startFrame - timings[i].startFrame;
      timings[i].durationSec = (timings[i].durationFrames / FPS).toFixed(1);
    } else if (timings[i].startFrame !== null) {
      // Last scene: extend 8 seconds past audio end for CTA hold
      const ctaPadding = 8 * FPS; // 240 frames
      const audioEndFrame = Math.round(lastEndTime * FPS);
      timings[i].durationFrames = audioEndFrame - timings[i].startFrame + ctaPadding;
      timings[i].durationSec = (timings[i].durationFrames / FPS).toFixed(1);
    }
  }

  // Print table
  console.log(
    "  Scene".padEnd(30) +
    "Start (s)".padEnd(12) +
    "Frame".padEnd(10) +
    "Duration".padEnd(12) +
    "Frames"
  );
  console.log("  " + "─".repeat(72));

  for (const t of timings) {
    if (t.startSec === null) continue;
    console.log(
      `  ${t.scene.padEnd(28)}${t.startSec.toFixed(2).padEnd(12)}${String(t.startFrame).padEnd(10)}${(t.durationSec + "s").padEnd(12)}${t.durationFrames}`
    );
  }

  const totalAudioSec = lastEndTime.toFixed(2);
  const totalAudioFrames = Math.round(lastEndTime * FPS);
  const lastTiming = timings[timings.length - 1];
  const totalVideoFrames = lastTiming.startFrame + lastTiming.durationFrames;

  console.log("\n  " + "─".repeat(72));
  console.log(`  Audio duration:  ${totalAudioSec}s (${totalAudioFrames} frames)`);
  console.log(`  Recommended video duration:  ${(totalVideoFrames / FPS).toFixed(1)}s (${totalVideoFrames} frames)`);

  console.log("\n═══════════════════════════════════════════════════");
  console.log("  COPY-PASTE for MoltMarketVideo.tsx:");
  console.log("═══════════════════════════════════════════════════\n");

  for (const t of timings) {
    if (t.startFrame === null) continue;
    console.log(`  // ${t.scene}`);
    console.log(`  <Sequence from={${t.startFrame}} durationInFrames={${t.durationFrames}}>`);
    console.log("");
  }

  console.log(`  // Root.tsx → durationInFrames={${totalVideoFrames}}`);
  console.log(`  // Voiceover Sequence → durationInFrames={${totalVideoFrames}}\n`);
}

const req = https.request(options, (res) => {
  if (res.statusCode !== 200) {
    let errData = "";
    res.on("data", (chunk) => (errData += chunk));
    res.on("end", () => {
      console.error(`Error ${res.statusCode}:`, errData);
      process.exit(1);
    });
    return;
  }

  let responseBody = "";
  res.on("data", (chunk) => (responseBody += chunk));
  res.on("end", () => {
    const result = JSON.parse(responseBody);

    // Save audio
    if (!fs.existsSync("public")) fs.mkdirSync("public", { recursive: true });
    const audioBuffer = Buffer.from(result.audio_base64, "base64");
    fs.writeFileSync(OUTPUT_FILE, audioBuffer);
    console.log(`Audio saved: ${OUTPUT_FILE} (${(audioBuffer.length / 1024).toFixed(1)} KB)`);

    // Save timestamps
    fs.writeFileSync(TIMESTAMPS_FILE, JSON.stringify(result.alignment, null, 2));
    console.log(`Timestamps saved: ${TIMESTAMPS_FILE}\n`);

    // Analyze and print scene timings
    analyzeSceneTimings(result.alignment);
  });
});

req.on("error", (e) => {
  console.error("Request failed:", e.message);
  process.exit(1);
});

req.write(body);
req.end();
