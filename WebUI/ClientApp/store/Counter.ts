import { Action, FunctionReturnTypes } from '.';

// Constant enums are coverted to plain numbers by the TypeScript compiler, improving size efficiency compared to strings.
const enum ActionType {
    Increment,
    Decrement
}

export const actionCreators = {
    increment: (): Action<ActionType.Increment> => ({ type: ActionType.Increment }),
    decrement: (): Action<ActionType.Decrement> => ({ type: ActionType.Decrement })
};

export const reducer = (state = { count: 0 }, action: FunctionReturnTypes<typeof actionCreators>) => {
    switch (action.type) {
        case ActionType.Increment:
            return { count: state.count + 1 };
        case ActionType.Decrement:
            return { count: state.count - 1 };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
            return state;
    }
};