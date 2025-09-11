import { createContext } from "react";
import type { Article } from "../types/Article";

export interface LikedArticlesContextType {
  likedArticles: Article[];
  toggleLike: (article: Article) => void;
  isLiked: (id: number) => boolean;
  removeLikedArticle: (id: number) => void;
}

export const LikedArticlesContext = createContext<LikedArticlesContextType | undefined>(undefined);
