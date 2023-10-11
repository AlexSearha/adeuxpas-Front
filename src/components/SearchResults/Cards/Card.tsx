// CSS
import './style.scss';
// TYPE
interface SearchResult {
  title: string;
  description: string;
  imageUrl: string;
  id: number;
}

interface SearchResultCardProps {
  result: SearchResult;
}

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

function SearchResultCard({ result }: SearchResultCardProps) {
  const handleCardClick = () => {
    window.open(result.imageUrl, '_blank');
  };

  return (
    <div className="search-result-card" onClick={handleCardClick}>
      <img src={result.imageUrl} alt={result.title} />
      <h3>{result.title}</h3>
      <p>{result.description}</p>
    </div>
  );
}

export default SearchResultCard;
