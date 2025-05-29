import { useEffect, useState } from "react";
import { db } from "../firebase";
import img from "../assets/download.svg";
import {
    collection,
    query,
    where,
    getDocs,
    updateDoc,
    doc,
    setDoc,
    Timestamp,
} from "firebase/firestore";
import { motion } from "framer-motion";
import { HiCheck, HiOutlineRefresh } from "react-icons/hi";
// import TypingMessage from "@/utils/TypingMessage";

function PublicNotes() {
    const [password, setPassword] = useState("");
    const [note, setNote] = useState("");
    const [noteId, setNoteId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showCheckmark, setShowCheckmark] = useState(false);

    // Fetch or create the note after typing password
    useEffect(() => {
        if (password.length < 3) return;

        const delay = setTimeout(() => {
            checkPasswordAndFetchOrCreateNote(password);
        }, 800);

        return () => clearTimeout(delay);
    }, [password]);

    // Auto-save note as user types
    useEffect(() => {
        if (!noteId) return;

        const delay = setTimeout(() => {
            saveNote(note);
        }, 600);

        return () => clearTimeout(delay);
    }, [note]);

    const checkPasswordAndFetchOrCreateNote = async (enteredPassword) => {
        setLoading(true);

        const q = query(collection(db, "publicNotes"), where("password", "==", enteredPassword));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const docData = querySnapshot.docs[0];
            setNote(docData.data().content);
            setNoteId(docData.id);
        } else {
            const newNoteRef = doc(collection(db, "publicNotes"));
            await setDoc(newNoteRef, {
                password: enteredPassword,
                content: "",
                createdAt: Timestamp.now(),
            });
            setNote("");
            setNoteId(newNoteRef.id);
        }

        setLoading(false);
        setShowCheckmark(true);
        setTimeout(() => setShowCheckmark(false), 2000);
    };

    const saveNote = async (updatedNote) => {
        const noteRef = doc(db, "publicNotes", noteId);
        await updateDoc(noteRef, {
            content: updatedNote,
        });
    };

    return (
        <div className="bg-blue-950 h-screen flex flex-col p-4">
            {/* Password Input */}
            <div className="relative mb-4">
                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 text-white bg-transparent border rounded-md border-red-500 focus:outline-none placeholder-gray-400"
                />
                <div className="absolute right-3 top-2.5">
                    {loading ? (
                        <HiOutlineRefresh className="animate-spin text-white h-5 w-5" />
                    ) : showCheckmark ? (
                        <HiCheck className="text-green-400 h-5 w-5" />
                    ) : null}
                </div>
            </div>
            {/* <TypingMessage/> */}

            {/* Note Textarea */}
            <div className="relative flex-1 w-full flex justify-center items-center">
                {/* Background image */}
                <div className="absolute w-60 opacity-25">
                    <img src={img} alt="background icon" />
                </div>

                {/* Textarea */}
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full h-full z-20 text-white bg-transparent border rounded-md border-red-500 focus:outline-none placeholder-gray-400 p-4 resize-none"
                    placeholder="Type your note here..."
                />
            </div>

       
        </div>
    );
}

export default PublicNotes;
