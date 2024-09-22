import React, { useState, useRef, useEffect } from 'react';
interface FilterMenuProps {
  filters: {
    gender: string;
    ageGroup: string[];
    styles: string;
    sizes: string[];
    fit: string;
    season: string[];
  };
  onFilterChange: (newFilters: any) => void;
}
const FilterMenu: React.FC<FilterMenuProps> = ({ filters, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleFilter = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button onClick={toggleFilter} className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md">
        <img src="/uploads/filter.jpg" alt="Filter" className="w-6 h-6" />
        <span>Filter</span>
      </button> 
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-md p-4 z-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Filters</h3>
            <button onClick={toggleFilter} className="text-gray-500 hover:text-gray-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Gender:</label>
              <select 
                value={filters.gender} 
                onChange={(e) => onFilterChange({ ...filters, gender: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                <option value="">All</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Age Group:</label>
              <div className="space-y-1">
                {['young adult', 'middle-aged', 'teen'].map(age => (
                  <label key={age} className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={filters.ageGroup.includes(age)}
                      onChange={(e) => {
                        const newAgeGroup = e.target.checked 
                          ? [...filters.ageGroup, age]
                          : filters.ageGroup.filter(a => a !== age);
                        onFilterChange({ ...filters, ageGroup: newAgeGroup });
                      }}
                      className="mr-2"
                    />
                    <span className="text-sm">{age}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Style:</label>
              <select
                value={filters.styles}
                onChange={(e) => onFilterChange({ ...filters, styles: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                <option value="">All</option>
                <option value="casual chic">Casual Chic</option>
                <option value="streetwear">Streetwear</option>
                <option value="smart casual">Smart Casual</option>
                <option value="athleisure">Athleisure</option>
                <option value="vintage">Vintage</option>
                <option value="minimal">Minimal</option>
                <option value="edgy">Edgy</option>
                <option value="business casual">Business Casual</option>
                <option value="preppy">Preppy</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Sizes:</label>
              <div className="flex flex-wrap gap-2">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL', 'OS'].map(size => (
                  <label key={size} className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={filters.sizes.includes(size)}
                      onChange={(e) => {
                        const newSizes = e.target.checked 
                          ? [...filters.sizes, size]
                          : filters.sizes.filter(s => s !== size);
                        onFilterChange({ ...filters, sizes: newSizes });
                      }}
                      className="mr-1"
                    />
                    <span className="text-sm">{size}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Fit:</label>
              <select 
                value={filters.fit} 
                onChange={(e) => onFilterChange({ ...filters, fit: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                <option value="">All</option>
                <option value="Regular">Regular</option>
                <option value="Relaxed">Relaxed</option>
                <option value="Loose/baggy">Loose/baggy</option>
                <option value="Slim">Slim</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Season:</label>
              <div className="space-y-1">
                {['Autumn', 'Winter', 'Spring', 'Summer'].map(season => (
                  <label key={season} className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={filters.season.includes(season)}
                      onChange={(e) => {
                        const newSeason = e.target.checked 
                          ? [...filters.season, season]
                          : filters.season.filter(s => s !== season);
                        onFilterChange({ ...filters, season: newSeason });
                      }}
                      className="mr-2"
                    />
                    <span className="text-sm">{season}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterMenu;