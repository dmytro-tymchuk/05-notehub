import { keepPreviousData, useQuery } from '@tanstack/react-query'
import NoteList from '../NoteList/NoteList'
import css from './App.module.css'
import { fetchNotes, type NoteResponse } from '../../services/noteService'
import ReactPaginate from 'react-paginate'
import {useState } from 'react'
import Modal from '../Modal/Modal'
import SearchBox from '../SearchBox/SearchBox'
import { useDebouncedCallback } from 'use-debounce';
import Loader from '../Loader/Loader'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

const App = () => {
    const [page, setPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    

    const {data, isLoading, isError} = useQuery<NoteResponse>({
        queryKey: ["task", page, searchValue],
        queryFn: () => fetchNotes(page, searchValue),
        placeholderData: keepPreviousData
        
    });
    const totalPages = data?.totalPages ?? 0;
    
    const handleClick = () => {
        setIsModalOpen(true)
    }

    const handleCLose = () => {
        setIsModalOpen(false)
    }

    const handleChange = useDebouncedCallback((val: string) => {
        setSearchValue(val)    
        setPage(1);
    }, 1000)


    return (
        <div className={css.app}>
	<header className={css.toolbar}>
                <SearchBox searchValue={searchValue} onChange={handleChange} />
		{totalPages > 1 &&<ReactPaginate
                pageCount={data?.totalPages ?? 0}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                onPageChange={({ selected }) => setPage(selected + 1)}
                forcePage={page - 1}
                containerClassName={css.pagination}
                activeClassName={css.active}
                nextLabel="→"
                previousLabel="←"
                renderOnZeroPageCount={null}
            />}
                <button className={css.button} onClick={handleClick}>Create note +</button>
                {isModalOpen && <Modal onRequestClose={handleCLose} />}
            </header>
            {isLoading && <Loader />}
            {isError ? (<ErrorMessage />) : <NoteList notes={data?.notes ?? []} />}  
    </div>
    )
}

export default App