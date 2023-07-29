import React from 'react';
import ReactDOM from 'react-dom/client';
import './normalize.css';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import store, { AppDispatch, RootState } from './redux/store';
import { Provider } from 'react-redux';
import { App } from './components/app/app';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

reportWebVitals();
