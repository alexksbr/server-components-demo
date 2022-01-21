import {useLocation} from './LocationContext.client';
import {useTransition} from 'react';

const ShowStatisticsButton: React.FC = () => {
  const {location, setLocation} = useLocation();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      className="button statistics-button"
      disabled={isPending}
      onClick={() => {
        startTransition(() => {
          setLocation &&
          setLocation((loc) => ({
            selectedId: loc.selectedId,
            isEditing: loc.isEditing,
            searchText: loc.searchText,
            filterFavorites: loc.filterFavorites,
            showStatistics: !location.showStatistics
          }));
        });
      }} >
      Show Statistics
    </button>
  );
}

export default ShowStatisticsButton;