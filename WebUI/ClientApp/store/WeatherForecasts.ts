import {
    addTask,
    fetch
} from 'domain-task';
import { Action, AppThunkAction } from '.';

// Constant enums are coverted to plain numbers by the TypeScript compiler, improving size efficiency compared to strings.
const enum ActionType {
    Request,
    Receive
}

export interface WeatherForecastsState {
    isLoading: boolean;
    startDateIndex?: number;
    forecasts?: WeatherForecast[];
}

interface WeatherForecast {
    readonly dateFormatted: string;
    readonly temperatureC: number;
    readonly temperatureF: number;
    readonly summary: string;
}

interface RequestWeatherForecastsAction extends Action<ActionType.Request> {
    readonly startDateIndex: number;
}

interface ReceiveWeatherForecastsAction extends Action<ActionType.Receive> {
    readonly startDateIndex: number;
    readonly forecasts: WeatherForecast[];
}

type KnownAction = RequestWeatherForecastsAction | ReceiveWeatherForecastsAction;

export const actionCreators = {
    requestWeatherForecasts: (startDateIndex: number): AppThunkAction<KnownAction> => (dispatch, getState) => {

        const state = getState();

        // Only load data if it's something we don't already have (and are not already loading)
        if (state.weatherForecasts && startDateIndex === state.weatherForecasts.startDateIndex) {
            return;
        }

        const fetchTask = fetch(`api/SampleData/WeatherForecasts?startDateIndex=${startDateIndex}`)
            .then(response => response.json() as Promise<WeatherForecast[]>)
            .then(data => {
                dispatch({ type: ActionType.Receive, startDateIndex: startDateIndex, forecasts: data });
            });

        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        dispatch({ type: ActionType.Request, startDateIndex: startDateIndex });
    }
};

export const reducer = (
    state: WeatherForecastsState = {
        isLoading: false
    },
    action: KnownAction) => {
    switch (action.type) {
        case ActionType.Request:
            return {
                startDateIndex: action.startDateIndex,
                forecasts: state.forecasts,
                isLoading: true
            };
        case ActionType.Receive:
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly handle out-of-order responses.
            if (action.startDateIndex === state.startDateIndex) {
                return {
                    startDateIndex: action.startDateIndex,
                    forecasts: action.forecasts,
                    isLoading: false
                };
            }
            break;
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
            return state;
    }
};