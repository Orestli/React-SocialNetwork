import React, {useState} from 'react';
import './Paginator.css'

const Paginator = (props) => {
    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    const pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pagesCount / 10)
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionPageNumber = (portionNumber - 1) * 10 + 1
    const rightPortionPageNumber = portionNumber * 10

    return (
        <div>
            {
                portionNumber > 1 &&
                <button onClick={() => {setPortionNumber(portionNumber - 1)}}>PREV</button>
            }
            {
                pages
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map(p => {
                    return (
                        <span className={props.currentPage === p && 'selectedPage'}
                              onClick={(e) => {
                                  props.onPageChanged(p)
                              }}>{p} </span>
                    )
                })
            }
            {
                portionCount > portionNumber &&
                <button onClick={() => {setPortionNumber(portionNumber + 1)}}>NEXT</button>
            }
        </div>
    )
}

export default Paginator