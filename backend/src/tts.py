# import torch
# from TTS.api import TTS
# import tempfile
# MODEL_ID = "tts_models/multilingual/multi-dataset/xtts_v2"
# SPEAKER_WAV = "./src/data/christina_test.wav"
# class XTTS:
#     def __init__(self) -> None:
#         # Initialize the TTS model with GPU support based on system availability
#         self.tts = TTS(MODEL_ID, gpu=torch.cuda.is_available())
    
#     def synthesize(self, text: str, lang: str, outfile: str):
#         self.tts.tts_to_file(text=text, speaker_wav=SPEAKER_WAV, language=lang, file_path=outfile)

import replicate
import requests
class XTTS:
    def __init__(self) -> None:
        return
    def synthesize(self, text: str, lang: str, outpath: str):
        input = {
            "speaker": "https://kovldxcnymhyquwknlln.supabase.co/storage/v1/object/public/confessions-audio/christina_test.wav",
            "text": text
        }
        replicate_url = replicate.run(
            "lucataco/xtts-v2:684bc3855b37866c0c65add2ff39c78f3dea3f4ff103a436465326e0f438d55e",
            input=input
        )
        content = requests.get(replicate_url).content
        open(outpath, "wb").write(content)
