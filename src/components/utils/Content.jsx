import React from 'react'

const Content = ({ value, onChange, contentStyle }) => {
    return (
        <textarea
            name="content"
            value={value}
            onChange={onChange}
            className={`w-full text-black h-20 border resize-none focus:outline-none p-2 ${contentStyle}`}
            placeholder="Edit Content"
        />
    )
}

export default Content;