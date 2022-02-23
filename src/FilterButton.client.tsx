import {useLocation} from './LocationContext.client';
import {useTransition} from 'react';
import {useFilterSettings} from './FilterSettingsContext.client';

const FilterButton: React.FC = () => {
    const [isPending, startTransition] = useTransition();
    const {filterSettings, setFilterSettings} = useFilterSettings();

    return (
        <button
            className="button favorite-button"
            disabled={isPending}
            onClick={() => {
                startTransition(() => {
                    setFilterSettings &&
                        setFilterSettings((filterSettings) => ({
                            searchText: filterSettings.searchText,
                            filterFavorites: !filterSettings.filterFavorites,
                        }));
                });
            }}>
            <img
                src={
                    filterSettings.filterFavorites
                        ? 'filter-fill.svg'
                        : 'filter-line.svg'
                }
                alt="toggle-filter"
            />
        </button>
    );
};

export default FilterButton;
