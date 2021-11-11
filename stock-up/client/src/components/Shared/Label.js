import React from 'react';


const Label = props => {

    return (
        <div className={props.labelClass}>
            <span class={props.leftLabelClass}>{props.leftText}</span>
            <span class={props.rightLabelClass}>{props.rightText}</span>
        </div>

    );
}


export default Label;