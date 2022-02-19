import {Note} from './types';
import * as Fin from 'finnlp';
import _ from 'lodash';

export type TokenUsage = {
  num: number;
  token: string;
}
export type NotestatisticsUtils = {
  avgSentencesInNoteContent: number;
  avgTokensInNoteContent: number;
  tokensMostUsed: TokenUsage[]
}

export const getNoteStatistics = (notes: Note[] = []): NotestatisticsUtils => {
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

  return {avgSentencesInNoteContent, avgTokensInNoteContent, tokensMostUsed};
}