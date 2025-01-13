import { memo, useCallback } from "react";
import { Modal, Space, Button, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { FilterModalProps } from "../../../types/types";
import { sources, categories } from "../../../constants/FilterConfigs";
import { useFilter } from "../../../hooks/useFilter";
import { FilterSection } from "./FilterSection";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setFilters } from "store/slices/articleSlice";

const { Title } = Typography;

const defaultFilterSections = [
  { key: "sources", title: "Sources", options: sources },
  { key: "categories", title: "Categories", options: categories },
];

export const FilterModal = memo(({ 
  isOpen, 
  onClose, 
  onApply,
  sections = defaultFilterSections,
  title = "Customize Your Feed",
  width = 500
}: FilterModalProps) => {
  const dispatch = useAppDispatch();
  const {
    updateFilter,
    clearAllFilters,
    getFilterByKey,
    getSelectedFiltersCount
  } = useFilter(defaultFilterSections);
  const { activeFilters } = useAppSelector(state => state.articles);

  const handleReset = useCallback(() => {
    clearAllFilters();
    onApply(0);
  }, [clearAllFilters, onApply]);

  const handleApply = useCallback(() => {
    console.log('Applying filters:', activeFilters); // Debug log
    const filters = {
      sources: getFilterByKey('sources'),
      categories: getFilterByKey('categories')
    };
    
    if (filters.sources.length > 0 || filters.categories.length > 0) {
      dispatch(setFilters(filters));
      onApply(getSelectedFiltersCount());
    }
    onClose();
  }, [dispatch, getFilterByKey, getSelectedFiltersCount, onApply, onClose]);

  const renderFilterSections = useCallback(() => (
    sections.map((section) => (
      <FilterSection
        key={section.key}
        title={section.title}
        options={section.options}
        value={getFilterByKey(section.key)}
        onChange={(values: string[]) => updateFilter(section.key, values)}
      />
    ))
  ), [sections, getFilterByKey, updateFilter]);

  return (
    <Modal
      title={null}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={width}
      className="filter-modal"
      closeIcon={
        <CloseOutlined className="text-gray-400 hover:text-white transition-colors" />
      }
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Title
              level={3}
              className="mb-6 text-center bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent"
            >
              {title}
            </Title>
            <Space direction="vertical" className="w-full" size="large">
              {renderFilterSections()}
            </Space>
            <div className="flex justify-between mt-8">
              <Button
                onClick={handleReset}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Reset
              </Button>
              <Button
                type="primary"
                danger
                onClick={handleApply}
                className="px-8"
              >
                Apply Filters
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
});