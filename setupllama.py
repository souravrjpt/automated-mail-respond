import sys
from transformers import LlamaForCausalLM, LlamaTokenizer

# Load the model and tokenizer
model_name = "models/llama-2-7b-chat.Q4_K_M.gguf"
model = LlamaForCausalLM.from_pretrained(model_name)
tokenizer = LlamaTokenizer.from_pretrained(model_name)

def generate_reply(email_content):
    inputs = tokenizer.encode(email_content, return_tensors="pt")
    outputs = model.generate(inputs, max_length=512, num_return_sequences=1)
    reply = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return reply

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python setupllama.py <email_content>")
        sys.exit(1)

    email_content = sys.argv[1]
    reply = generate_reply(email_content)
    print(reply)
