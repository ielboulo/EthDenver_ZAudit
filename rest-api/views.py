from flask import request, jsonify
from werkzeug.utils import secure_filename
import os
from utils import PinataIPFSStorage, openai_hello_world

# Initialize your IPFS class outside of the route to avoid reinitialization on each call
ipfs_storage = PinataIPFSStorage()

def configure_routes(app):
    @app.route('/upload-to-ipfs', methods=['POST'])
    def upload_to_ipfs():
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        
        filename = secure_filename(file.filename)
        temp_path = os.path.join('/tmp', filename)
        file.save(temp_path)
        
        try:
            file_url = ipfs_storage.upload_and_get_url(temp_path)
            os.remove(temp_path)
            return jsonify({'message': 'Successfully uploaded to IPFS', 'file_url': file_url})
        except Exception as e:
            os.remove(temp_path)
            return jsonify({'error': str(e)}), 500

    @app.route('/interact-with-openai', methods=['POST'])
    def interact_with_openai():
        # Placeholder function for now
        response = openai_hello_world()
        return jsonify({'response': response})