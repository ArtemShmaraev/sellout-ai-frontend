import {useState} from "react";

const DropdownCategory = ({ category, level = 0 }) => {
    const [isOpen, setIsOpen] = useState({});

    const handleToggle = (key) => {
        setIsOpen((prevState) => ({
            ...prevState,
            [key]: !prevState[key],
        }));
    };

    const renderCategory = (category, level) => {
        if (!category.hasOwnProperty('text')) {
            const dropdowns = [];
            for (const key in category) {
                if (!category[key].hasOwnProperty('text')) {
                    dropdowns.push(
                        <div key={key} style={{ marginLeft: `${20 * level}px` }}>
                            <h4 onClick={() => handleToggle(key)}>Dropdown {key}</h4>
                            {isOpen[key] && renderCategory(category[key], level + 1)}
                        </div>
                    );
                } else {
                    dropdowns.push(
                        <div key={key} style={{ marginLeft: `${20 * level}px` }}>
                            {category[key].text}
                        </div>
                    );
                }
            }
            return dropdowns;
        }
        return (
            <div style={{ marginLeft: `${20 * level}px`, color: 'red' }}>
                {category.text}
            </div>
        );
    };

    return renderCategory(category, level);
};
export default DropdownCategory