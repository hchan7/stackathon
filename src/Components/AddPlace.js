import React, { useState, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import axios from 'axios';

const AddPlace = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyA7SidJsAXk68zf7HXCtjzj1cltDuhbYkg',
      version: 'weekly',
      libraries: ['places']
    });

    loader.load().then(() => {
      setIsLoaded(true);
    });
  }, []);

  const handleSearch = () => {
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    const request = {
      query: query,
      fields: ['name', 'formatted_address']
    };

    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setResults(results);
      }
    });
  };

  return (
    <div>
      {isLoaded && (
        <form>
          <input type='text' value={query} onChange={ ev => setQuery(ev.target.value)} />
          <button onClick={ handleSearch }>Search</button>
        </form>
      )}
      {!isLoaded && <div>Loading...</div>}
      {results.map(result => (
        <div key={result.place_id}>
          <h2>{result.name}</h2>
          <p>{result.formatted_address}</p>
        </div>
      ))}
    </div>
  );
};


export default AddPlace;