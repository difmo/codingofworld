import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import Loader from '@/components/Loader';

const StudentTestDetails = () => {
  const { studentId } = useParams();
  const [studentDetails, setStudentDetails] = useState(null);

 useEffect(() => {
  const fetchStudentDetails = async () => {
    if (!studentId || typeof studentId !== "string") {
      console.error("Invalid student ID:", studentId);
      return;
    }

    try {
      const studentRef = doc(db, "students", studentId);
      const studentDoc = await getDoc(studentRef);

      if (studentDoc.exists()) {
        setStudentDetails(studentDoc.data());
      } else {
        console.warn("No student found for ID:", studentId);
      }
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  };

  fetchStudentDetails();
}, [studentId]);

  // Show loader while data is being fetched
  if (!studentDetails) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  // Safe to destructure now
  const {
    name,
    email,
    stream,
    answers = [],
    marks,
    questions = [],
  } = studentDetails;

  return (
    <div className="student-details m-8">
      <h1 className="text-xl font-bold mb-4">Test Details for {name}</h1>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Stream:</strong> {stream}</p>
      <p><strong>Marks:</strong> {marks}</p>

      <div className="test-questions mt-4">
        {questions.length > 0 ? (
          questions.map((question, index) => {
            const studentAnswer = answers[index];
            const correctAnswer = question.answer;
            const isCorrect = studentAnswer === correctAnswer;

            return (
              <div key={question.id || index} className="question mb-4">
                <h3 className="font-semibold">{question.question}</h3>
                <div>
                  {question.options.map((option, i) => {
                    const isSelected = studentAnswer === option;
                    const optionClass = isSelected
                      ? isCorrect
                        ? 'bg-green-200'
                        : 'bg-red-200'
                      : '';
                    return (
                      <div key={i} className={`p-2 border rounded my-1 ${optionClass}`}>
                        <input
                          type="radio"
                          checked={isSelected}
                          disabled
                          className="mr-2"
                        />
                        {option}
                      </div>
                    );
                  })}
                </div>
                <p className="mt-2">
                  <strong>Correct Answer:</strong> {correctAnswer}
                </p>
              </div>
            );
          })
        ) : (
          <p>No questions available.</p>
        )}
      </div>
    </div>
  );
};

export default StudentTestDetails;
