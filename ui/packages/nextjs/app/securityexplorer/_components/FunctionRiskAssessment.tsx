"use client";

import React, { useState, KeyboardEvent } from 'react';
import { mockedFunctions, FunctionData } from './FunctionData';

const FunctionRiskAssessment: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [functions, setFunctions] = useState<FunctionData[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [showReport, setShowReport] = useState<boolean>(false);

  const summaryStats = {
    overallScore: 91,
    criticalIssues: functions.filter(f => f.securityLevel === 'Critical').length,
    highIssues: functions.filter(f => f.securityLevel === 'High').length,
    mediumIssues: functions.filter(f => f.securityLevel === 'Medium').length,
    lowIssues: functions.filter(f => f.securityLevel === 'Low').length,
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowReport(false); // Reset report visibility on new search
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      const filteredFunctions = mockedFunctions.filter((f) => f.contractAddress.includes(inputValue));
      setFunctions(filteredFunctions);
      setInputValue('');
      setShowReport(true); // Show report only if there are results
    }
  };

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const getSecurityLevelColor = (level: string) => {
    switch (level) {
      case 'Critical': return 'text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-100';
      case 'High': return 'text-orange-700 bg-orange-100 dark:bg-orange-900 dark:text-orange-100';
      case 'Medium': return 'text-yellow-700 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-100';
      case 'Low': return 'text-green-700 bg-green-100 dark:bg-green-900 dark:text-green-100';
      default: return 'text-gray-700 bg-gray-100 dark:bg-gray-900 dark:text-gray-100';
    }
  };

  return (
    <div className="p-4 space-y-4 dark:bg-gray-800 dark:text-gray-200">
      <h2 className="text-3xl font-bold mt-4">ZTrust Blockchain Security Explorer</h2>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className="border-2 border-gray-300 p-2 w-full rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
        placeholder="Enter contract address..."
      />
      {showReport && functions.length > 0 && (
        <>
          <h2 className="text-lg mt-4">Results for: {openId}</h2>

          <div className="bg-blue-100 dark:bg-blue-900 dark:text-blue-100 p-4 rounded-lg shadow text-center">
            <div className="text-xl font-bold">Overall Score</div>
            <div className="text-3xl">{summaryStats.overallScore}</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-red-100 dark:bg-red-900 dark:text-red-100 p-4 rounded-lg shadow text-center">
              <div>Critical Issues</div>
              <div className="text-lg font-bold">{summaryStats.criticalIssues}</div>
            </div>
            <div className="bg-orange-100 dark:bg-orange-900 dark:text-orange-100 p-4 rounded-lg shadow text-center">
              <div>High Issues</div>
              <div className="text-lg font-bold">{summaryStats.highIssues}</div>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-100 p-4 rounded-lg shadow text-center">
              <div>Medium Issues</div>
              <div className="text-lg font-bold">{summaryStats.mediumIssues}</div>
            </div>
            <div className="bg-green-100 dark:bg-green-900 dark:text-green-100 p-4 rounded-lg shadow text-center">
              <div>Low Issues</div>
              <div className="text-lg font-bold">{summaryStats.lowIssues}</div>
            </div>
          </div>
          {/* Function list and details */}
        </>
      )}

      {/* Result List */}
      {functions.map((func) => (
        <div key={func.id} className="border-b-2 dark:border-gray-700 my-4">
          <button
            className="w-full text-left p-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md"
            onClick={() => toggleAccordion(func.contractAddress)}
          >
            <span>{func.name}</span>
            <span className={`px-4 py-2 rounded-full text-sm font-bold ${getSecurityLevelColor(func.securityLevel)}`}>
              {func.securityLevel}
            </span>
          </button>
          {openId === func.contractAddress && (
            <div className="p-4 bg-white border rounded-md shadow-sm dark:bg-gray-600 dark:border-gray-700">
              <p><strong>Details:</strong> {func.details}</p>
              {/* View Full Report Button */}
            </div>
          )}
        </div>
      ))}
      <a href="path_to_detailed_report.pdf" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        View Full Report
      </a>
      {showReport && functions.length !== 0 && (
        <div className="text-center p-4">No results found for "{inputValue}". Try another contract address.</div>
      )}
    </div>
  );
};

export default FunctionRiskAssessment;