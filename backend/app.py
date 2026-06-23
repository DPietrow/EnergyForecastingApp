from flask import Flask
from flask import jsonify
from flask import request

from flask_cors import CORS

from forecasting import forecast_region

app = Flask(__name__)

CORS(app)

@app.route("/")
def health_check():

    return {
        "status": "online"
    }


@app.route(
    "/forecast",
    methods=["POST"]
)
def forecast():

    payload = request.json

    region = payload.get(
        "region"
    )

    horizon = payload.get(
        "horizon"
    )

    valid_regions = [
        "PJME",
        "PJMW"
    ]

    valid_horizons = [
        "hourly",
        "daily",
        "weekly",
        "monthly"
    ]

    if region not in valid_regions:

        return jsonify({
            "error":
            "invalid region"
        }), 400

    if horizon not in valid_horizons:

        return jsonify({
            "error":
            "invalid horizon"
        }), 400

    result = forecast_region(
        region,
        horizon
    )

    return jsonify(
        result
    )

@app.route("/metadata")
def metadata():

    return jsonify({
        "regions": [
            "PJME",
            "PJMW"
        ],
        "horizons": [
            "hourly",
            "daily",
            "weekly",
            "monthly"
        ]
    })


@app.route("/project/results")
def project_results():

    return jsonify({

        "winner_table": [

            {
                "region": "PJME",
                "horizon": "hourly",
                "model": "GRU",
                "r2": 0.996298
            },
            {
                "region": "PJME",
                "horizon": "daily",
                "model": "XGBoost",
                "r2": 0.859622
            },
            {
                "region": "PJME",
                "horizon": "weekly",
                "model": "XGBoost",
                "r2": 0.652178
            },
            {
                "region": "PJME",
                "horizon": "monthly",
                "model": "XGBoost",
                "r2": 0.641024
            },
            {
                "region": "PJMW",
                "horizon": "hourly",
                "model": "XGBoost",
                "r2": 0.994088
            },
            {
                "region": "PJMW",
                "horizon": "daily",
                "model": "XGBoost",
                "r2": 0.840224
            },
            {
                "region": "PJMW",
                "horizon": "weekly",
                "model": "XGBoost",
                "r2": 0.599860
            },
            {
                "region": "PJMW",
                "horizon": "monthly",
                "model": "XGBoost",
                "r2": 0.580417
            }

        ],

        "full_results": [

            {
                "region": "PJME",
                "horizon": "daily",
                "GRU": 0.832445,
                "LSTM": 0.831529,
                "Naive": -17.127054,
                "RandomForest": 0.855503,
                "XGBoost": 0.859622
            },

            {
                "region": "PJME",
                "horizon": "hourly",
                "GRU": 0.996298,
                "LSTM": 0.993043,
                "Naive": -17.084034,
                "RandomForest": 0.995144,
                "XGBoost": 0.995653
            },

            {
                "region": "PJME",
                "horizon": "monthly",
                "GRU": 0.459165,
                "LSTM": 0.379827,
                "Naive": -17.358084,
                "RandomForest": 0.586687,
                "XGBoost": 0.641024
            },

            {
                "region": "PJME",
                "horizon": "weekly",
                "GRU": 0.586012,
                "LSTM": 0.589080,
                "Naive": -17.206750,
                "RandomForest": 0.635963,
                "XGBoost": 0.652178
            },

            {
                "region": "PJMW",
                "horizon": "daily",
                "GRU": 0.795065,
                "LSTM": 0.801947,
                "Naive": -24.509193,
                "RandomForest": 0.831789,
                "XGBoost": 0.840224
            },

            {
                "region": "PJMW",
                "horizon": "hourly",
                "GRU": 0.987169,
                "LSTM": 0.990092,
                "Naive": -24.484226,
                "RandomForest": 0.993619,
                "XGBoost": 0.994088
            },

            {
                "region": "PJMW",
                "horizon": "monthly",
                "GRU": 0.349703,
                "LSTM": 0.312170,
                "Naive": -24.756992,
                "RandomForest": 0.546047,
                "XGBoost": 0.580417
            },

            {
                "region": "PJMW",
                "horizon": "weekly",
                "GRU": 0.538163,
                "LSTM": 0.529328,
                "Naive": -24.574413,
                "RandomForest": 0.578858,
                "XGBoost": 0.599860
            }

        ],

        "summary": {

            "best_model": "XGBoost",

            "xgboost_wins": 7,

            "gru_wins": 1,

            "conclusion":
                "XGBoost achieved the highest R² score in seven of eight forecasting scenarios and was selected as the production model. GRU narrowly outperformed XGBoost for PJME hourly forecasting but required substantially longer training times."

        }

    })

if __name__ == "__main__":
    app.run()