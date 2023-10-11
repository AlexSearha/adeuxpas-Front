// LAYOUT
import CardsCarousel from '../../components/SearchResults/CardsCarousel';
// CSS
import './styles.scss';

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

function SearchResultPage() {
  const searchResults = [
    {
      title: 'Card 1',
      description: 'Description for Card 1',
      imageUrl:
        'https://www.airbnb.com/rohttps://www.airbnb.com/rooms/857977220623181037?adults=1&children=0&infants=0&check_in=2023-08-25&check_out=2023-08-30&source_impression_id=p3_1690835579_51uiBIGooXAeig9Y&previous_page_section_name=1000&federated_search_id=08e5ed81-d3f2-4589-b2e7-3d74106e86a3&modal=PHOTO_TOUR_SCROLLABLEoms/31070673?irgwc=1&irclid=wEoxhKQA6xyNU-tVSGUHf1e9UkAR%3ADV1DW-oWk0&ircid=4273&sharedid=stay_faro&af=&iratid=9627&c=.pi73.pk4273_346818&irparam1=&source_impression_id=p3_1679331025_azUq%2BbWVASZhsioe',
      id: '1',
    },
    {
      title: 'Card 2',
      description: 'Description for Card 2',
      imageUrl:
        'https://www.airbnb.com/rooms/48249966?adults=1&category_tag=Tag%3A8186&children=0&enable_m3_private_room=true&infants=0&pets=0&search_mode=flex_destinations_search&check_in=2023-08-27&check_out=2023-09-01&source_impression_id=p3_1690794720_UyTv4Ul5SH59%2FTVX&previous_page_section_name=1000&federated_search_id=f184461c-52e1-4811-abad-6b0202e72868',
      id: '2',
    },
  ];

  // ----------------------------RETURN----------------------------------//

  return (
    <div className="search">
      <div className="search__map">
        {/* <h3>Zone choisie</h3> */}
        <Map />
      </div>
      <div className="search__container">
        <div className="search__suggestion">
          <CardsCarousel results={searchResults} />
        </div>
        <div className="search__suggestion">
          <CardsCarousel results={searchResults} />
        </div>
      </div>
    </div>
  );
}
export default SearchResultPage;
