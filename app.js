import React from 'react';
import ReactDOM from 'react-dom/client';
import OrderFlowChart from './components/OrderFlowChart.js';
import TradeHistoryTable from './components/TradeHistoryTable.js';

function App() {
    return React.createElement(
        'div',
        { className: 'app' },
        React.createElement('header', null,
            React.createElement('h1', null, '币安 OrderFlow 可视化')
        ),
        React.createElement('main', null,
            React.createElement(OrderFlowChart, null),
            React.createElement(TradeHistoryTable, null)
        )
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
