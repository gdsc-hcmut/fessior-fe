import ShortenInputFieldType from '@/types/shorten-input-field-type';
import { getOptionText } from '@/utils/input';

type DefaultDropdownItemsProps = {
  options: ShortenInputFieldType[];
  onSelect: (option: ShortenInputFieldType) => void;
};

// Expected to have values prop to support multiselect, but the current UI for this component is only appropriate for single-select
export default function DefaultDropdownItems(props: DefaultDropdownItemsProps) {
  const { options, onSelect } = props;

  return options.map((option) => (
    <div
      key={getOptionText(option)}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(option);
      }}
      tabIndex={1}
      className='flex h-[40px] cursor-pointer items-center px-[8px] transition-all hover:bg-royal-300/[.1] focus:bg-royal-300/[.1]'
    >
      <p className='truncate'>{getOptionText(option)}</p>
    </div>
  ));
}
