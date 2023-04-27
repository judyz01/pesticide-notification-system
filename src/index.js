import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import './i18n';
import posthog from 'posthog-js';

posthog.init( 
  '<ph_project_api_key>', { api_host: '<ph_instance_address>' }
) 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <BrowserRouter>
      <App />
    </BrowserRouter>

);

