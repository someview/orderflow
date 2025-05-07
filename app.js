import React from 'react';
import { createRoot } from 'react-dom/client';
import OrderFlowChart from './components/OrderFlowChart.js';

const App = () => {
    return React.createElement(
        'div',
        { className: 'app' },
        React.createElement('header', null,
            React.createElement('h1', null, '币安 OrderFlow 可视化')
        ),
        React.createElement('main', null,
            React.createElement(OrderFlowChart)
        )
    );
};

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
    try {
        const container = document.getElementById('root');
        const root = createRoot(container);
        root.render(React.createElement(App));
        console.log("React应用已加载");
    } catch (err) {
        console.error("渲染出错:", err);
        document.getElementById('root').textContent = "加载错误: " + err.message;
    }
});
