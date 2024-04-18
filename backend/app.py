from flask import Flask, request, jsonify
import os
from supabase import create_client, Client
from multiprocessing import Process
from src.tts import XTTS
from flask_cors import CORS
import logging
app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app, resources={r"/*": {"origins": "*"}})

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
    if uploaded_audio_data.status_code == 200:
        print(f"Upload successful: {audiofile_name}")
    else:
        print(f"Upload for confession {response_id} failed")

"""
Creates equivalent confession in database
and generates audio transcriptions for the given text
"""
@app.route('/confessions', methods=['POST', 'OPTIONS'])
def create_confession():
    if request.method == 'OPTIONS':
        # This will be handled by Flask-CORS
        return {}
    data = request.json
    # TODO: Validate data before adding to table
    table_result = supabase.table("confessions").insert(data).execute()
    # TODO: Validate that response is correct shape
    p = Process(target=async_generate_confession_assets, args=(table_result.data[0]['id'],data['text'],))
    p.start()
    response = jsonify(table_result.data)
    return response

if __name__ == '__main__':
   app.run(port=5000, debug=True)