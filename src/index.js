import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<div>{process.env.GOOGLE_MAPS_API_KEY}</div>, document.getElementById('app'));

module.hot.accept();
