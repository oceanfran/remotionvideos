#!/bin/bash
# Generate voiceover using ElevenLabs API
# Usage: ./generate-voiceover.sh
# Requires: curl

API_KEY="sk_55c3c23fc4c94f72691908ea429f8c6c955e6f05fb726f9b"
VOICE_ID="21m00Tcm4TlvDq8ikWAM"  # "Rachel" - professional female voice
OUTPUT_FILE="public/voiceover.mp3"

SCRIPT="How many calls did your business miss this week? Be honest. Every one of those callers didn't leave a voicemail — they called the next company on Google. And depending on your business, that's anywhere from five hundred to fifteen thousand dollars per missed call. Gone.

Now imagine every single call gets answered — twenty-four seven, nights, weekends, holidays. An AI receptionist that sounds like a real person picks up, answers the caller's questions about your business, collects their info, qualifies whether they're a real lead, routes them to the right team member or transfers the call, books the appointment straight to your calendar or your team's calendars — never double books, never schedules when you're unavailable — and sends reminder notifications to your customers so they actually show up.

Set it to answer every call, or just the ones you can't get to. Either way, no more losing customers to voicemail.

It comes with its own built-in CRM so every call, every customer, every detail is tracked in one place. Works in English and Spanish. And you don't need to pay anyone to set it up — you can do it yourself in under ten minutes. Or book a consultation and we'll help you set it up.

Sign up today at crecimos dot com."

echo "Generating voiceover with ElevenLabs (Rachel voice)..."

mkdir -p public

curl -X POST "https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}" \
  -H "Accept: audio/mpeg" \
  -H "Content-Type: application/json" \
  -H "xi-api-key: ${API_KEY}" \
  -d "{
    \"text\": $(echo "$SCRIPT" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read()))'),
    \"model_id\": \"eleven_turbo_v2_5\",
    \"voice_settings\": {
      \"stability\": 0.5,
      \"similarity_boost\": 0.8,
      \"style\": 0.4,
      \"use_speaker_boost\": true
    }
  }" \
  --output "${OUTPUT_FILE}"

if [ -f "${OUTPUT_FILE}" ] && [ -s "${OUTPUT_FILE}" ]; then
  echo "Voiceover saved to ${OUTPUT_FILE}"
  echo "File size: $(du -h ${OUTPUT_FILE} | cut -f1)"
else
  echo "Error: Failed to generate voiceover. Check your API key and try again."
  exit 1
fi
