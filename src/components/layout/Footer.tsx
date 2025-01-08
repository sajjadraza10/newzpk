import React from 'react';
import { Space, Typography } from 'antd';

const { Text } = Typography;

function Footer() {
  const footerLinks = [
    'Log In',
    'Newsletters',
    'About Us',
    'Blog',
    'Tools',
    'Publishers',
    'Help',
    'Terms',
    'Privacy Policy',
    'Do Not Sell My Info',
    'Sitemap',
  ];

  return (
    <footer className="bg-[#1a1a1a] text-white py-5 mt-auto">
      <div className="container mx-auto px-2">
        <Space wrap className="w-full justify-center mb-4">
          {footerLinks.map((link, index) => (
            <Text key={index} className="text-gray-400 text-sm cursor-default">
              {link}
            </Text>
          ))}
        </Space>
        <div className="text-center">
          <Text className="text-gray-400 text-sm">© 2025 SajjadRaza</Text>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

