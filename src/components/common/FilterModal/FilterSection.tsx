import { memo } from 'react';
import { Select, Typography } from 'antd';

const { Text } = Typography;

export const FilterSection = memo(({
  title,
  options,
  value,
  onChange
}: any) => (
  <div>
    <Text strong className="text-gray-300 mb-2 block">
      {title}
    </Text>
    <Select
      mode="multiple"
      style={{ width: "100%" }}
      placeholder={`Select ${title.toLowerCase()}`}
      options={options}
      value={value}
      onChange={onChange}
      maxTagCount="responsive"
      className="custom-select"
    />
  </div>
));