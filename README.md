# sup-bot

## Windows installation 

CMD: means that you have to execute a command in the terminal

1. Open the command prompt as administrator
2. CMD: choco
  - if the following step has generated an error 
  - CMD: @"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
3. CMD: cinst install nodejs
4. CMD: node -v
  - if the following step has generated an error 
  - CMD: setx node "C:\Program Files\nodejs" /M
5. CMD: cinst install python3 --version 3.8.0
6. CMD: pip3
  - if the following step has generated an error 
  - CMD: setx PATH "%PATH%;C:\Python38\Scripts"
7. close and reopen the console
8. CMD: cd <here you have to place the path to the folder of the bot that you installed>
   EXAMPLE: cd C:\Users\mcara\Desktop\sup-bot-master
9. CMD: npm install
10. CMD: py setup.py
11. FOR START THE APP CMD: npm start

TO ENABLE 3D SECURE DETECTION FEATURE:

0. During the installation of the app at the next Step (11) be sure to select as the destination folder the Tesserecat-OCR folder, it is inside the sup-bot-master folder (The one where you found this file inside).
1. DOWNLOAD: https://digi.bib.uni-mannheim.de/tesseract/tesseract-ocr-w32-setup-v5.0.0-alpha.20191030.exe
2. INSTALL AN APP THA CAN MIRROR YOUR PHONE ON THE SCREEN

## Linux installation 

1. Install nodejs
  _Using Ubuntu_
  - `curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -`
  - `sudo apt-get install -y nodejs`
**for other info** on how to install nodejs vbia package manager visit [Node.js download](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions-enterprise-linux-fedora-and-snap-packages)
2. Install git 
  _Using Ubuntu_
  - `apt-get install git`
  **for other info** on how to install git vbia package manager visit [git download](https://git-scm.com/download/linux)
 
3. Create a new folder and clone the project inside it
  - `git clone https://github.com/Linch1/sup-bot:<folder-name>`

4. go inside that folder with the cd command
  - `cd <folder path>`

5. initialize nodejs and download all packages
 - `npm install`

6. Run the bot
  - `npm start`
  
#### TO ENABLE 3D SECURE DETECTION FEATURE:

  1. Install the ocr binaries
      __using ubuntu__
      - `sudo apt install tesseract-ocr`
      - `sudo apt install libtesseract-dev`
  2. Run the python setup
      - 'python3 setup.py`

