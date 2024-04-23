from flask import Flask, request, jsonify
import os
import supabase
from supabase import create_client, Client
from multiprocessing import Process
from src.tts import XTTS
from src.local_tts import LocalXTTS
from flask_cors import CORS
from src.stable_diffusion import synthesize_images
app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'

# CORS(app, resources={r"/*": {"origins": ["*.serif-confessions.netlify.app/", "*serif.app/*"]}})
CORS(app, resources={r"/*": {"origins": ["*"]}})
SUPABASE_PROJECT_URL: str = os.getenv('SUPABASE_PROJECT_URL')
SUPABASE_API_KEY: str = os.getenv('SUPABASE_API_KEY')
USE_LOCAL_MODELS: bool = os.getenv('USE_LOCAL_MODELS')
supabase: Client = create_client(SUPABASE_PROJECT_URL, SUPABASE_API_KEY)
if USE_LOCAL_MODELS:
    tts = LocalXTTS()
else:
    tts = XTTS()

def async_generate_confession_audio(*args):
    response_id = args[0]
    text = args[1]
    print(f"Starting TTS generation for confession {response_id}")
    
    audiofile_name = f"c_{response_id}.wav"
    out_audiofile = f"/tmp/{audiofile_name}"
    tts.synthesize(text, "en", outpath=out_audiofile)
    uploaded_audio_data = supabase.storage.from_('confessions-audio').upload(audiofile_name, out_audiofile)
    if uploaded_audio_data.status_code == 200:
        print(f"Upload successful: {audiofile_name}")
        public_url = f"{SUPABASE_PROJECT_URL}/storage/v1/object/public/{uploaded_audio_data.json()['Key']}"
        # Update audio_url on confession with public url to mark upload as complete
        supabase.table("confessions").update({"audio_url": public_url}).eq("id", response_id).execute()
    else:
        print(f"Upload for confession {response_id} failed")

def async_generate_confession_images(*args):
    response_id = args[0]
    text = args[1]
    print(f"Starting image generation for confession {response_id}")
    out_imagefolder = f"/tmp"
    prompt = f"{text} in the style of a detailed pencil sketch"
    if USE_LOCAL_MODELS:
        image_files = []
        for i in range(5):
            image_files.append(f"src/data/puppy_{i}.png")
    else:
        image_files = synthesize_images(prompt, out_imagefolder, response_id)
    
    for image_file in image_files:
        file_path = f"/{response_id}/{os.path.basename(image_file)}"
        im_file = image_file
        if USE_LOCAL_MODELS:
            im_file = "src/data/puppy.png"
        uploaded_video_data = supabase.storage.from_('confessions-images').upload(file_path, im_file, {
            "contentType": "image/png",
        })
        print(uploaded_video_data.json())
        print(f"Upload successful: {file_path}")
    
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
    p1 = Process(target=async_generate_confession_audio, args=(table_result.data[0]['id'], data['text'],))
    p2 = Process(target=async_generate_confession_images, args=(table_result.data[0]['id'], data['text'],))
    p1.start()
    p2.start()
    response = jsonify(table_result.data)
    return response

if __name__ == '__main__':
   app.run(port=5000, debug=True)