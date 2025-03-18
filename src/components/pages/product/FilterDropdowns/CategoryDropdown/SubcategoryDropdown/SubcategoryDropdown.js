import React, {useState} from 'react';
import s from './SubcategoryDropdown.module.css'
import CustomCheckbox from "@/components/shared/UI/CustoCheckbox/CustomCheckbox";
import Arrow from "@/components/shared/UI/Arrow/Arrow";

const SubcategoryDropdown = ({}) => {
    const categories = [
        'Adidas',
        'Nike',
        'New Balance'
    ]
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectItem = (item) => {
        setSelectedItem(item);
        setIsOpen(false);
    };
    return (
        <div>
            <div className={s.dropdown}
                 style={isOpen ? {borderRadius: '7px 7px 0 0'} : {borderRadius: '7px'}}
            >
                <div
                    onClick={() => toggleDropdown()}
                    className={s.dropdown_toggle}
                >
                    <div className={s.dropdown_toggle_text}>
                        Обувь
                        <Arrow isOpen={isOpen}/>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div>
                    <div className={s.dropdown_items_block}>
                        <div
                            className={s.dropdown_item}
                        >
                            <div className={s.dropdown_text}>
                                <CustomCheckbox
                                    labelText={'Вся обувь'}
                                />
                            </div>
                        </div>
                        {
                            categories.map(item =>
                                <div
                                    onClick={() => selectItem(item)}
                                    key={item}
                                    className={s.dropdown_item}
                                >
                                    <div className={s.dropdown_text} onClick={(e) => e.stopPropagation()}>
                                        <CustomCheckbox
                                            labelText={item}
                                        />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            )}
        </div>
    )
};

export default SubcategoryDropdown;