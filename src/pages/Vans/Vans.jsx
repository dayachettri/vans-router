import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Vans() {
  const [vans, setVans] = useState([]);

  useEffect(() => {
    fetchVans();
  }, []);

  const fetchVans = async () => {
    const response = await fetch('/api/vans');
    const data = await response.json();

    setVans(data.vans);
  };

  const renderedVans = vans.map(van => {
    return (
      <div key={van.id} className="van-tile">
        <Link to={`/vans/${van.id}`}>
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

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list">{renderedVans}</div>
    </div>
  );
}

export default Vans;
