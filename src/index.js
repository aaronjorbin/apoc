import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


function sendToAnalytics({ id, name, value }) {
	if ( typeof( window.ga ) !== 'undefined' ) {
	  window.ga('send', 'event', {
		eventCategory: 'Web Vitals',
		eventAction: name,
		eventValue: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
		eventLabel: id, // id unique to current page load
		nonInteraction: true, // avoids affecting bounce rate
	  });
	}
}

reportWebVitals(sendToAnalytics);
