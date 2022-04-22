interface Articles {
  id: number;
  author: string;
  tags: string;
  types: string;
  lookNum: number;
  title: string;
  description: string;
  content: string;
  url: string;
  prevId: number;
  nextId: number;
  prevTitle: string;
  nextTitle: string;
  createTime: string;
  updateTime: string;
}

export default Articles;
