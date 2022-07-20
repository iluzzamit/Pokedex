from ctrl.pokedex import pokedex_blueprint
from flask import Flask, render_template

app = Flask(__name__, static_url_path='', static_folder='client/build/', template_folder='client/build/')
app.register_blueprint(pokedex_blueprint, url_prefix='/pokemon')

@app.route('/')
def index():
    return render_template(r'index.html')

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response


if __name__ == '__main__':
    app.run(port=8080)
