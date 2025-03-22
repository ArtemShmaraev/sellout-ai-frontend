import DropdownCategory from "@/components/pages/product/FilterDropdowns/Shared/DropdownCategory";

const Dropdown = ({filter, brand, width}) => {
    return (
        <div style={{ width: `${width}px` }}>
            <DropdownCategory category={filter} level={1} brand={brand}/>
        </div>
    );
};

export default Dropdown;