from flask import Flask, request, render_template_string, jsonify
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

app = Flask(__name__)

# Load model and tokenizer (use a smaller model if needed for lower RAM)
model_name = "mistralai/Mistral-7B-v0.1"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    load_in_4bit=True,
    device_map="auto"
)

# Generate response function
def generate_response(prompt):
    inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
    output = model.generate(**inputs, max_new_tokens=200)
    return tokenizer.decode(output[0], skip_special_tokens=True)

# HTML Template for the frontend
chat_html = """
<!DOCTYPE html>
<html>
<head>
    <title>My AI Assistant</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f3f3f3;
            text-align: center;
            padding-top: 50px;
        }
        .container {
            width: 60%;
            margin: auto;
            background: white;
            padding: 20px;
            border-radius: 10px;
        }
        textarea {
            width: 80%;
            height: 100px;
            margin-bottom: 10px;
        }
        button {
            padding: 10px 20px;
            font-size: 16px;
        }
        #responseBox {
            margin-top: 20px;
            font-size: 18px;
            white-space: pre-wrap;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Ask Me Anything</h1>
        <textarea id="prompt" placeholder="Type your question..."></textarea>
        <button onclick="sendPrompt()">Ask</button>
        <div id="responseBox"></div>
    </div>
    <script>
        async function sendPrompt() {
            const prompt = document.getElementById("prompt").value;
            const response = await fetch("/ask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt })
            });
            const data = await response.json();
            document.getElementById("responseBox").innerText = data.response;
        }
    </script>
</body>
</html>
"""

# Routes
@app.route("/")
def home():
    return render_template_string(chat_html)

@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json()
    prompt = data.get("prompt", "")
    response = generate_response(prompt)
    return jsonify({"response": response})

# Run the server
if __name__ == "__main__":
    app.run(debug=True)
