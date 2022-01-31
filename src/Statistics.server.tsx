import {db} from './db.server';
import {Note} from './types';
import * as Fin from "finnlp";
import _ from 'lodash';


const Statistics: React.FC = () => {
  const query = `select * from notes order by id desc`;
  const notes: Note[] = db.query(query, []).rows;

  const titles = notes.map((note) => note.title).join();
  const contents = notes.map((note) => note.body).join();

  const titlesProcessed = new Fin.Run(titles);
  const contentsProcessed = new Fin.Run(contents);

  const avgSentencesInNoteContent = contentsProcessed.sentences.length / notes.length;
  const avgTokensInNoteContent = _.sum(contentsProcessed.sentences.map((sentence) => sentence.tokens.length)) / notes.length;

  const tokensInTitles = titlesProcessed.sentences.map((sentence) => sentence.tokens).join().split(',');
  const tokenUsageTitles = Array.from(new Set(tokensInTitles)).map(a => ({token: a, num: tokensInTitles.filter(f => f === a).length}));

  const tokensInContents = contentsProcessed.sentences.map((sentence) => sentence.tokens).join().split(',');
  const tokenUsageContents = Array.from(new Set(tokensInContents)).map(a => ({token: a, num: tokensInContents.filter(f => f === a).length}));

  const tokensMostUsed = tokenUsageTitles.concat(tokenUsageContents).sort((a, b) => b.num - a.num).slice(0, 3);

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
            <div style={{marginLeft: '16px'}}>
              {tokensMostUsed.map((item) => <div key={item.token}><b>{item.token} : {item.num}</b></div>)}
            </div>
          </div>
        </span>
      </div>
    </div>
  )
}

export default Statistics;