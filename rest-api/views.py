from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os

from utils import PinataIPFSStorage
from ai_chat import BlockchainAuditAssistant

# Initialize your IPFS class and the AI assistant outside of the route to avoid reinitialization
ipfs_storage = PinataIPFSStorage()
openai_api_key = os.environ["OPENAI_API_KEY"]
blockchain_audit_assistant = BlockchainAuditAssistant(key=openai_api_key)

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
        
        if not blockchain_audit_assistant.assistant_id:
            blockchain_audit_assistant.create_assistant()
        
        blockchain_audit_assistant.start_conversation()
        
        blockchain_audit_assistant.send_message(question)
        blockchain_audit_assistant.run_assistant()
        responses = blockchain_audit_assistant.get_responses()
        
        if responses:
            print (responses)
            return jsonify(responses)
        else:
            return jsonify({'error': 'Failed to get an answer from the assistant'}), 500







# Don't forget to call configure_routes with your Flask app
configure_routes(app)

if __name__ == '__main__':
    app.run(debug=True)