interface Articles {
  id: number;

  author: string;
  tags: string;
  types: string;
  title: string;
  description: string;
  content: string;
  
  lookNum: number;
  loveNum: number;
  
  picture: string;
  
  prevId: number;
  nextId: number;
  prevTitle: string;
  nextTitle: string;
  createTime: string;
  updateTime: string;
}

export default Articles;
