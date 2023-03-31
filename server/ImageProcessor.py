import numpy as np
import cv2
import mediapipe as mp
from tensorflow.keras.models import load_model
from PIL import Image

mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_hands = mp.solutions.hands
model = load_model('posemodelv2.h5', compile=False)

# takes in a PIL image and returns a PIL image annotated
def processImage(image):
    with mp_hands.Hands(static_image_mode=True, max_num_hands=2, min_detection_confidence=0.2) as hands:
        image = image.convert('RGB')
        image = np.array(image)
        #image = cv2.flip(image, 1)
        #results = hands.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
        results = hands.process(image)
        predicted_letters = ["?"] * 5
        confidences = [0] * 5

        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                mp_drawing.draw_landmarks(
                    image,
                    hand_landmarks,
                    mp_hands.HAND_CONNECTIONS,
                    mp_drawing_styles.get_default_hand_landmarks_style(),
                    mp_drawing_styles.get_default_hand_connections_style())
            
            one_hand = []
            for hand_landmarks in results.multi_hand_landmarks:
                for i in hand_landmarks.landmark:
                    one_hand.extend([i.x, i.y, i.z])
            one_hand = np.array(one_hand[:63])

            # Call the predict method on the model to get the predicted label
            predicted_label = model.predict(np.reshape(one_hand, (1, ) + one_hand.shape), verbose = False)

            # Get the index of the predicted label with the highest probability
            #predicted_index = np.argmax(predicted_label)
            top_5_indicies = np.argsort(predicted_label[0])[::-1][:5]
            
            # Convert the predicted index back to a letter using the labels list
            labels = np.array([chr(j) for j in range(ord('A'), ord('Z') + 1)])
            predicted_letters = labels[top_5_indicies]
            confidences = predicted_label[0][top_5_indicies].astype('float64')
            confidences = np.around(confidences * 100)

        image = Image.fromarray(image)
        return image, list(predicted_letters), list(confidences)



if __name__ == '__main__':
    img = Image.open('my-image.png').convert('RGB')
    ret_img = processImage(img)
    print(ret_img[0])
    ret_img[1].save('ret.png')