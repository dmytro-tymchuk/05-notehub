import axios from "axios"
import type { CreateNoteRequest, Note } from "../types/note"

export { fetchNotes, createNote, deleteNote}

export type NoteResponse = {
    notes: Note[],
    totalPages: number
}

const fetchNotes = async (page:number, searchValue: string):Promise<NoteResponse> => {
    const res = await axios.get<NoteResponse>(`https://notehub-public.goit.study/api/notes?page=${page}&perPage=12&search=${searchValue}`, {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`
        }
    })
    return res.data
}

const createNote = async (data: CreateNoteRequest) => {
    const res = await axios.post<NoteResponse>(`https://notehub-public.goit.study/api/notes`, data, {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`
        }
    })
    return res.data
}

const deleteNote = async (noteId: string) => {
    const res = await axios.delete<NoteResponse>(`https://notehub-public.goit.study/api/notes/${noteId} `,{
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`
        }
    })
    return res.data
}