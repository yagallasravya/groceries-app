import React from 'react'

import ItemList from './ItemList'

const Content = ({items,handleClick,handleDelete}) => {  
    return (
        <>    
            {
                items.length ? (
                    <ItemList items={items} handleClick={handleClick} handleDelete={handleDelete}/>
                ) : (
                    <p style={{margin:"auto"}}>your list is empty!!!</p>
                )
            }
         
        </>
    )
}

export default Content