// hooks/useWebSocket.js
import { useState, useEffect } from 'react';

export function useBinanceData(symbol) {
    const [tradeData, setTradeData] = useState([]);
    const [orderBookData, setOrderBookData] = useState({
        bids: [],
        asks: []
    });

    useEffect(() => {
        // 模拟数据用于测试
        const testData = [];
        const now = Math.floor(Date.now() / 1000);

        // 生成过去100分钟的模拟K线数据
        for (let i = 0; i < 100; i++) {
            const basePrice = symbol === 'BTCUSDT' ? 50000 : (symbol === 'ETHUSDT' ? 3000 : 500);
            const time = now - (99 - i) * 60;
            const randomFactor = 0.98 + Math.random() * 0.04; // 生成0.98到1.02之间的随机因子

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

        // 模拟订单簿数据
        const testOrderBook = {
            bids: Array.from({length: 10}, (_, i) => ({
                price: testData[testData.length-1].close * (0.999 - i * 0.001),
                quantity: 1 + Math.random() * 10
            })),
            asks: Array.from({length: 10}, (_, i) => ({
                price: testData[testData.length-1].close * (1.001 + i * 0.001),
                quantity: 1 + Math.random() * 10
            }))
        };

        setOrderBookData(testOrderBook);

        // 返回清理函数
        return () => {
            console.log('Cleaning up...');
        };
    }, [symbol]);

    return { tradeData, orderBookData };
}
