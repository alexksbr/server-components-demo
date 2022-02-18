import {db} from './db.server';
import {Note} from './types';
import {getNoteStatistics} from './notestatistics.utils';
import TokenStatistics from './TokenStatistics';

const Statistics: React.FC = () => {
  const query = `select * from notes order by id desc`;
  const notes: Note[] = db.query(query, []).rows;

  const {avgTokensInNoteContent, avgSentencesInNoteContent, tokensMostUsed} = getNoteStatistics(notes);

  return (
    <div>
      <div className="statistics-header">
        <h1 className="note-title">Note Statistics</h1>
      </div>
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          <div>
            Average sentences in note content: <b>{avgSentencesInNoteContent}</b>
          </div>
          <div>
            Average tokens in note content: <b>{avgTokensInNoteContent}</b>
          </div>
          <div>
            Tokens used most:
            <TokenStatistics tokensMostUsed={tokensMostUsed} />
          </div>
        </span>
      </div>
    </div>
  )
}

export default Statistics;