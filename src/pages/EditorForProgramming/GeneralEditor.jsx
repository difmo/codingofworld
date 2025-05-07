    import React, { useState } from 'react';
    import Editor from '@monaco-editor/react';

    const DartEditor = () => {
    const [code, setCode] = useState(`void main() {
    print("Hello, Dart!");
    }`);
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);

    const handleRun = () => {
        setIsRunning(true);
        setOutput('Running Dart code...');

        // Simulate execution delay
        setTimeout(() => {
        setOutput('✅ Output:\nHello, Dart!');
        setIsRunning(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-gray-900 border border-red-500 rounded-lg overflow-hidden shadow-lg">
            {/* Simulated Mobile Device View */}
            <div className="flex flex-col h-[600px]">
            {/* Editor Area */}
            <div className="flex-1">
            <Editor
  height="100%"
  language="dart"
  theme="vs-dark"
  value={code}
  onChange={(value) => setCode(value)}
  options={{
    fontSize: 14,
    minimap: { enabled: false },
    lineNumbers: 'on',
    autoClosingBrackets: 'always',
    formatOnType: false,
    tabSize: 2,
    insertSpaces: true,
    autoIndent: 'none',
    whiteSpace: 'normal', // Ensure normal whitespace handling
  }}
/>


            </div>

            {/* Output Area */}
            <div className="h-1/2 bg-gray-800 text-white p-2 overflow-auto text-sm">
                {isRunning ? (
                <div className="animate-pulse text-yellow-400">{output}</div>
                ) : (
                <pre>{output}</pre>
                )}
            </div>
            </div>

            {/* Run Button */}
            <button
            onClick={handleRun}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 transition duration-300"
            >
            ▶ Run
            </button>
        </div>
        </div>
    );
    };

    export default DartEditor;
