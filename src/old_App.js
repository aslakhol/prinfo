import React, { useState, useEffect } from 'react';

const charUrl = 'https://rickandmortyapi.com/api/character/';
const timeUrl = 'http://worldtimeapi.org/api/timezone/Europe/Oslo';

const App = () => {
  const [data, setData] = useState({ results: [] });
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const [time, setTime] = useState({});
  const [pressedCount, setPressedCount] = useState(0);

  const handleSubmit = e => {
    e.preventDefault();
    setPressedCount(pressedCount + 1);
    setSearch(query);
  }

  const getTime = () => {
    const fetchData = () => {
      fetch(timeUrl)
        .then(response => response.json())
        // .then(response => console.log(response))
        .then(time => setTime(time));
    }
    console.log('time fetched');

    fetchData();
  }

  const searchForCharacter = () => {
    const fetchData = () => {
      fetch(`${charUrl}?name=${query}`)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(err => {
          console.error(err);
        });
    };
    console.log('characters fetched');

    fetchData();
  }

  useEffect(() => {
    getTime();
  }, [pressedCount])

  useEffect(() => {
    searchForCharacter();
    getTime();
  }, [search]);

  return (
    <div className="resultWrapper">
      <span>Time: {time.unixtime}</span>

      <form onSubmit={handleSubmit}>
        <input type="text" value={query} onChange={e => setQuery(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <div className="results">
        <ul>
          {data.results.map(item => (
            <li key={item.id}>
              {/* <img src={item.image} alt={item.name} /> */}
              <span className="name">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default App;
