# USAGE
# python ocr.py --image images/example_01.png
# python ocr.py --image images/example_02.png  --preprocess blur

# import the necessary packages
import os

from PIL import Image
import pytesseract
import cv2
import threading
import re

# construct the argument parse and parse the arguments
import numpy as np
import time
import mss
import ast
import json
import sys
import datetime
import pyperclip

sys.stdout = open('./datas/ocr_output.txt', 'w')
print('STARTED ' + str(datetime.datetime.today()))

with open('./datas/otp.txt', 'w') as file:
    file.write('')

platform = sys.platform.lower()   

if platform.startswith('win'):
    pytesseract.pytesseract.tesseract_cmd = r'.\Tesseract-OCR\tesseract.exe'
elif platform.startswith('darwin'):
    pass
elif platform.startswith('linux'):
    pass

def nothing(x):
    pass


def read_text(gray):
    image_ = Image.fromarray(gray)
    t_start = time.time()
    text = pytesseract.image_to_string(image_)

    text = text.split('\n')
    for elem in text:
        otp = re.findall("\d{6}", elem)
        if len(otp) > 0:
            otp_code = otp[0]
            with open('./datas/otp.txt', 'w') as file:
                file.write(otp_code)
                pyperclip.copy(otp_code)
                print(str(datetime.datetime.today()) + 'TROVATO IN ', time.time() - t_start, otp_code)
            break


with mss.mss() as sct:
    # Part of the screen to capture
    w, h = sct.monitors[0]['width'], sct.monitors[0]['height'],
    while True:
        file = open('./datas/ocr.txt', 'r')
        settings = file.read()
        settings = ast.literal_eval(settings)
        file.close()
        if settings['view_screen'] == 'False':
            break

        screen = sct.grab(sct.monitors[0])
        img = Image.frombytes("RGB", screen.size, screen.bgra, "raw", "BGRX")
        image_full = np.array(img)  # load the example image and convert it to grayscale

        start_w = settings['start_width']
        end_w = settings['end_width']
        start_h = settings['start_height']
        end_h = settings['end_height']

        if 0 <= start_w < end_w <= w and 0 <= start_h < end_h <= h:
            image = image_full[start_h:end_h, start_w:end_w]
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            gray = cv2.threshold(gray, 200, 255, cv2.THRESH_BINARY)[1]
            cv2.imwrite('./datas/screen.png', image)
            if settings['run_ocr'] == 'True':
                read_text(gray)
            time.sleep(settings['reload_time'])
        else:
            if start_w > w:
                settings['start_width'] = 0

            if end_w > w or end_w == 0:
                settings['end_width'] = w

            if start_h > h:
                settings['start_height'] = 0

            if end_h > h or end_h == 0:
                settings['end_height'] = h

            with open('./datas/ocr.txt', 'w') as file:
                file.write(json.dumps(settings))
        sys.stdout.flush()
