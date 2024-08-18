![MasterHead](https://github.com/DeIIy/insurance_website/blob/main/README_Folder/Guardian_Page.png)

# Insurance Company Website

## Project Description

This project is a modern single-page website designed for employers to predict health insurance costs for their employees using an AI model. The website is built using React.js for the frontend, a Flask server for the backend, and JSON-server for managing mock API requests.

## Project Features

- User Registration and Login
- User Friendly Single Page Application(S.P.A.)
- AI Based Health Insurance Costs Optimization

## Screenshots

![Screenshots_1](https://github.com/DeIIy/insurance_website/blob/main/README_Folder/Guardian_Page.png)
![Screenshots_2](https://github.com/DeIIy/insurance_website/blob/main/README_Folder/Get_Started_Button.png)
![Screenshots_3](https://github.com/DeIIy/insurance_website/blob/main/README_Folder/Sign_In.png)
![Screenshots_4](https://github.com/DeIIy/insurance_website/blob/main/README_Folder/References.png)
![Screenshots_5](https://github.com/DeIIy/insurance_website/blob/main/README_Folder/Feedbacks.png)

## Setup

### Requirements

- Node.js
- Python 3.x
- pip
- Git

### Steps

1. **Clone the repository**
    ```bash
    git clone https://github.com/DeIIy/insurance_website.git
    ```

2. **Frontend**
    ```bash
    npm run dev
    ```

3. **Backend**
    ```bash
    cd ../flask-app
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    flask run
    ```

4. **JSON-server**
    ```bash
    npm install json-server
    json-server --watch ./src/db.json --port 3005
    ```

## Usage
- React Frontend: `http://localhost:5173`
- JSON-server API: `http://localhost:3005`
- Flask backend: `http://localhost:5000`

You can start using the application by visiting `http://localhost:5173` in your browser.

## Architecture and Project Structure

- `frontend/`: React Application.
- `backend/`: Flask Application.
- `db.json`: Database for JSON-server.

## Contribute

If you would like to contribute, please open an "issue" first and state what you would like to improve. You can then submit a "pull request".


## Licence
This project is licensed under the [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/) license. Please use with appropriate attribution to the project owner: Yusuf Tunahan ETLİK(DeIIy).

## Communication
If you have questions or suggestions about this project, please email [ytetlik6875@gmail.com](mailto:ytetlik6875@gmail.com).

## Resources and Learnings
- [React Official Documentation](https://reactjs.org/docs/getting-started.html)
- [Flask Official Documentation](https://flask.palletsprojects.com/)
- [JSON-server GitHub Reposu](https://github.com/typicode/json-server)
- [Enes Bayram React Dersleri](https://www.youtube.com/playlist?list=PLURN6mxdcwL-xIXzq92ZJN9yRW7Q0mjzw)

For more detailed information, review the project report: [Insurance Company Website Report](https://github.com/DeIIy/insurance_website/blob/main/README_Folder/Insurance_Company_Internet_Sitesi_Raporu.pdf).
