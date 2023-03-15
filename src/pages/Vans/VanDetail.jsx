import { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';

function VanDetail() {
  const params = useParams();
  const location = useLocation();

  const [van, setVan] = useState(null);

  useEffect(() => {
    fetchVanData();
  }, [params.id]);

  const fetchVanData = async () => {
    const response = await fetch(`/api/vans/${params.id}`);
    const data = await response.json();

    setVan(data.vans);
  };

  const content = van ? (
    <div className="van-detail">
      <img src={van.imageUrl} />
      <i className={`van-type ${van.type} selected`}>{van.type}</i>
      <h2>{van.name}</h2>
      <p className="van-price">
        <span>${van.price}</span>/day
      </p>
      <p>{van.description}</p>
      <button className="link-button">Rent this van</button>
    </div>
  ) : (
    <h2>Loading...</h2>
  );

  const search = location.state?.search || '';
  const vanType = location.state?.type || 'all';

  return (
    <div className="van-detail-container">
      <Link to={`..${search}`} relative="path" className="back-button">
        &larr; <span>Back to {vanType} vans</span>
      </Link>
      {content}
    </div>
  );
}

export default VanDetail;
