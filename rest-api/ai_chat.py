import openai
import json

class BlockchainAuditAssistant:
    def __init__(self, key):
        self.client = openai.Client(api_key=key)
        self.assistant_id = None
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
        
        messages = []
        print (messages_page.content)
        for message in list(messages_page):
            # Assuming message is an object with attributes you can access
            if message.role == 'assistant':
                # Adjust how you access message content based on its actual structure
                print (message.content)
                messages.append(message.content)

        return messages



    def run_assistant(self, instructions=None):
        """Run the assistant to process the thread and generate a response."""
        if self.thread_id is None or self.assistant_id is None:
            raise ValueError("Assistant or conversation not initialized properly.")
        custom_instructions = instructions if instructions else "Provide detailed blockchain security and audit insights."
        run = self.client.beta.threads.runs.create(
            thread_id=self.thread_id,
            assistant_id=self.assistant_id,
            instructions=custom_instructions
        )
        return run