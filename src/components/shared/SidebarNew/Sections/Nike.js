import React from 'react';
import {parseBrand} from "@/components/shared/Sidebar/Sections/functions/parseBrand";
import Link from "next/link";
import s from "@/components/shared/Sidebar/Sidebar.module.css";

const Nike = ({filters, handleClose}) => {
    return (
        <div>
            {
                parseBrand('Nike', filters).map(el =>
                    <Link href={{
                        pathname: '/products',
                        query: {line: el.query}
                    }}
                          onClick={handleClose}
                          className={s.link}
                    >
                        {el.name}
                    </Link>
                )
            }
        </div>
    );
};

export default Nike;