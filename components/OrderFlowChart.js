import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';

function OrderFlowChart() {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [symbol, setSymbol] = useState('BTCUSDT');
    const [tradeData, setTradeData] = useState([]);

    useEffect(() => {
        // 生成模拟数据
        const testData = [];
        const now = Math.floor(Date.now() / 1000);

        for (let i = 0; i < 100; i++) {
            const basePrice = symbol === 'BTCUSDT' ? 50000 :
                (symbol === 'ETHUSDT' ? 3000 : 500);
            const time = now - (99 - i) * 60;
            const randomFactor = 0.98 + Math.random() * 0.04;

            testData.push({
                time: time,
                open: basePrice * randomFactor,
                high: basePrice * randomFactor * 1.005,
                low: basePrice * randomFactor * 0.995,
                close: basePrice * randomFactor * (0.998 + Math.random() * 0.004),
                volume: 1 + Math.random() * 10
            });
        }

        setTradeData(testData);
    }, [symbol]);

    useEffect(() => {
        if (!chartRef.current || !tradeData.length) return;

        if (chartInstance.current) {
            chartInstance.current.remove();
            chartInstance.current = null;
        }

        chartInstance.current = createChart(chartRef.current, {
            width: chartRef.current.clientWidth,
            height: 500,
            layout: {
                backgroundColor: '#1e222d',
                textColor: '#d1d4dc',
            },
            grid: {
                vertLines: { color: 'rgba(42, 46, 57, 0.5)' },
                horzLines: { color: 'rgba(42, 46, 57, 0.5)' },
            },
            rightPriceScale: {
                borderVisible: false,
            },
            timeScale: {
                borderVisible: false,
            },
        });

        const mainSeries = chartInstance.current.addCandlestickSeries();
        mainSeries.setData(tradeData);

        const volumeSeries = chartInstance.current.addHistogramSeries({
            color: '#26a69a',
            priceFormat: {
                type: 'volume',
            },
            priceScaleId: '',
            scaleMargins: {
                top: 0.8,
                bottom: 0,
            },
        });

        const volumeData = tradeData.map(item => ({
            time: item.time,
            value: item.volume,
            color: item.close > item.open ? '#26a69a' : '#ef5350',
        }));
        volumeSeries.setData(volumeData);

        chartInstance.current.timeScale().fitContent();

        const handleResize = () => {
            if (chartInstance.current && chartRef.current) {
                chartInstance.current.applyOptions({
                    width: chartRef.current.clientWidth,
                });
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (chartInstance.current) {
                chartInstance.current.remove();
            }
        };
    }, [tradeData]);

    return React.createElement(
        'div',
        { className: 'chart-container' },
        React.createElement(
            'div',
            { className: 'chart-header' },
            React.createElement('h2', null, 'OrderFlow 图表 - ' + symbol),
            React.createElement(
                'select',
                {
                    value: symbol,
                    onChange: function(e) { setSymbol(e.target.value); }
                },
                React.createElement('option', { value: 'BTCUSDT' }, 'BTC/USDT'),
                React.createElement('option', { value: 'ETHUSDT' }, 'ETH/USDT'),
                React.createElement('option', { value: 'BNBUSDT' }, 'BNB/USDT')
            )
        ),
        React.createElement('div', {
            ref: chartRef,
            className: 'chart'
        })
    );
}

export default OrderFlowChart;
