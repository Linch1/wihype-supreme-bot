import os

try:
	from PIL import Image
except:
	os.system('pip3 install pillow')

try:
	import pytesseract
except:
	os.system('pip3 install pytesseract')

try:
	import cv2
except:
	os.system('pip3 install opencv-python')

try:
	import mss
except:
	os.system('pip3 install mss')