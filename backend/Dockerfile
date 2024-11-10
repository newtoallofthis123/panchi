# Run app.py as a flask app
FROM python:3.7

# Set the working directory in the container
WORKDIR /app

# Copy the dependencies file to the working directory
COPY requirements.txt .

# Install any dependencies
pip install -r requirements.txt

# Copy the content of the local src directory to the working directory
COPY . .

# Specify the port number the container should expose
EXPOSE 5000

# Run the application
CMD ["python", "app.py"]
