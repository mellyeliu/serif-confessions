from openai import OpenAI
import os
from multiprocessing import Pool
import urllib.request

api_key = os.getenv("OPENAI_API_KEY")
if api_key is None:
    raise Exception("Missing OpenAI API key.")

class DalleImageGenerator:
    def __init__(self) -> None:
        self.client = OpenAI(api_key=api_key)

    def _generate_image_with_prompt(self, text_prompt: str):
        response = self.client.images.generate(
            model="dall-e-3",
            prompt=text_prompt,
            size="1024x1024",
            quality="standard",
            n=1
        )
        return response.data[0].url
    
    def synthesize(self, text_prompt: str, outfolder: str, response_id: int):
        # with Pool(5) as p:
        #     result_urls = p.map(self._generate_image_with_prompt, [text_prompt] * 5)
        result_urls = []
        for i in range(5):
            result_urls.append(self._generate_image_with_prompt(text_prompt=text_prompt))
        files = []
        for (i, r) in enumerate(result_urls):
            local_file = f"{outfolder}/v1_txt2img_{i}_{response_id}.png"
            with open(local_file, "wb") as f:
                urllib.request.urlretrieve(r, local_file)
            files.append(local_file)
        return files