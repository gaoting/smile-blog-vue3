interface Articles {
  id: number;

  author: string;
  tags: number;
  types: string;
  title: string;
  description: string;
  content: string;

  lookNum: number;
  loveNum: number;

  picture: string;

  preId: number;
  nextId: number;
  preTitle: string;
  nextTitle: string;
  createTime: string;
  updateTime: string;
}

export default Articles;
