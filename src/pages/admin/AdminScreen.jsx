<<<<<<< HEAD
=======
import React, { useState, useEffect } from 'react';
import { db } from './firebase'; 
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const AdminPanel = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({ text: '', category: '' });
  const [editingQuestion, setEditingQuestion] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const questionsCollection = collection(db, 'questions');
      const questionSnapshot = await getDocs(questionsCollection);
      const questionsList = questionSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQuestions(questionsList);
    };

    fetchQuestions();
  }, []);

  const handleAddQuestion = async () => {
    const questionsCollection = collection(db, 'questions');
    await addDoc(questionsCollection, newQuestion);
    setNewQuestion({ text: '', category: '' });
    // Fetch updated questions
    fetchQuestions();
  };

  const handleDeleteQuestion = async (id) => {
    const questionDoc = doc(db, 'questions', id);
    await deleteDoc(questionDoc);
    // Fetch updated questions
    fetchQuestions();
  };

  const handleEditQuestion = async () => {
    const questionDoc = doc(db, 'questions', editingQuestion.id);
    await updateDoc(questionDoc, editingQuestion);
    setEditingQuestion(null);
    // Fetch updated questions
    fetchQuestions();
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>

      <h3>Add Question</h3>
      <input
        type="text"
        value={newQuestion.text}
        onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
        placeholder="Question text"
      />
      <input
        type="text"
        value={newQuestion.category}
        onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })}
        placeholder="Category"
      />
      <button onClick={handleAddQuestion}>Add Question</button>

      <h3>Manage Questions</h3>
      <ul>
        {questions.map(question => (
          <li key={question.id}>
            {editingQuestion?.id === question.id ? (
              <div>
                <input
                  type="text"
                  value={editingQuestion.text}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, text: e.target.value })}
                />
                <input
                  type="text"
                  value={editingQuestion.category}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, category: e.target.value })}
                />
                <button onClick={handleEditQuestion}>Save</button>
              </div>
            ) : (
              <div>
                <span>{question.text} ({question.category})</span>
                <button onClick={() => setEditingQuestion(question)}>Edit</button>
                <button onClick={() => handleDeleteQuestion(question.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
>>>>>>> main
