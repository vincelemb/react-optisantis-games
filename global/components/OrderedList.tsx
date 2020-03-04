import React from 'react';

type OrderedListContent = {
    color: string | undefined;
    content: string;
};

interface OrderedListProps {
    contents: OrderedListContent[];
}

const OrderedList: React.FC<OrderedListProps> = ({ contents }) => {
    const list = contents.map(({ color, content }, idx) => (
        <li className="_flex _p-sm" key={idx}>
            <span
                className={`_mr-sm _w-lg _rounded-rounded _text-white _leading-loose _text-center _min-w-lg _max-h-lg _bg-${color}`}>
                {idx + 1}
            </span>
            <p className="_m-none">{content}</p>
        </li>
    ));

    return <ol className="_m-none _list-none _p-none">{list}</ol>;
};

export default OrderedList;
