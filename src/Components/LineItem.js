import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'
const LineItem = ({ item, handleClick, handleDelete }) => {
    return (
        <li className='item'>
            <input type="checkbox" checked={item.checked} onChange={() => handleClick(item.id)} />
            <label style={{ textDecoration: item.checked ? "line-through" : null }}>{item.item}</label>
            <FaTrashAlt role="button" onClick={() => handleDelete(item.id)} aria-label={`Delete ${item.item}`} />
        </li>
    )
}

export default LineItem