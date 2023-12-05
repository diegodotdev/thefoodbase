export interface Recipe {
  category: string;
  description: string;
  id: number;
  image: string;
  ingredients: string[];
  instructions: string[];
  title: string;
  userId: string;
  user: {
    id: string;
    name: string;
    image: string;
  };
}

export interface Cook {
  id: string;
  name: string;
  image: string;
}

export interface User {
  id: string;
  name: string;
  image: string;
  recipes: [
    {
      id: number;
      title: string;
      description: string;
      image: string;
      category: string;
      ingredients: string[];
      instructions: string[];
    }
  ];
}
