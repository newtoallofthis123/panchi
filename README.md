# Panchi

Explore the world full of birds with Panchi.
Panchi is an AI powered bird recognition app that uses the image and sound of the bird to identify the bird.

It uses the phone camera to capture serialized sequences of images and sound of a scene and then
puts it in a 3 tied kera pipeline to identify the bird.

## Tech Stack

- React Native for the mobile app
- Flask for the backend
- Tensorflow for the model
- Docker for containerization

## How to run

### Run the backend

The backend is written in Flask and is containerized using Docker.
It is in the `backend` directory.
To run it,

1. Clone the repo `git clone https://github.com/newtoallofthis123/panchi.git`
2. Go to the backend directory `cd panchi/backend`
3. Build the docker image `docker build -t panchi-backend .` (Don't forget the dot at the end)
4. Run the docker container `docker run -p 5000:5000 panchi-backend`

or install the dependencies and run the flask app

### Run the mobile app

The mobile app is written in React Native and uses the Expo framework.
The easiest way to run it is to install the Expo Go app on your phone and scan the QR code that is generated when you
run `npm run start` in the `mobile` directory.
Another alternative would be to use a EAS or a ADB based andriod simulator

1. Go to the mobile directory `cd panchi/mobile`
2. Install the dependencies `npm install`
3. Run the app `npm run start`
4. Scan the QR code generated with the Expo Go app or use a simulator with `npm run android` or `npm run ios`

## Features and Working

- The app initially opens by asking permission to use the camera and microphone.
- It then shows a camera view with a simple button, upon clicking the button the app starts capturing images and sound.
- Upwards of 7 images and 10-14 seconds of sound are captured at random intervals.
- The images and sound are then sent to the backend for processing.
- The backend uses a pretrained model to identify the bird.

## Model

There are two models used in the pipeline: `audcode.py` and `pic_code.py`

Audcode is a custom made model that uses a simple Random Forest Classifier to classify the sound of the bird.
Pic_code is a tiered keras model that uses a pretrained model to classify the image of the bird.
The pretrained model uses a ResNet50 model with imagenet weights.

## Demo

Here is a simple demo of the app in action.

![Demo](https://github.com/newtoallofthis123/panchi/raw/refs/heads/main/assets/panchi.mp4)
