// 🖌 TODO: Let's add the filter functionality
// I think you can do that on your own. Here are the requirements:
// - The Filter button should toggle the filterFavorites field in the context
// - The filter button should be disabled and grayed out when the transition is pending. Think back to the last exercise on how we can achieve this.
// 🖌 TODO: to make the filtering work, finally, check out NoteList.server.tsx
const FilterButtonClient: React.FC = () => {
    return (
        <button className="button favorite-button">
            <img
                src={null === 1 ? 'filter-fill.svg' : 'filter-line.svg'}
                alt="toggle-filter"
            />
        </button>
    );
};

export default FilterButtonClient;
