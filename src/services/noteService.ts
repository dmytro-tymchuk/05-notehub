import axios from "axios"
import type { CreateNoteRequest, Note } from "../types/note"

export { fetchNotes, createNote}

export type NoteResponse = {
    notes: Note[],
    totalPages: number
}

const fetchNotes = async (page:number):Promise<NoteResponse> => {
    const res = await axios.get<NoteResponse>(`https://notehub-public.goit.study/api/notes?page=${page}&perPage=12`, {
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
}