import { keepPreviousData, useQuery } from '@tanstack/react-query'
import NoteList from '../NoteList/NoteList'
import css from './App.module.css'
import { fetchNotes, type NoteResponse } from '../../services/noteService'
import ReactPaginate from 'react-paginate'
import {useState } from 'react'
import Modal from '../Modal/Modal'

const App = () => {
    const [page, setPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false)


    const {data} = useQuery<NoteResponse>({
        queryKey: ["task", page],
        queryFn: () => fetchNotes(page),
        placeholderData: keepPreviousData
        
    });
    
    
    const handleClick = () => {
        setIsModalOpen(true)
    }

    const handleCLose = () => {
        setIsModalOpen(false)
    }


    return (
        <div className={css.app}>
	<header className={css.toolbar}>
		{/* Компонент SearchBox */}
		{data &&<ReactPaginate
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
            <NoteList notes={data?.notes ?? []} />
    </div>
    )
}

export default App