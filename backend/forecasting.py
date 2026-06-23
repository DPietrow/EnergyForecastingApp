import joblib
import pandas as pd
import numpy as np
from pathlib import Path

MODEL_CACHE = {}

BASE_DIR = Path(__file__).resolve().parent
MODELS_DIR = BASE_DIR / "models"


def load_model(region, horizon):

    key = f"{region}_{horizon}"

    if key not in MODEL_CACHE:

        model_path = (
            MODELS_DIR
            / f"{region}_{horizon}_XGBoost.pkl"
        )

        MODEL_CACHE[key] = joblib.load(
            model_path
        )

    return MODEL_CACHE[key]


def load_history(region):

    df = pd.read_csv(
        f"backend/data/{region}.csv",
        index_col=0,
        parse_dates=True
    )

    target_col = f"{region}_MW"

    return (
        df,
        target_col
    )


def create_feature_vector(
    history,
    timestamp
):

    return np.array([
        timestamp.hour,
        timestamp.dayofweek,
        timestamp.month,
        int(timestamp.dayofweek >= 5),

        history[-1],
        history[-24],
        history[-168],

        np.mean(history[-24:]),
        np.mean(history[-168:]),

        np.std(history[-24:])
    ])


def recursive_forecast(
    model,
    history,
    start_timestamp,
    steps,
    freq
):

    history = list(history)

    forecasts = []

    current_time = start_timestamp

    for _ in range(steps):

        if freq == "h":

            current_time += pd.Timedelta(hours=1)

        elif freq == "d":

            current_time += pd.Timedelta(days=1)

        elif freq == "w":

            current_time += pd.Timedelta(weeks=1)

        elif freq == "m":

            current_time += pd.DateOffset(months=1)

        X_future = create_feature_vector(
            history,
            current_time
        )

        pred = model.predict(
            X_future.reshape(1, -1)
        )[0]

        forecasts.append(
            float(pred)
        )

        history.append(
            pred
        )

    return forecasts


def build_future_timestamps(
    start_timestamp,
    steps,
    freq
):

    timestamps = []

    current_time = start_timestamp

    for _ in range(steps):

        if freq == "h":

            current_time += pd.Timedelta(hours=1)

        elif freq == "d":

            current_time += pd.Timedelta(days=1)

        elif freq == "w":

            current_time += pd.Timedelta(weeks=1)

        elif freq == "m":

            current_time += pd.DateOffset(months=1)

        timestamps.append(current_time)

    return timestamps


def forecast_region(
    region,
    horizon
):

    horizon_config = {
        "hourly": {
            "steps": 24,
            "freq": "h"
        },
        "daily": {
            "steps": 7,
            "freq": "d"
        },
        "weekly": {
            "steps": 12,
            "freq": "w"
        },
        "monthly": {
            "steps": 12,
            "freq": "m"
        }
    }

    config = horizon_config[horizon]

    model = load_model(
        region,
        horizon
    )

    df, target_col = load_history(
        region
    )

    history = df[target_col].values

    last_timestamp = df.index[-1]

    forecast = recursive_forecast(
        model=model,
        history=history,
        start_timestamp=last_timestamp,
        steps=config["steps"],
        freq=config["freq"]
    )

    future_times = build_future_timestamps(
        start_timestamp=last_timestamp,
        steps=config["steps"],
        freq=config["freq"]
    )

    return {
        "region": region,
        "horizon": horizon,
        "timestamps": [
            t.isoformat()
            for t in future_times
        ],
        "forecasts": forecast
    }