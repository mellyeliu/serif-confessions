# Dependencies
- Docker
- Supabase
# Getting Started
From https://supabase.com/docs/guides/functions/quickstart:
`supabase start` # start the supabase stack
`supabase functions serve` # start the Functions watcher

# Example command
```
curl --request POST 'http://localhost:54321/functions/v1/hello-world' \
  --header 'Authorization: Bearer SUPABASE_ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data '{ "name":"Functions" }'
```

# Testing TTS 
Use a virtual environment & run
`pip install -r /path/to/requirements.txt`