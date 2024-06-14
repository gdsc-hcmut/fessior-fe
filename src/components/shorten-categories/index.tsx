import CategoryItem from '@/components/category-item';

import { Category } from '@/types';

type ShortenCategoriesProps = {
  categories: Category[];
  handleChange: (category: Category) => void;
};

export default function ShortenCategories(props: ShortenCategoriesProps) {
  const { categories, handleChange } = props;

  const getLimitedCategories = () => {
    if (categories.length > 3) {
      return {
        visibleCategory: categories.slice(0, 3),
        hiddenCategory: categories.slice(3),
      };
    }

    return { visibleCategory: categories, hiddenCategory: null };
  };

  const { visibleCategory, hiddenCategory } = getLimitedCategories();

  return (
    <div className='inline'>
      {visibleCategory.map((category) => (
        <CategoryItem key={category._id} onClick={() => handleChange(category)} category={category} />
      ))}
      {hiddenCategory && (
        <div className='group relative mx-[2px] inline-flex items-center rounded-[8px] border-[1px] border-primary px-[8px] py-[4px] align-middle text-[12px] text-primary hover:cursor-pointer hover:bg-primary hover:text-white md:mx-[4px] md:px-[12px] md:py-[8px] lg:text-[16px]'>
          <p>{hiddenCategory.length}+</p>
          <div className='absolute left-[100%] z-[1] ms-[4px] hidden max-w-[800px] whitespace-nowrap rounded-[8px] bg-black p-[8px] text-white group-hover:block'>
            {hiddenCategory.map((category) => category.name).join(', ')}
          </div>
        </div>
      )}
    </div>
  );
}
