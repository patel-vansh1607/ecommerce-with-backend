from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
CORS(app)

# Store DB in the same directory as app.py
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(basedir, 'products.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define Product model
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    price = db.Column(db.Float, nullable=False)

# Create database if it doesn't exist
with app.app_context():
    db.create_all()

# Route: Register User
@app.route('/v1/users', methods=['POST'])
def register_user():
    data = request.get_json()
    print("User Data Received:", data)
    return jsonify({'message': 'User registered successfully'}), 201

# Route: Add Product
@app.route('/products', methods=['POST'])
def add_product():
    data = request.get_json()
    try:
        new_product = Product(
            name=data['name'],
            description=data.get('description', ''),
            price=float(data['price'])
        )
        db.session.add(new_product)
        db.session.commit()
        return jsonify({'message': 'Product added'}), 201
    except Exception as e:
        print("Error adding product:", e)
        return jsonify({'error': str(e)}), 400

# Route: Get Products
@app.route('/products', methods=['GET'])
def get_products():
    try:
        products = Product.query.all()
        result = [
            {
                'id': p.id,
                'name': p.name,
                'description': p.description,
                'price': p.price
            } for p in products
        ]
        return jsonify(result)
    except Exception as e:
        print("Error fetching products:", e)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
