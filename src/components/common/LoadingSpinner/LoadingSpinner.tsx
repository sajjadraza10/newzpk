import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface LoadingSpinnerProps {
  size?: 'small' | 'default' | 'large';
}

function LoadingSpinner({ size = 'default' }: LoadingSpinnerProps) {
  const spinSize = {
    small: 16,
    default: 24,
    large: 32
  }[size];

  return (
    <div className="loading-container">
      <Spin 
        indicator={
          <LoadingOutlined 
            style={{ 
              fontSize: spinSize,
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