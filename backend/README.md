# Dependencies
- Docker
- Supabase
# Installion
Recommended - use a python env!
```
conda create -n "serifenv" python=3.9
conda activate serifenv
python -m pip install -r requirements.txt
```

# Getting started
Flask server will start on localhost:5000 by default:
```
flask run
```

# Example POST
```
curl --request POST 'http://127.0.0.1:5000/confessions' --header \
'Content-Type: application/json' --data \
'{"prompt_id": 4, "text": "Sometimes I want to be a bird", "user_id": 4}'
```
You should see the equivalent 
# Testing TTS 
Use a virtual environment & run
`pip install -r /path/to/requirements.txt`

# Deploying to Heroku
Currently hosted at: https://serif-confessions-aa78f08a8671.herokuapp.com/