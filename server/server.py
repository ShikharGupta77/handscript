from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import datetime
import base64
import io
from PIL import Image
from io import BytesIO
from ImageProcessor import processImage

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*") # anything can connect, bad practice... but who's gonna see this anyways :D

@socketio.on('connect')
def test_connect(auth):
    print('recieved connection!!!')

@socketio.on('frameSend')
def frameSend(img_data):
    # decode
    to_decode = img_data[img_data.index(',')+1:]
    image_data = base64.b64decode(to_decode)
    image = Image.open(BytesIO(image_data))

    # change
    new_image, predictions, confidences = processImage(image)

    # encode
    buff = BytesIO()
    new_image.save(buff, format="png")
    encoded = base64.b64encode(buff.getvalue())
    emit('frameReceive', {"image": encoded, "predictions": predictions, "confidences": confidences})

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0') # allow connections from anywhere. bad practice but... who's seeing this :D