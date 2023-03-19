from flask import Flask, render_template
from flask_socketio import SocketIO, send

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@socketio.on('connect')
def handle_connect():
    print('Client connected')
    #send('hello world')

@socketio.on('message')
def handle_message(data):
    print('Received message:', data)
    #emit('response', 'Hello from Flask!')


if __name__ == '__main__':
    socketio.run(app, host='10.232.33.191', port=5001)
