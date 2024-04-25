class PuppyImageGenerator:
    def __init__(self) -> None:
        pass

    def synthesize(self, text_prompt: str, outfolder: str, response_id: int):
        files = []
        for i in range(5):
            files.append(f"src/data/puppy_{i}.png")
        return files