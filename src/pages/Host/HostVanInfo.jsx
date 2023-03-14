import { useOutletContext } from 'react-router-dom';

function HostVanInfo() {
  const { currentVan } = useOutletContext();

  return (
    <section>
      <h4>Name: {currentVan.name}</h4>
      <h4>Category: {currentVan.type}</h4>
      <h4>Description: {currentVan.description}</h4>
      <h4>visibility: public</h4>
    </section>
  );
}

export default HostVanInfo;
