"use client";

import { ContentComment } from "../../components/Comment/ContentComment";
import { useComments } from "../../hook/useComments";

export const ListComment = () => {
  const { comments, loading, error } = useComments();

  return (
    <div className="flex w-full flex-1 min-h-0 bg-white">
      <ContentComment comments={comments} loading={loading} error={error} />
    </div>
  );
};
