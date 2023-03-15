import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getVans } from '../../api';

function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const typeFilter = searchParams.get('type');

  useEffect(() => {
    fetchVans();
  }, []);

  const fetchVans = async () => {
    setLoading(true);
    try {
      const data = await getVans();
      setVans(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredVans = typeFilter
    ? vans.filter(van => van.type.toLowerCase() === typeFilter)
    : vans;

  const renderedVans = filteredVans.map(van => {
    return (
      <div key={van.id} className="van-tile">
        <Link
          to={van.id}
          state={{ search: `?${searchParams.toString()}`, type: typeFilter }}
        >
          <img src={van.imageUrl} />
          <div className="van-info">
            <h3>{van.name}</h3>
            <p>
              ${van.price}
              <span>/day</span>
            </p>
          </div>
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
        </Link>
      </div>
    );
  });

  function handleFilterChange(key, value) {
    setSearchParams(prevParams => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>There was an error: {error.message}</h1>;

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list-filter-buttons">
        <button
          className={`van-type simple ${
            typeFilter === 'simple' ? 'selected' : ''
          }`}
          onClick={() => handleFilterChange('type', 'simple')}
        >
          wwwwwwwwww Simple
        </button>
        <button
          className={`van-type luxury ${
            typeFilter === 'luxury' ? 'selected' : ''
          }`}
          onClick={() => handleFilterChange('type', 'luxury')}
        >
          Luxury
        </button>
        <button
          className={`van-type rugged ${
            typeFilter === 'rugged' ? 'selected' : ''
          }`}
          onClick={() => handleFilterChange('type', 'rugged')}
        >
          Rugged
        </button>
        {typeFilter && (
          <button
            className="van-type clear-filters"
            onClick={() => setSearchParams({})}
          >
            Clear filter
          </button>
        )}
      </div>
      <div className="van-list">{renderedVans}</div>
    </div>
  );
}

export default Vans;
