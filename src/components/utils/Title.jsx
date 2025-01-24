import React from 'react'

const Title = ({ value, onChange, textStyle }) => {
    return (
        <textarea
            name="title"
            value={value}
            onChange={onChange}
            className={`w-full text-black h-20 border resize-none focus:outline-none p-2 ${textStyle}`}
            placeholder="Edit Title"
        />
    )
}

export default Title;