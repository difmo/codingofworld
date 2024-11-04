import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TCSNQT = () => {
  const navigate = useNavigate();

  // State to track questions
  const [questions, setQuestions] = useState([
    // Problems on Arrays
    { id: 1, text: 'Find the smallest number in an array', category: 'Arrays', read: false, answered: false },
    { id: 2, text: 'Find the largest number in an array', category: 'Arrays', read: false, answered: false },
    { id: 2, text: 'Find the largest number in an array', category: 'Arrays', read: false, answered: false },
    { id: 2, text: 'Find the largest number in an array', category: 'Arrays', read: false, answered: false },
    { id: 2, text: 'Find the largest number in an array', category: 'Arrays', read: false, answered: false },
    { id: 2, text: 'Find the largest number in an array', category: 'Arrays', read: false, answered: false },
    { id: 2, text: 'Find the largest number in an array', category: 'Arrays', read: false, answered: false },
    { id: 2, text: 'Find the largest number in an array', category: 'Arrays', read: false, answered: false },
    { id: 2, text: 'Find the largest number in an array', category: 'Arrays', read: false, answered: false },
    { id: 2, text: 'Find the largest number in an array', category: 'Arrays', read: false, answered: false },
    { id: 2, text: 'Find the largest number in an array', category: 'Arrays', read: false, answered: false },
    { id: 2, text: 'Find the largest number in an array', category: 'Arrays', read: false, answered: false },
    { id: 2, text: 'Find the largest number in an array', category: 'Arrays', read: false, answered: false },
    { id: 2, text: 'Find the largest number in an array', category: 'Arrays', read: false, answered: false },
    { id: 2, text: 'Find the largest number in an array', category: 'Arrays', read: false, answered: false },
    { id: 2, text: 'Find the largest number in an array', category: 'Arrays', read: false, answered: false },



    // Problems on Numbers
    { id: 26, text: 'Check if a number is palindrome or not', category: 'Numbers', read: false, answered: false },
    { id: 27, text: 'Find all Palindrome numbers in a given range', category: 'Numbers', read: false, answered: false },
    { id: 27, text: 'Find all Palindrome numbers in a given range', category: 'Numbers', read: false, answered: false },
    { id: 27, text: 'Find all Palindrome numbers in a given range', category: 'Numbers', read: false, answered: false },
    { id: 27, text: 'Find all Palindrome numbers in a given range', category: 'Numbers', read: false, answered: false },
    { id: 27, text: 'Find all Palindrome numbers in a given range', category: 'Numbers', read: false, answered: false },
    { id: 27, text: 'Find all Palindrome numbers in a given range', category: 'Numbers', read: false, answered: false },
    { id: 27, text: 'Find all Palindrome numbers in a given range', category: 'Numbers', read: false, answered: false },
    { id: 27, text: 'Find all Palindrome numbers in a given range', category: 'Numbers', read: false, answered: false },
    { id: 27, text: 'Find all Palindrome numbers in a given range', category: 'Numbers', read: false, answered: false },
    { id: 27, text: 'Find all Palindrome numbers in a given range', category: 'Numbers', read: false, answered: false },
    { id: 27, text: 'Find all Palindrome numbers in a given range', category: 'Numbers', read: false, answered: false },
    { id: 27, text: 'Find all Palindrome numbers in a given range', category: 'Numbers', read: false, answered: false },
    { id: 27, text: 'Find all Palindrome numbers in a given range', category: 'Numbers', read: false, answered: false },
    { id: 27, text: 'Find all Palindrome numbers in a given range', category: 'Numbers', read: false, answered: false },
    { id: 27, text: 'Find all Palindrome numbers in a given range', category: 'Numbers', read: false, answered: false },
  


    // Problems on Sorting
    { id: 61, text: 'Bubble Sort Algorithm', category: 'Sorting', read: false, answered: false },
    { id: 62, text: 'Selection Sort Algorithm', category: 'Sorting', read: false, answered: false },
    { id: 62, text: 'Selection Sort Algorithm', category: 'Sorting', read: false, answered: false },
    { id: 62, text: 'Selection Sort Algorithm', category: 'Sorting', read: false, answered: false },
    { id: 62, text: 'Selection Sort Algorithm', category: 'Sorting', read: false, answered: false },
    { id: 62, text: 'Selection Sort Algorithm', category: 'Sorting', read: false, answered: false },
    { id: 62, text: 'Selection Sort Algorithm', category: 'Sorting', read: false, answered: false },
    { id: 62, text: 'Selection Sort Algorithm', category: 'Sorting', read: false, answered: false },
    { id: 62, text: 'Selection Sort Algorithm', category: 'Sorting', read: false, answered: false },
    { id: 62, text: 'Selection Sort Algorithm', category: 'Sorting', read: false, answered: false },
    { id: 62, text: 'Selection Sort Algorithm', category: 'Sorting', read: false, answered: false },
    { id: 62, text: 'Selection Sort Algorithm', category: 'Sorting', read: false, answered: false },
    { id: 62, text: 'Selection Sort Algorithm', category: 'Sorting', read: false, answered: false },
    { id: 62, text: 'Selection Sort Algorithm', category: 'Sorting', read: false, answered: false },
    { id: 62, text: 'Selection Sort Algorithm', category: 'Sorting', read: false, answered: false },
    { id: 62, text: 'Selection Sort Algorithm', category: 'Sorting', read: false, answered: false },
    { id: 62, text: 'Selection Sort Algorithm', category: 'Sorting', read: false, answered: false },
    { id: 62, text: 'Selection Sort Algorithm', category: 'Sorting', read: false, answered: false },
    { id: 62, text: 'Selection Sort Algorithm', category: 'Sorting', read: false, answered: false },
    { id: 62, text: 'Selection Sort Algorithm', category: 'Sorting', read: false, answered: false },
    { id: 62, text: 'Selection Sort Algorithm', category: 'Sorting', read: false, answered: false },
    { id: 62, text: 'Selection Sort Algorithm', category: 'Sorting', read: false, answered: false },

    // Problems on String
    { id: 66, text: 'Check if a given string is palindrome or not', category: 'String', read: false, answered: false },
    { id: 67, text: 'Count number of vowels, consonants, spaces in String', category: 'String', read: false, answered: false },
    { id: 67, text: 'Count number of vowels, consonants, spaces in String', category: 'String', read: false, answered: false },
    { id: 67, text: 'Count number of vowels, consonants, spaces in String', category: 'String', read: false, answered: false },
    { id: 67, text: 'Count number of vowels, consonants, spaces in String', category: 'String', read: false, answered: false },
    { id: 67, text: 'Count number of vowels, consonants, spaces in String', category: 'String', read: false, answered: false },
    { id: 67, text: 'Count number of vowels, consonants, spaces in String', category: 'String', read: false, answered: false },
    { id: 67, text: 'Count number of vowels, consonants, spaces in String', category: 'String', read: false, answered: false },
    { id: 67, text: 'Count number of vowels, consonants, spaces in String', category: 'String', read: false, answered: false },
    { id: 67, text: 'Count number of vowels, consonants, spaces in String', category: 'String', read: false, answered: false },
    { id: 67, text: 'Count number of vowels, consonants, spaces in String', category: 'String', read: false, answered: false },
    { id: 67, text: 'Count number of vowels, consonants, spaces in String', category: 'String', read: false, answered: false },
    { id: 67, text: 'Count number of vowels, consonants, spaces in String', category: 'String', read: false, answered: false },
    { id: 67, text: 'Count number of vowels, consonants, spaces in String', category: 'String', read: false, answered: false },
    { id: 67, text: 'Count number of vowels, consonants, spaces in String', category: 'String', read: false, answered: false },
    { id: 67, text: 'Count number of vowels, consonants, spaces in String', category: 'String', read: false, answered: false },
    { id: 67, text: 'Count number of vowels, consonants, spaces in String', category: 'String', read: false, answered: false },
    { id: 67, text: 'Count number of vowels, consonants, spaces in String', category: 'String', read: false, answered: false },
    { id: 67, text: 'Count number of vowels, consonants, spaces in String', category: 'String', read: false, answered: false },
    { id: 67, text: 'Count number of vowels, consonants, spaces in String', category: 'String', read: false, answered: false },
    { id: 67, text: 'Count number of vowels, consonants, spaces in String', category: 'String', read: false, answered: false },
    { id: 67, text: 'Count number of vowels, consonants, spaces in String', category: 'String', read: false, answered: false },
    { id: 67, text: 'Count number of vowels, consonants, spaces in String', category: 'String', read: false, answered: false },
    { id: 67, text: 'Count number of vowels, consonants, spaces in String', category: 'String', read: false, answered: false },
    { id: 67, text: 'Count number of vowels, consonants, spaces in String', category: 'String', read: false, answered: false },
    { id: 67, text: 'Count number of vowels, consonants, spaces in String', category: 'String', read: false, answered: false },
    { id: 67, text: 'Count number of vowels, consonants, spaces in String', category: 'String', read: false, answered: false },
    { id: 67, text: 'Count number of vowels, consonants, spaces in String', category: 'String', read: false, answered: false },
    { id: 67, text: 'Count number of vowels, consonants, spaces in String', category: 'String', read: false, answered: false },
    { id: 67, text: 'Count number of vowels, consonants, spaces in String', category: 'String', read: false, answered: false },
    { id: 67, text: 'Count number of vowels, consonants, spaces in String', category: 'String', read: false, answered: false },
    { id: 67, text: 'Count number of vowels, consonants, spaces in String', category: 'String', read: false, answered: false },

  ]);

  // Function to mark question as answered
  const handleAnswerClick = (id) => {
    setQuestions((prev) => 
      prev.map((question) => 
        question.id === id ? { ...question, answered: true } : question
      )
    );
  };

  const answeredCount = questions.filter((q) => q.answered).length;
  const percentage = (answeredCount / questions.length) * 100;

  return (
    <div className="flex flex-col pt-20">
    {/* Full-width Image at the Top */}

    <div className="flex">
      {/* Static Sidebar for Progress */}
      {/* <aside className="w-1/4 bg-primary/80 p-4 h-screen sticky top-20"> */}
        {/* <h2 className="text-xl font-bold">Progress</h2>
        <div className="mt-4">
          <div className="bg-gray-300 h-4 rounded">
            <div
              className="bg-primary h-full"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <div className="mt-2">
            <strong>{answeredCount} / {questions.length} answered</strong>
          </div>
        </div>
      </aside> */}

      {/* Main Content */}
      <main className="flex-1 p-4">
        <h2 className="text-2xl font-bold">About TCS NQT</h2>
        <p>
          TCS NQT is an exam conducted by TCS (Tata Consultancy Services) for hiring. Find detailed TCS NQT Syllabus and Exam pattern in this article.
        </p>
        <h2 className="text-2xl font-bold mt-4">Problems</h2>
        {['Arrays', 'Numbers', 'Sorting', 'String'].map((category) => (
          <div key={category}>
            <h3 className="text-xl font-bold mt-4">{category}</h3>
            <ol  className="list-decimal list-inside ">
              {questions.filter(q => q.category === category).map((question) => (
                <li onClick={()=>navigate("/findsmallest")} key={question.id} className="cursor-pointer flex items-center p-2">
                  <span>{question.text}</span>
                  {!question.answered && (
                    <button 
                      onClick={() => handleAnswerClick(question.id)} 
                      className="ml-2 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                     Answered
                    </button>
                  )}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </main>
    </div>
    </div>
  );
};

export default TCSNQT;
