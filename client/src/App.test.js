import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store/index";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

test("Landing", () => {
  const history = createMemoryHistory();
  render(
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    </Provider>
  );
  expect(screen.getByText(/Countries/i)).toBeInTheDocument();
});

test("Descripcion del Create Activity", () => {
  const history = createMemoryHistory();
  history.push("/activity");
  render(
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    </Provider>
  );
  expect(screen.getByText(/Create Your Tourist Activity/i)).toBeInTheDocument();
});

test("NavBar not exists in landing", () => {
  const history = createMemoryHistory();
  history.push("/");
  render(
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    </Provider>
  );
  expect(screen.queryByText(/Filtros/i)).not.toBeInTheDocument();
});
