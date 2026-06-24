const { ElevenLabsClient } = require("elevenlabs");

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

const textToSpeech = async (req, res) => {
  try {
    const client = new ElevenLabsClient({
      apiKey: process.env.ELEVENLABS_API_KEY,
    });
    const { text } = req.body;

    const audio = await client.textToSpeech.convert("JBFqnCBsd6RMkjVDRZzb", {
      text,
      model_id: "eleven_multilingual_v2",
      output_format: "mp3_44100_128",
    });

    const chunks = [];
    for await (const chunk of audio) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    res.set("Content-Type", "audio/mpeg");
    res.send(buffer);
  } catch (e) {
    console.log("TTS Error:", e);
    res.status(500).json({ message: e.message });
  }
};

module.exports = { textToSpeech };
