export interface Word {
  id: string;
  word: string;
  createdBy: string;
}

export const emptyWord: Word = {
  id: '-1',
  word: '',
  createdBy: ''
};
