import openai
import json
import time

class BlockchainAuditAssistant:
    def __init__(self, key):
        self.client = openai.Client(api_key=key)
        self.assistant_id = "asst_DDyuPMD67NtTa9aGFVq4zzrv"
        self.thread_id = None

    def create_assistant(self, name="Blockchain Security Assistant"):
        """Create an assistant specialized in blockchain security and audits."""
        self.assistant = self.client.beta.assistants.create(
            name=name,
            instructions="You are an assistant specialized in blockchain security, smart contract audits, and providing audit reports. Answer questions related to this domain.",
            tools=[{"type": "code_interpreter"}, {"type": "retrieval"}],  # Assuming retrieval could be useful for fetching relevant data or examples
            model="gpt-4-turbo-preview"  # Specify the model appropriate for the task
        )
        assistant_object = json.loads(self.assistant.model_dump_json())
        assistant_id = dict(assistant_object).get("id")
        self.assistant_id = assistant_id

    def start_conversation(self):
        """Start a new conversation thread."""
        thread = self.client.beta.threads.create()
        thread_object = json.loads(thread.model_dump_json())
        thread_id = dict(thread_object).get("id")
        self.thread_id = thread_id

    def send_message(self, message_content):
        """Send a message to the thread."""
        if self.thread_id is None:
            raise ValueError("Conversation not started. Call start_conversation() first.")
        self.client.beta.threads.messages.create(
            thread_id=self.thread_id,
            role="user",
            content=message_content
        )

    def get_responses(self):
        """Retrieve messages from the assistant in the current thread."""
        if self.thread_id is None:
            raise ValueError("Conversation not started. Call start_conversation() first.")

        messages_page = self.client.beta.threads.messages.list(thread_id=self.thread_id)

        # Initialize a list to hold the message history
        message_history = []

        # Iterate through each message in the thread, similar to the display_messages method
        for message in reversed(messages_page.data):
            # Ensure there's content and it's in the expected list structure
            if message.content:
                try:
                    # Directly access the text value from the first content item's text attribute
                    print ("message content is there")
                    text_value = message.content[0].text.value
                except AttributeError:
                    # Fallback in case the structure isn't as expected
                    text_value = 'No text found'
            else:
                text_value = 'Content not in expected format'

            # Append a dictionary representing this message to the message_history list
            message_history.append({
                "role": message.role,  # Who sent the message ('user' or 'assistant')
                "content": text_value  # The text content of the message
            })

        # Since we reversed the list for appending, reverse again to maintain original order
        return list(reversed(message_history))


    def run_assistant(self, instructions=None):
        """Run the assistant to process the thread and generate a response, waiting until completion."""
        if self.thread_id is None or self.assistant_id is None:
            raise ValueError("Assistant or conversation not initialized properly.")
        
        custom_instructions = instructions if instructions else "Provide detailed blockchain security and audit insights."
        # Start the assistant run
        run = self.client.beta.threads.runs.create(
            thread_id=self.thread_id,
            assistant_id=self.assistant_id,
            instructions=custom_instructions,
        )

        # Check the status of the run until it's completed
        while True:
            # Retrieve the current status of the run
            run_status = self.client.beta.threads.runs.retrieve(thread_id=self.thread_id, run_id=run.id)
            if run_status.status == 'completed':
                break
            time.sleep(1) 
        return run
