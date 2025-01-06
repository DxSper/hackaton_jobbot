import os
from mistralai.client import MistralClient
from backend.mistral_settings import MISTRAL_API_KEY

def get_mistral_client():
    api_key = os.environ.get("MISTRAL_API_KEY", MISTRAL_API_KEY)
    return MistralClient(api_key=api_key)
