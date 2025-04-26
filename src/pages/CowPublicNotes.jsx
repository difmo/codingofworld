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

function    PublicNotes() {
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
        <div className="bg-blue-950 h-screen flex p-4">
            <div className="w-full mx-auto p-6 space-y-6">
                {/* Password Input */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 text-white bg-transparent border rounded-md border-red-500 focus:outline-none placeholder-gray-400"
                    />
                    <div className="absolute right-3 top-2.5">
                        {loading ? (
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                                ></path>
                            </svg>
                        ) : showCheckmark ? (
                            <svg
                                className="h-5 w-5 text-green-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        ) : null}
                    </div>
                </div>

                {/* Footer Tag */}
                <div className="text-center absolute right-16 bottom-10 pt-1 text-sm text-gray-400">
                    <span className="text-white font-medium">Coding of World</span>
                </div>

                {/* Note Textarea */}
                { (
                    <div className="relative   flex justify-center items-center w-full h-[600px]">
                        {/* Amber box in the center */}
                        <div className="absolute  w-60 opacity-25  "><img src={img}/></div>

                        {/* Textarea */}
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="w-full relative z-20 h-full px-4 py-2 text-white bg-transparent border rounded-md border-red-500 focus:outline-none placeholder-gray-400 resize-none"
                            placeholder="Type your note here..."
                        />
                    </div>
                )}

            </div>
        </div>
    );
}

export default PublicNotes;
