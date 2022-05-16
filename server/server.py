from flask import Flask, request, jsonify
from flask_cors import CORS
from keras.models import load_model
from psutil import cpu_times
# import numpy as np

app = Flask(__name__)
CORS(app)
# loading models
aapl_model = load_model('./models/aapl_model.h5')
goog_model = load_model('./models/goog_model.h5')
tsla_model = load_model('./models/tsla_model.h5')
msft_model = load_model('./models/msft_model.h5')
amzn_model = load_model('./models/amzn_model.h5')


@app.route('/')
def index():
    return {"test": "Stock price prediction API"}


@app.route('/predict', methods=['POST'])
def predict():
    reqData = request.json
    company = reqData['company']
    vals = [[
        [float(reqData['open'])],
        [float(reqData['high'])],
        [float(reqData['low'])],
        [float(reqData['close'])],
        [float(reqData['adjClose'])],
    ]]

    if company == "apple":
        res = aapl_model.predict(vals)
    elif company == 'google':
        res = goog_model.predict(vals)
    elif company == 'tesla':
        res = tsla_model.predict(vals)
    elif company == 'microsoft':
        res = msft_model.predict(vals)
    elif company == 'amazon':
        res = amzn_model.predict(vals)

    res = res.tolist()
    print(res[0])
    return jsonify({"data": res})


if __name__ == "__main__":
    app.run()
