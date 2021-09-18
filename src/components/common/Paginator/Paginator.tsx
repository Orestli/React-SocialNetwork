<<<<<<< HEAD:src/components/common/Paginator/Paginator.tsx
import React, {useState} from 'react';
import './Paginator.css'

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

const Paginator: React.FC<PropsType> = ({totalUsersCount, pageSize, currentPage, onPageChanged}) => {
    const pagesCount = Math.ceil(totalUsersCount / pageSize);
    const pages: Array<number> = [];

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
                        // @ts-ignore
                        return <span className={currentPage === p && 'selectedPage'}
                                           onClick={(e) => {
                                               onPageChanged(p)
                                           }}>{p} </span>;
                })
            }
            {
                portionCount > portionNumber &&
                <button onClick={() => {setPortionNumber(portionNumber + 1)}}>NEXT</button>
            }
        </div>
    )
}

=======
import React, {useState} from 'react';
import './Paginator.css'

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

const Paginator: React.FC<PropsType> = ({totalUsersCount, pageSize, currentPage, onPageChanged}) => {
    const pagesCount = Math.ceil(totalUsersCount / pageSize);
    const pages: Array<number> = [];

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
                        // @ts-ignore
                        return <span className={currentPage === p && 'selectedPage'}
                                           onClick={(e) => {
                                               onPageChanged(p)
                                           }}>{p} </span>;
                })
            }
            {
                portionCount > portionNumber &&
                <button onClick={() => {setPortionNumber(portionNumber + 1)}}>NEXT</button>
            }
        </div>
    )
}

>>>>>>> 2168b5cfc8651cef8a12db09eeb1fd0403ebda77:src/components/common/Paginator/Paginator.js
export default Paginator