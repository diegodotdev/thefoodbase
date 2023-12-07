export interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  ingredients: string[];
  instructions: string[];
  userId: string;
  username: string;
  avatar: string;
}

export interface Cook {
  id: number;
  username: string;
  userId: string;
  avatar: string;
}
