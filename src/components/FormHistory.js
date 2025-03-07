import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FormHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // ダミーデータ
    const mockData = [
      {
        name: "山田 太郎",
        email: "taro@example.com",
        phone: "03-1234-5678",
        gender: "男性",
        inquiryType: "一般",
        inquiry: "テストデータ1"
      },
      {
        name: "鈴木 花子",
        email: "hanako@example.com",
        phone: "03-8765-4321",
        gender: "女性",
        inquiryType: "技術サポート",
        inquiry: "テストデータ2"
      }
    ];

    axios.get('http://localhost:3001/api/data')
      .then(response => {
        setHistory(response.data);
      })
      .catch(error => {
        console.error('Failed to fetch data from API, using mock data:', error);
        setHistory(mockData); // ダミーデータを設定
      });
  }, []);

  return (
    <div className="form-container">
      <h3>フォーム履歴</h3>
      <ol>
        {history.map((entry, index) => (
          <li key={index}>
            <pre>{JSON.stringify(entry, null, 2)}</pre>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default FormHistory;