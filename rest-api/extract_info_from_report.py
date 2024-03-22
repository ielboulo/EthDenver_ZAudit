#pip install Flask openai

from flask import Flask, request, jsonify
import openai
import os

app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route('/upload_and_extract', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    try:
        content = file.read().decode("utf-8")
        
        # Assuming you have a function that calls OpenAI's API
        # and extracts the required information from the content
        extracted_info = extract_information_with_openai(content)
        
        # Save extracted information to a JSON file
        filename = os.path.splitext(file.filename)[0] + '_extracted.json'
        with open(filename, 'w') as f:
            json.dump(extracted_info, f)
        
        return jsonify({'message': 'File processed', 'extracted_file': filename}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


def extract_information_with_openai(content):

    # Adjusting the prompt for OpenAI API call
    detailed_prompt = (
        "Please read the following smart contract audit report carefully. "
        "Then, provide a summary including the following information: "
        "- Name of the auditor "
        "- Date of the final report "
        "- The final commit hash of audited smart contracts "
        "- Total number of vulnerabilities "
        "- For each vulnerability, list its : title, severity and a summary of the detected issue.\n\n"
        f"Report content:\n{content}"
    )

    response = openai.Completion.create(
        engine="davinci",
        prompt=detailed_prompt,
        temperature=0.5,  # Adjusted for more deterministic responses
        max_tokens=1500,  # Increased token limit for more detailed responses
        top_p=1.0,
        frequency_penalty=0.0,
        presence_penalty=0.0,
        stop=["\n\n"]  # You might add a stopping point if the reports follow a consistent format
    )
    # Assuming `response_text` is directly provided as `content` for simulation purposes
    response_text = response["choices"][0]["text"].strip()

    # Extracting each piece of information using regular expressions
    name_of_the_auditor = re.search(r"Name of the Auditor: (.+)", response_text).group(1)
    date_of_final_report = re.search(r"Date of Final Report: (.+)", response_text).group(1)
    initial_commit_hash = re.search(r"Initial Commit Hash: (.+)", response_text).group(1)
    final_commit_hash = re.search(r"Final Commit Hash: (.+)", response_text).group(1)
    total_number_of_vulnerability = int(re.search(r"Total Number of Vulnerabilities: (\d+)", response_text).group(1))
    
    # Extracting vulnerabilities
    vulnerabilities_text = re.findall(r"Title: (.+?)\n\s*Severity: (.+?)\n\s*Summary: (.+?)(?=\n\s*Title:|\Z)", response_text, re.DOTALL)
    
    vulnerabilities_info = []
    for vulnerability in vulnerabilities_text:
        vulnerabilities_info.append({
            "title": vulnerability[0],
            "severity": vulnerability[1],
            "summary": vulnerability[2].strip()  # Strip to remove any trailing whitespace
        })

    # Assembling the extracted information into a structured dictionary
    extracted_info = {
        "name_of_the_auditor": name_of_the_auditor,
        "date_of_final_report": date_of_final_report,
        "commit_hash": {
            "initial_commit_hash": initial_commit_hash,
            "final_commit_hash": final_commit_hash
        },
        "total_number_of_vulnerability": total_number_of_vulnerability,
        "vulnerabilities": vulnerabilities_info
    }

    return extracted_info


if __name__ == '__main__':
    app.run(debug=True)

### example of extraction :

    # Total Number of Vulnerabilities: 6
    #     Informational: 3
    #     Best Practices: 3

    # Score of the Auditor: The document mentions "Documentation Assessment" and "Test Suite Assessment" scores as "High", but does not explicitly provide an overall auditor score. So, if we consider "High" as an indication of quality in these areas, the auditor score could be considered as "High". Otherwise, for a general score not explicitly mentioned, output "NA".

    # Name of the Auditor: Nethermind

    # The Commit Hash if Audited Smart Contracts:
    #     Initial Commit Hash: 5ca2536c6cfccb7527dd633796d46a0d2f74febd
    #     Final Commit Hash: be3ca1f2b55e1de94399c29da854adb30184bebc

    # For Each Vulnerability, Its Corresponding Title, Severity, and a Summary of Detected Issue:

    #     Title: Hardcoded Token Address
    #         Severity: Info
    #         Summary: The $STRK address is hardcoded to its address on the Sepolia testnet, which may differ on the mainnet and would require manual checks and code changes before deployment.

    #     Title: Low Trust on Alexandria Merkle Tree Library
    #         Severity: Info
    #         Summary: There exists an external dependency from the Alexandria library which has not undergone an audit, raising concerns about the overall integrity and reliability of the system.

    #     Title: Possible Hash Collision When Calculating the Hash of Leaves
    #         Severity: Info
    #         Summary: The leaf of the Merkle tree is computed in a way that could theoretically allow an attacker to provide a combination leading to a valid claim, which could drain the contract. This was fixed by changing the hashing method.

    #     Title: Maintainable Imports Rather Single Line for Every Import
    #         Severity: Best Practices
    #         Summary: The current coding style imports external libraries one by one on a single line, which does not align with best coding practices. It's recommended to consolidate these imports to improve readability and maintainability.

    #     Title: Unchecked Return Value for Token Transfer
    #         Severity: Best Practices
    #         Summary: The return value of the token transfer function is unchecked, which is not a good practice in case the token transfer fails. This issue has been fixed.

    #     Title: Use of Poseidon Hashing Instead of Pedersen
    #         Severity: Best Practices
    #         Summary: The contract initially used Pedersen hashing, which is resource-intensive. It's recommended to switch to Poseidon hashing for efficiency. This change has been implemented.