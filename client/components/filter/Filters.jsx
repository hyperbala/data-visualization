'use client'

import React, { useState, useEffect } from 'react';
import Input from './Input';

const Filters = ({ onFilterChange, handleClose }) => {
  const [filters, setFilters] = useState({
    end_year: '',
    topic: '',
    sector: '',
    region: '',
    pestle: '',
    source: '',
    relevance: '',
    country: ''
  });

  const [filterOptions, setFilterOptions] = useState({
    end_year: [],
    topic: [],
    sector: [],
    region: [],
    pestle: [],
    source: [],
    relevance: [],
    country: []
  });

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await fetch('http://localhost:5000/filters');
        const result = await response.json();
        setFilterOptions(result);
        console.log(result);
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };

    fetchFilterOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(filters);
    handleClose();
  };

  const handleClear = () => {
    const clearedFilters = {
      end_year: '',
      topic: '',
      sector: '',
      region: '',
      pestle: '',
      source: '',
      relevance: '',
      country: ''
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(filters).map(key => (
          <Input
            key={key}
            label={key.replace('_', ' ').toUpperCase()}
            placeholder={`Select a ${key.replace('_', ' ')}`}
            data={filterOptions[key] || []}
            name={key}
            value={filters[key]}
            onChange={handleChange}
          />
        ))}
      </div>
      <div className="flex justify-between pb-3">
        <button
          type="button"
          onClick={handleClear}
          className="flex justify-end items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Clear Filters
        </button>
        <button
          type="submit"
          className="flex justify-end items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Apply Filters
        </button>
      </div>
    </form>
  );
};

export default Filters;
