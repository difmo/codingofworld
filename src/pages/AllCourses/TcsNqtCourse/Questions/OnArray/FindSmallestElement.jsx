import React, { useState } from 'react';
import { FaCopy, FaClipboardCheck } from 'react-icons/fa'; // Import copy and check icons

const FindSmallestElement = () => {
    const [copySuccess, setCopySuccess] = useState(false); // State to track copy success

    const copyToClipboard = (code) => {
        navigator.clipboard.writeText(code)
            .then(() => {
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 2000); // Reset icon after 2 seconds
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };

    const cCode1 = `#include<bits/stdc++.h>
using namespace std;

int sortArr(vector<int>& arr) {
    sort(arr.begin(), arr.end());
    return arr[0];
}

int main() {
    vector<int> arr1 = {2, 5, 1, 3, 0};
    vector<int> arr2 = {8, 10, 5, 7, 9};

    cout << "The smallest element in the array is: " << sortArr(arr1) << endl;
    cout << "The smallest element in the array is: " << sortArr(arr2);

    return 0;
}`;

    const cCode2 = `#include <iostream>
#include <bits/stdc++.h>

using namespace std;

int SmallestElement(int arr[], int n) {
    int min = arr[0];
    for (int i = 0; i < n; i++) {
        if (min > arr[i]) {
            min = arr[i];
        }
    }
    return min;
}

int main() {
    int arr1[] = {2, 5, 1, 3, 0};
    int n = 5;
    int min = SmallestElement(arr1, n);
    cout << "The smallest element in the array is: " << min << endl;

    int arr2[] = {8, 10, 5, 7, 9};
    n = 5;
    min = SmallestElement(arr2, n);
    cout << "The smallest element in the array is: " << min;

    return 0;
}`;

    return (
        <div className="p-6 bg-white rounded-lg shadow-md text-gray-800 dark:bg-gray-800 dark:text-gray-200 container py-40">
            <div className='container'>
                <h1 className="text-3xl font-bold mb-4 text-primary">Find the Smallest Element in an Array</h1>

                <h2 className="text-2xl font-semibold mb-2">Problem Statement:</h2>
                <p>Given an array, we have to find the smallest element in the array.</p>

                <h2 className="text-xl font-semibold mt-4">Examples:</h2>
                <div className="ml-6 co">
                    <p><strong>Example 1:</strong></p>
                    <p>Input: arr[] = {`{2, 5, 1, 3, 0}`}</p>
                    <p>Output: 0</p>
                    <p>Explanation: 0 is the smallest element in the array.</p>

                    <p><strong>Example 2:</strong></p>
                    <p>Input: arr[] = {`{8, 10, 5, 7, 9}`}</p>
                    <p>Output: 5</p>
                    <p>Explanation: 5 is the smallest element in the array.</p>
                </div>

                <h2 className="text-xl font-semibold mt-4">Solution:</h2>

                <h3 className="text-lg font-semibold mt-2">Solution 1: Sorting</h3>
                <p>Intuition: We can sort the array in ascending order, hence the smallest element will be at the 0th index.</p>
                <p>Approach:</p>
                <ol className="list-decimal list-inside ml-6">
                    <li>Sort the array in ascending order.</li>
                    <li>Print the 0th index.</li>
                </ol>
                <p>Dry Run:</p>
                <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
                    Before sorting: arr[] = {`{2, 5, 1, 3, 0}`};<br />
                    After sorting: arr[] = {`{0, 1, 2, 3, 5}`};<br />
                    Hence answer: arr[0] = 0
                </pre>

                <h4 className="mt-4 font-semibold">Code Explanation:</h4>
                <p>This code sorts the array and retrieves the smallest element:</p>
                <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
                    {cCode1}
                </pre>
                <button 
                    onClick={() => copyToClipboard(cCode1)} 
                    className="text-gray-600 hover:text-gray-800"
                >
                    {copySuccess ? <FaClipboardCheck /> : <FaCopy />}
                </button>

                <h4 className="mt-4 font-semibold">Output:</h4>
                <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
                    The smallest element in the array is: 0<br />
                    The smallest element in the array is: 5
                </pre>
                <p>Time Complexity: O(N log N)<br />Space Complexity: O(1)</p>

                <h3 className="text-lg font-semibold mt-4">Solution 2: Using a Min Variable</h3>
                <p>Intuition: We can maintain a min variable which will update whenever the current value is less than the value in the min variable.</p>
                <p>Approach:</p>
                <ol className="list-decimal list-inside ml-6">
                    <li>Create a min variable and initialize it with arr[0].</li>
                    <li>Use a for loop and compare it with other elements of the array.</li>
                    <li>If any element is less than the min value, update the min value with the element’s value.</li>
                    <li>Print the min variable.</li>
                </ol>

                <h4 className="mt-4 font-semibold">Code Explanation:</h4>
                <p>This code iterates through the array to find the smallest element without sorting:</p>
                <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
                    {cCode2}
                </pre>
                <button 
                    onClick={() => copyToClipboard(cCode2)} 
                    className="text-gray-600 hover:text-gray-800"
                >
                    {copySuccess ? <FaClipboardCheck /> : <FaCopy />}
                </button>

                <h4 className="mt-4 font-semibold">Output:</h4>
                <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
                    The smallest element in the array is: 0<br />
                    The smallest element in the array is: 5
                </pre>
                <p>Time Complexity: O(N)<br />Space Complexity: O(1)</p>

                <p className="mt-4">
                    Special thanks to <a href="#" className="text-blue-600">pritam</a> for contributing to this article.
                </p>
            </div>
        </div>
    );
};

export default FindSmallestElement;
