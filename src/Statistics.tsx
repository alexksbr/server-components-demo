import {Note} from './types';
import {getNoteStatistics} from './notestatistics.utils';

// 🖌 TODO: We want to load the notes from the database and as this component won't be interactive as well, we can take the opportunity and save some bundle size.
// In order to solve both, you should make this component a server component.
const Statistics: React.FC = () => {

    // 🖌 TODO: lets get all nots. As we are within a server component, you can query the database directly. You can use something like db.query(some_sql, []).rows;
    // Of course, you can also use the fetch API. As we are on the server, this shouldn't take too much time 😉
    const notes: Note[] = [];

    /* 🖌 TODO: this function contains some dependencies. Go into the sources tab of the chrome dev tools and
        check that this unnecessary code (well, unnecessary for the client) is not added to the bundle!
    */
    const {
        avgTokensInNoteContent,
        avgSentencesInNoteContent,
        tokensMostUsed,
    } = getNoteStatistics(notes);

    // 🖌 TODO: maybe you want to draw something nice using the statistics you got?
    // You might also use the TokenStatistics component. Again, make sure it is not added to the bundle!
    return <></>;
};

export default Statistics;
