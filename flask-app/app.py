from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd


app = Flask(__name__)
CORS(app)

#cost function mse
def cost_function(Y, b, w, X):
    m = len(Y)
    y_pred = X.dot(w) + b
    sse = np.sum((y_pred - Y) ** 2)
    mse = sse / m
    return mse  

#update weights
def update_weights(Y, b, w, X, learning_rate):
    m = len(Y)
    y_pred = X.dot(w) + b
    b_deriv = np.sum(y_pred - Y) / m
    w_deriv = X.T.dot(y_pred - Y) / m
    
    new_b = b - (learning_rate * b_deriv)
    new_w = w - (learning_rate * w_deriv)
    return new_b,new_w

#r-squared function
def r_squared(Y, b, w, X):
    y_pred = X.dot(w) + b
    ss_total = np.sum((Y - Y.mean()) ** 2)
    ss_res = np.sum((Y - y_pred) ** 2)
    r2 = 1 - (ss_res / ss_total)
    return r2

#train function
def train(Y, initial_b, initial_w, X, learning_rate, num_iters):
    print("Starting gradient descent at b = {:.3f}, W = {}, mse = {:.4f}".format(initial_b, initial_w, cost_function(Y, initial_b, initial_w, X)))

    b = initial_b
    w = initial_w
    cost_history = []

    for i in range(num_iters):
        b,w = update_weights(Y, b, w, X, learning_rate)
        mse = cost_function(Y, b, w, X)
        cost_history.append(mse)

    if i % 100 == 0:
        print("iter={:d} b={:.2f} W={} mse={:.4f}".format(i, b, w, mse))

    final_r2 = r_squared(Y, b, w, X)
    
    print("After {0} iterations b = {1}, W = {2}, mse = {3}, R^2 = {4:.4f}".format(num_iters, b, w, cost_function(Y, b, w, X), final_r2))
    return cost_history, b, w

df = pd.read_csv(r"C:\Users\ytetl\OneDrive\Belgeler\Sites\project1\public\dataset\sigorta.csv")


X = df.drop("charges", axis = 1).values
Y =  df["charges"].values

X = (X - X.mean(axis = 0)) / X.std(axis = 0)

learning_rate = 0.001
initial_b = np.random.uniform(0, 0.01)
initial_w = np.random.uniform(0, 0.01, X.shape[1])
num_iters = 10000

cost_history, b, w = train(Y, initial_b, initial_w, X, learning_rate, num_iters)

@app.route('/api/data', methods=['POST'])
def receive_data():
    data = request.json
    input_value = data.get('input')
    """ print(input_value)
    add = 1234 """

    age = int(input_value['age'])
    sex = 1 if input_value['gender'] else 0
    bmi = float(input_value['measurements']['bmi'])
    children = int(input_value['numberKids'])
    smoker = 1 if input_value['smoke'] else 0
    region_northeast = 1 if input_value['region']['northeast'] else 0
    region_northwest = 1 if input_value['region']['northwest'] else 0
    region_southeast = 1 if input_value['region']['southeast'] else 0
    region_southwest = 1 if input_value['region']['southwest'] else 0

    #age,sex,bmi,children,smoker,charges,region_northeast,region_northwest,region_southeast,region_southwest

    new_data = {
        "age": [age],
        "sex": [sex],
        "bmi": [bmi],
        "children": [children],
        "smoker": [smoker],
        "region_northeast": [region_northeast],
        "region_northwest": [region_northwest],
        "region_southeast": [region_southeast],
        "region_southwest": [region_southwest]
    }
    new_df = pd.DataFrame(new_data)

    new_X = (new_df.values - X.mean(axis = 0)) / X.std(axis = 0)

    predicted_charge = new_X.dot(w) + b
    print("Predicted charge for new data point:", predicted_charge[0])

    response_data = {
        "description": f"{predicted_charge[0]:.2f}"
    }
    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True)