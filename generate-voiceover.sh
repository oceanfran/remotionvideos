#!/bin/bash
# Generate voiceover using ElevenLabs API
# Usage: ./generate-voiceover.sh
# Requires: curl, jq (optional)

API_KEY="sk_55c3c23fc4c94f72691908ea429f8c6c955e6f05fb726f9b"
VOICE_ID="21m00Tcm4TlvDq8ikWAM"  # "Rachel" - professional female voice
OUTPUT_FILE="public/voiceover.mp3"

SCRIPT="Crecimos. Never miss a call again.

Every day, businesses lose thousands of dollars from unanswered calls. Sixty-two percent of calls go unanswered. Eighty-five percent of those callers will never call back.

Meet Crecimos. Your AI-powered phone assistant that answers every call, books appointments instantly, and keeps your business running twenty-four seven.

With twenty-four seven AI answering, smart booking, five-minute setup, and seamless CRM integration, Crecimos has everything you need to grow.

It's simple. A customer calls. Your AI answers. Appointments are booked and confirmed automatically.

One hundred percent of calls answered. Three times more bookings. Always available.

Start growing today. Set up in five minutes. Try Crecimos free at crecimos.com."

echo "Generating voiceover with ElevenLabs..."

curl -X POST "https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}" \
  -H "Accept: audio/mpeg" \
  -H "Content-Type: application/json" \
  -H "xi-api-key: ${API_KEY}" \
  -d "{
    \"text\": $(echo "$SCRIPT" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read()))'),
    \"model_id\": \"eleven_turbo_v2_5\",
    \"voice_settings\": {
      \"stability\": 0.6,
      \"similarity_boost\": 0.8,
      \"style\": 0.3,
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
