import { combineReducers, compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import favoriteReducer from "./favorite/favoriteReducer";
import filmsReducer from "./films/filmsReducer";
import userReducer from "./user/userReducer";

const rootRedicer = combineReducers({
  films: filmsReducer,
  user: userReducer,
  favorite: favoriteReducer,
});

const store = createStore(
  rootRedicer,
  compose(
    applyMiddleware(thunk),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;

//store.subscribe(() => console.info(store.getState()))
