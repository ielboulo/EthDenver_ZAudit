import requests
from dotenv import load_dotenv
import os


# Make sure to set the environment variable PINATA_API_TOKEN in .env file
load_dotenv()


class PinataIPFSStorage:
    BASE_URL = 'https://api.pinata.cloud/'

    def __init__(self):
        self.api_token = os.environ["PINATA_API_TOKEN"]

    def _headers(self):
        return {
            'Authorization': f'Bearer {self.api_token}'
        }

    def upload_file(self, file_path):
        """Upload a file to Pinata Cloud IPFS storage."""
        with open(file_path, 'rb') as file:
            files = {'file': file}
            response = requests.post(
                self.BASE_URL + 'pinning/pinFileToIPFS',
                files=files,
                headers=self._headers()
            )
            if response.status_code == 200:
                return response.json()
            else:
                # TODO: add better error handling
                response.raise_for_status()

    def get_file_url(self, hash):
        """Generate a URL for accessing a file stored on IPFS via ipfs.io."""
        return f"https://ipfs.io/ipfs/{hash}"

    def upload_and_get_url(self, file_path):
        """Upload a file and immediately return the URL of the newly pinned file on IPFS."""
        upload_result = self.upload_file(file_path)
        if 'IpfsHash' in upload_result:
            return self.get_file_url(upload_result['IpfsHash'])
        else:
            raise Exception("Failed to upload file to IPFS.")
        

def openai_hello_world():
    return "Hello World"

# Example usage
# Ensure you set PINATA_API_TOKEN as an environment variable
# ipfs_storage = PinataIPFSStorage()
# file_url = ipfs_storage.upload_and_get_url('./audit_report.pdf')
# print(file_url)