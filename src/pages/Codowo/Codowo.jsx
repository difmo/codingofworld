// import React, { useState } from "react";
// import { Controlled as CodeMirror } from "react-codemirror2";
// import "codemirror/lib/codemirror.css";
// import "codemirror/mode/javascript/javascript";
// import "codemirror/mode/python/python";
// import "codemirror/mode/clike/clike";

// const Codowo = () => {
//   const [code, setCode] = useState("// Write your code here...");
//   const [output, setOutput] = useState("No output yet...");
//   const [language, setLanguage] = useState("JavaScript");
//   const [isTestPassed, setIsTestPassed] = useState(null);

//   // Problem description with example input/output
//   const problemDescription = `
//     Given an array of integers nums and an integer target, return indices 
//     of the two numbers such that they add up to target.

//     Example 1:
//     Input: nums = [2,7,11,15], target = 9
//     Output: [0,1]
//     Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
//   `;

//   // Test case input and expected output for Two Sum
//   const exampleInput = `[2, 7, 11, 15]`;
//   const exampleTarget = 9;
//   const expectedOutput = `[0,1]`;

//   // Capture and redirect print statements in Python
//   const capturePythonOutput = (code) => {
//     let result = '';
//     const originalPrint = console.log;  // Store original console.log function
//     console.log = (message) => { result += message + '\n'; };  // Redirect output to result string
//     try {
//       new Function('nums', 'target', code)(JSON.parse(exampleInput), exampleTarget); // Run user code
//     } catch (e) {
//       result = `Error: ${e.message}`;
//     }
//     console.log = originalPrint;  // Restore console.log
//     return result;
//   };

//   // Capture and redirect console output in JavaScript
//   const captureJavaScriptOutput = (code) => {
//     let result = '';
//     const originalConsoleLog = console.log;
//     console.log = (message) => { result += message + '\n'; };
//     try {
//       eval(code);  // Execute JavaScript code
//     } catch (e) {
//       result = `Error: ${e.message}`;
//     }
//     console.log = originalConsoleLog;  // Restore console.log
//     return result;
//   };

//   // Run the user's code and validate against the test case
//   const handleRun = () => {
//     setOutput("Running your code...");

//     let result;
//     try {
//       if (language === 'Python') {
//         result = capturePythonOutput(code);  // Capture Python output
//       } else {
//         result = captureJavaScriptOutput(code);  // Capture JavaScript output
//       }

//       // Check if the output matches the expected output
//       if (result.trim() === expectedOutput) {
//         setIsTestPassed(true);
//         setOutput(`Test Passed! Output: ${result}`);
//       } else {
//         setIsTestPassed(false);
//         setOutput(`Test Failed! Output: ${result}`);
//       }
//     } catch (e) {
//       setIsTestPassed(false);
//       setOutput(`Error: ${e.message}`);
//     }
//   };

//   // Handle the submission (show feedback on success/failure)
//   const handleSubmit = () => {
//     if (isTestPassed) {
//       setOutput("Code submitted successfully! (mock output: Accepted)");
//     } else {
//       setOutput("Code submission failed! Please fix the errors.");
//     }
//   };

//   // Determine the mode for the CodeMirror editor based on the selected language
//   const getEditorMode = (language) => {
//     switch (language) {
//       case "Python":
//         return "python";
//       case "C++":
//         return "clike";
//       default:
//         return "javascript";
//     }
//   };

//   return (
//     <div className="grid h-screen grid-cols-2 font-sans">
//       {/* Left Panel: Problem Description */}
//       <div className="flex flex-col p-4 overflow-y-auto border-r">
//         <h1 className="text-2xl font-bold">1. Two Sum</h1>
//         <p className="mt-4 whitespace-pre-line">{problemDescription}</p>
//       </div>

//       {/* Right Panel: Code Editor */}
//       <div className="flex flex-col p-4">
//         {/* Language Selector and Buttons */}
//         <div className="flex justify-between mb-2">
//           <select
//             className="p-2 border rounded"
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//           >
//             <option>JavaScript</option>
//             <option>Python</option>
//             <option>C++</option>
//           </select>
//           <button
//             className="p-2 text-white bg-blue-500 rounded"
//             onClick={handleRun}
//           >
//             Run
//           </button>
//           <button
//             className="p-2 text-white bg-green-500 rounded"
//             onClick={handleSubmit}
//           >
//             Submit
//           </button>
//         </div>

//         {/* Code Editor */}
//         <div className="flex-grow mb-2">
//           <div style={{ height: "calc(100% - 50px)" }} className="border rounded">
//             <CodeMirror
//               value={code}
//               options={{
//                 mode: getEditorMode(language), // Set the mode based on the selected language
//                 lineNumbers: true,
//                 theme: "default",
//               }}
//               onBeforeChange={(editor, data, value) => setCode(value)}
//             />
//           </div>
//         </div>

//         {/* Testcase Output */}
//         <div className="p-2 mt-2 bg-gray-100 border-t">
//           <strong>Output:</strong>
//           <pre>{output}</pre>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Codowo;
