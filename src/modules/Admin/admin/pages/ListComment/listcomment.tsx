"use client";

import { useEffect, useState } from "react";
import { ContentComment } from "../../components/Comment/ContentComment";
import { useArticles } from "../../hook/useArticles";
import { CommentResponseDto } from "../../types";
import { commentsService } from "../../services/comments.service";

export const ListComment = () => {
  const {
    articles,
    loading: articlesLoading,
    error: articlesError,
  } = useArticles();

  const [comments, setComments] = useState<CommentResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAllComments = async () => {
      if (!articles.length) {
        setComments([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const responses = await Promise.all(
          articles.map((article) => commentsService.getByArticleId(article.id)),
        );

        const allComments = responses.flat();

        setComments(allComments);
      } catch (error) {
        console.error("Get all comments error:", error);
        setError("خطا در دریافت لیست نظرات.");
      } finally {
        setLoading(false);
      }
    };

    if (!articlesLoading) {
      getAllComments();
    }
  }, [articles, articlesLoading]);

  return (
    <div className="flex w-full flex-1 min-h-0 bg-white">
      <ContentComment
        comments={comments}
        loading={articlesLoading || loading}
        error={articlesError || error}
      />
    </div>
  );
};
