import base64
import os
import requests

engine_id = "stable-diffusion-v1-6"
api_host = os.getenv('API_HOST', 'https://api.stability.ai')
api_key = os.getenv("STABILITY_API_KEY")

if api_key is None:
    raise Exception("Missing Stability API key.")


class StableDiffusionImageGenerator:
    def __init__(self) -> None:
        pass
    def synthesize(text_prompt: str, outfolder: str, response_id: int):
        response = requests.post(
            f"{api_host}/v1/generation/{engine_id}/text-to-image",
            headers={
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": f"Bearer {api_key}"
            },
            json={
                "text_prompts": [
                    {
                        "text": text_prompt
                    }
                ],
                "cfg_scale": 7,
                "height": 1024,
                "width": 1024,
                "samples": 5,
                "steps": 30,
            },
        )

        if response.status_code != 200:
            raise Exception("Non-200 response: " + str(response.text))

        data = response.json()

        files = []
        for i, image in enumerate(data["artifacts"]):
            imfile = f"{outfolder}/v1_txt2img_{i}_{response_id}.png"
            files.append(imfile)
            with open(imfile, "wb") as f:
                f.write(base64.b64decode(image["base64"]))
        return files