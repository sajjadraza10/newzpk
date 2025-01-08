import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

function LoadingSpinner() {
  return (
    <div className="loading-container">
      <Spin 
        indicator={
          <LoadingOutlined 
            style={{ 
              fontSize: 24,
              color: '#ff1a1a'
            }} 
            spin 
          />
        } 
      />
    </div>
  );
}

export default LoadingSpinner;

