from langchain_community.llms import LlamaCpp
from langchain.prompts import PromptTemplate
from langchain.prompts import ChatPromptTemplate
from langchain.chains import LLMChain
from langchain.memory import ConversationBufferMemory

from flask import Flask, request, json

app = Flask(__name__)

# Load the LlamaCpp language model, adjust GPU usage based on your hardware
llm = LlamaCpp(
    model_path="models/llama-2-7b-chat.Q4_K_M.gguf",
    n_gpu_layers=40,
    n_batch=1024,  # Batch size for model processing
    verbose=False,  # Enable detailed logging for debugging
    n_ctx=1024
)


template = """
TASK:
You're a mail responder in my behalf and your task is to analyze the mail and generate a polite and professional reply 
to the mail. Also add their name in response after 'Hi'.

Query:{query}
Answer:
"""



prompt = PromptTemplate.from_template(template=template)

llm_chain = LLMChain(prompt=prompt, llm=llm)

print("Reply.....")

@app.route('/ask', methods=['GET'])
def ask():
    question = request.args.get('prompt')
    final_prompt = prompt.format(query=question)
    answer = llm_chain.run(final_prompt)
    return {'response':answer}
    
if __name__ == "__main__":
    app.run(host="0.0.0.0")