from flask import Flask, request
import os
from supabase import create_client, Client
from multiprocessing import Process
from src.tts import XTTS
import pathlib
app = Flask(__name__)

SUPABASE_PROJECT_URL: str = os.getenv('SUPABASE_PROJECT_URL')
SUPABASE_API_KEY: str = os.getenv('SUPABASE_API_KEY')
supabase: Client = create_client(SUPABASE_PROJECT_URL, SUPABASE_API_KEY)
tts = XTTS()

def async_generate_confession_assets(*args):
    response_id = args[0]
    text = args[1]
    print(f"Starting TTS generation for confession {response_id}")
    
    audiofile_name = f"c_{response_id}.wav"
    outfile = f"/tmp/{audiofile_name}"
    tts.synthesize(text, "en", outfile=outfile)
    uploaded_audio_data = supabase.storage.from_('confessions-audio').upload(audiofile_name, outfile)
    if uploaded_audio_data.ok:
        print(f"Upload successful: {audiofile_name}")
    else:
        print(f"Upload for confession {response_id} failed")
    print(f"Upload is successful? {'yes' if uploaded_audio_data.ok else 'no'}")

@app.route('/confessions', methods=['POST'])
def create_confession():
    data = request.json
    # TODO: Validate data before adding to table
    response = supabase.table("confessions").insert(data).execute()
    # TODO: Validate that response is correct shape
    # generate TTS 
    p = Process(target=async_generate_confession_assets, args=(response.data[0]['id'],data['text'],))
    p.start()
    return response.data

if __name__ == '__main__':
   app.run(port=5000, debug=True)