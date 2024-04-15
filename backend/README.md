# Dependencies
- Docker
- Supabase
# Getting Started
From https://supabase.com/docs/guides/functions/quickstart:
`supabase start`
`supabase functions serve`

# Example command
```
curl --request POST 'http://localhost:54321/functions/v1/hello-world' \
  --header 'Authorization: Bearer SUPABASE_ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data '{ "name":"Functions" }'
```