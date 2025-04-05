import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';  // Make sure Firebase is correctly set up
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

const StudentTestDetails = () => {
    const { studentId } = useParams(); // Get the studentId from the URL
    const [studentDetails, setStudentDetails] = useState(null);
  
    useEffect(() => {
      const fetchStudentDetails = async () => {
        try {
          const studentRef = doc(db, "students", studentId);
          const studentDoc = await getDoc(studentRef);
          
          if (studentDoc.exists()) {
            setStudentDetails(studentDoc.data());
          } else {
            console.log("No student found!");
          }
        } catch (error) {
          console.error("Error fetching student details:", error);
        }
      };
  
      fetchStudentDetails();
    }, [studentId]);
  
    // if (!studentDetails) return <div>Loading...</div>;
    if (!studentDetails) {
      return <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    }
    // Destructure data and add fallback in case 'questions' or 'answers' are undefined
    const { name, email, stream, answers = [], marks, questions = [] } = studentDetails;
  
    return (
      <div className="student-details m-8">
        <h1 className="text-xl font-bold mb-4">Test Details for {name}</h1>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Stream:</strong> {stream}</p>
        <p><strong>Marks:</strong> {marks}</p>
        
        <div className="test-questions mt-4">
          {/* Check if questions exists before attempting to map */}
          {questions && questions.length > 0 ? (
            questions.map((question, index) => {
              const studentAnswer = answers[index];
              const correctAnswer = question.answer;
              const isCorrect = studentAnswer === correctAnswer;
  
              return (
                <div key={question.id} className="question mb-4">
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
            <p>No questions available.</p> // Display this message if no questions are available
          )}
        </div>
      </div>
    );
  };
  
  export default StudentTestDetails;
  