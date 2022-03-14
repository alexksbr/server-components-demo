import {useLocation} from './LocationContext.client';
import {useTransition} from 'react';
import {useSidebarLocation} from './SidebarLocationContext.client';

const FilterButton: React.FC = () => {
    const {sidebarLocation, setSidebarLocation} = useSidebarLocation();
    const [isPending, startTransition] = useTransition();

    return (
        <button
            className="button favorite-button"
            disabled={isPending}
            onClick={() => {
                startTransition(() => {
                    setSidebarLocation &&
                        setSidebarLocation((loc) => ({
                            searchText: loc.searchText,
                            filterFavorites: !loc.filterFavorites,
                        }));
                });
            }}>
            <img
                src={
                    sidebarLocation.filterFavorites
                        ? 'filter-fill.svg'
                        : 'filter-line.svg'
                }
                alt="toggle-filter"
            />
        </button>
    );
};

export default FilterButton;
