from flask import Flask, send_file, send_from_directory
import os

app = Flask(__name__, static_folder='build/static')

@app.route('/animation')
def animation():
    return send_file("celestial_animation.gif")  # Serve the animation video

@app.route('/')
def serve_react_app():
    return send_from_directory('build', 'index.html')  # Serve the React app's HTML

@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('build/static', path)

if __name__ == '__main__':
    app.run(debug=True)
