import { CategoryEnum } from "types/types";

export const formatCategoryText = (category: CategoryEnum): string => {
    return category.replace(/_/g, ' ').toUpperCase();
  };
  