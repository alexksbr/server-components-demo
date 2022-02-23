import React from 'react';

const ShowStatisticsButton: React.FC = () => {
    // 🖌 TODO: you'll probably need some hooks for updating the app state (useLocation) and get some transition effects (useTransition)

    /* 🖌 TODO: After adding the hooks, try if everything works. Surprise: it doesn't! 😱
        Why is that? What kind of component is this? Where is this component rendered if it stays like this? How can we fix that?
     */

    /* 🖌 TODO: Within the button click handler, use a transition and change the app state using the useLocation hook in order to show the statistics page.
        ⚠️ But wait, the app state knows nothing about our new intention to distinguish between the app state where we do not show some statistics and where we do... 🤔
        You better check out the ILocation interface within types.ts!
    */
    /* Also, it would be great if the button gets disabled and greyed out while the status change is happening.
        The useTransition hook returns a boolean that should be helpful 😉
        For styling the disabled state you can use something like style={{opacity: disabled ? '0.5' : '1.0'}} 🤓
     */
    return (
        <button className="button statistics-button">Show Statistics</button>
    );
};

export default ShowStatisticsButton;
