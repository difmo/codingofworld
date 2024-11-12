import React, { useState } from "react";
import { FaCopy, FaClipboardCheck } from "react-icons/fa";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism"; 

const FindSmallestElement = () => {
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = (code) => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
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
    <div className="container text-white bg-black rounded-lg shadow-md dark:bg-gray-800 dark:text-gray-200">
      <h1 className="mb-4 text-5xl font-bold text-primary">
        Find the Smallest Element in an Array
      </h1>

      <h2 className="mb-2 text-2xl font-semibold text-white">
        Problem Statement:
      </h2>
      <p className="text-white">
        Given an array, we have to find the smallest element in the array.
      </p>

      <h2 className="mt-4 text-xl font-semibold text-white">Examples:</h2>
      <div className="ml-6 text-white">
        <p>
          <strong>Example 1:</strong>
        </p>
        <p>Input: arr[] = {`{2, 5, 1, 3, 0}`}</p>
        <p>Output: 0</p>
        <p>Explanation: 0 is the smallest element in the array.</p>

        <p>
          <strong>Example 2:</strong>
        </p>
        <p>Input: arr[] = {`{8, 10, 5, 7, 9}`}</p>
        <p>Output: 5</p>
        <p>Explanation: 5 is the smallest element in the array.</p>
      </div>

      <h2 className="mt-4 text-xl font-semibold text-white">Solution:</h2>
      <h3 className="mt-2 text-lg font-semibold text-white">
        Solution 1: Sorting
      </h3>
      <p>
        Intuition: We can sort the array in ascending order, hence the smallest
        element will be at the 0th index.
      </p>
      <p>Approach:</p>
      <ol className="ml-6 list-decimal list-inside">
        <li>Sort the array in ascending order.</li>
        <li>Print the 0th index.</li>
      </ol>
      <h4 className="mt-4 font-semibold">Code Explanation:</h4>
      <div className="relative">
        <SyntaxHighlighter
          language="cpp"
          style={dracula} 
          className="p-2 overflow-x-auto bg-black rounded"
        >
          {cCode1}
        </SyntaxHighlighter>
        <button
          onClick={() => copyToClipboard(cCode1)}
          className="absolute text-gray-600 top-2 right-2 hover:text-gray-800"
        >
          {copySuccess ? <FaClipboardCheck /> : <FaCopy />}
        </button>
      </div>

      <h4 className="mt-4 font-semibold">Output:</h4>
      <pre className="p-2 overflow-x-auto bg-[#212529]  rounded">
        The smallest element in the array is: 0<br />
        The smallest element in the array is: 5
      </pre>
      <p>
        Time Complexity: O(N log N)
        <br />
        Space Complexity: O(1)
      </p>
    </div>
  );
};

export default FindSmallestElement;
