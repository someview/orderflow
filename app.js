import React from 'react';
import { createRoot } from 'react-dom/client';
import TradeAnalysisTimeline from './components/TradeAnalysisTimeline.js';

function App() {
    return React.createElement(
        'div',
        { className: 'app' },
        React.createElement('header', null,
            React.createElement('h1', null, '币安交易归集分析工具')
        ),
        React.createElement('main', null,
            React.createElement(TradeAnalysisTimeline)
        )
    );
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('root');
    const root = createRoot(container);
    root.render(React.createElement(App));
});

export default App;
