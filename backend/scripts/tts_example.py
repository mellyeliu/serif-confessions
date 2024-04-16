import torch
from TTS.api import TTS

# Get device
device = "cuda" if torch.cuda.is_available() else "cpu"

# List available 🐸TTS models
print(TTS().list_models())
# Init TTS with the target model name
tts = TTS(model_name="tts_models/multilingual/multi-dataset/xtts_v2", progress_bar=True).to(device)
# 'tts_models/en/ek1/tacotron2'

# Run TTS
tts.tts_to_file(text="I went out of town for a trip to the desert with my girlfriends for my bachelorette party. We partied there for the whole weekend but after we got back, we couldn’t find any record of the town we stayed in. Nothing showed up on Google Maps. We looked up the hotel we stayed, the restaurants we ate at, the bars we hung out at-- all of them were wiped off the internet.", speaker_wav="./scripts/data/christina_test.wav", language="en", file_path="output.wav")