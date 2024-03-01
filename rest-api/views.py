from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os

from utils import PinataIPFSStorage
from openai import BlockchainAuditAssistant

# Initialize your IPFS class and the AI assistant outside of the route to avoid reinitialization
ipfs_storage = PinataIPFSStorage()
openai_api_ky = os.environ["OPENAI_API_KEY"]
blockchain_audit_assistant = BlockchainAuditAssistant(openai_api_key="your_openai_api_key_here")

# Assuming you've already implemented the PinataIPFSStorage class and openai_hello_world function

app = Flask(__name__)

def configure_routes(app):
    @app.route('/upload-to-ipfs', methods=['POST'])
    def upload_to_ipfs():
        # Your existing code for handling file uploads to IPFS
        pass

    @app.route('/interact-with-openai', methods=['POST'])
    def interact_with_openai():
        content = request.json

        if not content or 'question' not in content:
            return jsonify({'error': 'No question provided'}), 400
        
        question = content['question']
        
        # Initialize and set up the assistant if not already done
        if not blockchain_audit_assistant.assistant_id:
            blockchain_audit_assistant.create_assistant()
            blockchain_audit_assistant.start_conversation()
        
        # Send the question to the assistant
        blockchain_audit_assistant.send_message(question)
        
        # Run the assistant to get the answer
        blockchain_audit_assistant.run_assistant()
        
        # Retrieve the response
        responses = blockchain_audit_assistant.get_responses()
        if responses:
            last_response = responses[-1]  # Get the latest response
            return jsonify({'answer': last_response['content']['text']['value']})
        else:
            return jsonify({'error': 'Failed to get an answer from the assistant'}), 500

# Don't forget to call configure_routes with your Flask app
configure_routes(app)

if __name__ == '__main__':
    app.run(debug=True)