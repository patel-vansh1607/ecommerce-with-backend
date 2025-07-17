from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

@app.route('/v1/users', methods=['POST'])
def register_user():
    data = request.get_json()
    print(data) 
    return jsonify({'message': 'User registered successfully'}), 201

if __name__ == '__main__':
    app.run(port=5000, debug=True)
