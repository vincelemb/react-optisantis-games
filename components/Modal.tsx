import React from 'react';

type ModalProps = {
    onClick?: (event: any) => void;
    count?: number | string;
    isIcon?: boolean;
    iconPosition?: string;
    title?: string;
    bgColor?: string;
    hideModal: boolean;
    isOverlay?:boolean
};

const Modal: React.FC<ModalProps> = (props: React.PropsWithChildren<ModalProps>) => {
    return (
        <React.Fragment>
            {props.hideModal === false && (
                <div className="_fixed _top-0 _bottom-0 _left-0 _right-0 _z-50 _w-full _h-full _justify-center _items-center _flex" 
                    style={{backgroundColor:`${props.isOverlay === true ? "rgba(0,0,0,.8)" : "transparent"}`}}>
                    <div className="_flex-col _flex _justify-center _items-center _absolute _h-auto _p-sm">
                        {props.children}
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};

export default Modal;
