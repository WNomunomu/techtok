import { useState, useEffect, ReactNode } from "react";
import { Heart } from "lucide-react";
import { LikedArticlesContext } from "./LikedArticlesContextDefinition";
import type { Article } from "../types/Article";

export function LikedArticlesProvider({ children }: { children: ReactNode }) {
    const [likedArticles, setLikedArticles] = useState<Article[]>(() => {
        const saved = localStorage.getItem("likedArticles");
        return saved ? JSON.parse(saved) : [];
    });

    const [showHeart, setShowHeart] = useState(false);

    useEffect(() => {
        localStorage.setItem("likedArticles", JSON.stringify(likedArticles));
    }, [likedArticles]);

    const toggleLike = (article: Article) => {
        setLikedArticles((prev) => {
            const alreadyLiked = prev.some((a) => a.id === article.id);
            if (alreadyLiked) {
                return prev.filter((a) => a.id !== article.id);
            } else {
                setShowHeart(true);
                setTimeout(() => setShowHeart(false), 800);
                return [...prev, article];
            }
        });
    };

    const isLiked = (id: number) => {
        return likedArticles.some((article) => article.id === id);
    };

    const removeLikedArticle = (id: number) => {
        setLikedArticles((prev) => prev.filter((a) => a.id !== id));
    };

    return (
        <LikedArticlesContext.Provider value={{ likedArticles, toggleLike, isLiked, removeLikedArticle }}>
            {children}
            {showHeart && (
                <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
                    <Heart size={200} strokeWidth={0} className="fill-red-500 animate-ping opacity-75"/>
                </div>
            )}
        </LikedArticlesContext.Provider>
    );
}
