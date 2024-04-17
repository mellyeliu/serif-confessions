import torch
from TTS.api import TTS
import tempfile
MODEL_ID = "tts_models/multilingual/multi-dataset/xtts_v2"
SPEAKER_WAV = "./src/data/christina_test.wav"
class XTTS:
    def __init__(self) -> None:
        # Initialize the TTS model with GPU support based on system availability
        self.tts = TTS(MODEL_ID, gpu=torch.cuda.is_available())
    
    def synthesize(self, text: str, lang: str, outfile: str):
        self.tts.tts_to_file(text=text, speaker_wav=SPEAKER_WAV, language=lang, file_path=outfile)
