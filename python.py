# Flask-based Python Backend
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Simulated in-memory storage
users = {}
messages = {
    "general": [],
    "sports": [],
    "technology": [],
    "random": []
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    users[username] = {"avatar": f"https://api.adorable.io/avatars/40/{username}.png"}
    return jsonify({"username": username, "avatar": users[username]["avatar"]})

@app.route('/send_message', methods=['POST'])
def send_message():
    room = request.form['room']
    username = request.form['username']
    message = request.form['message']
    messages[room].append({"username": username, "message": message})
    return jsonify({"success": True})

@app.route('/get_messages/<room>', methods=['GET'])
def get_messages(room):
    return jsonify(messages[room])

if __name__ == '__main__':
    app.run(debug=True)
