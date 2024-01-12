import React, { useState } from "react";

import { CommentList } from "./CommentList";

const Comment = () => {
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");
  const [name, setName] = useState("");

  const handleNewComment = () => {
    if (newCommentText.trim() !== "") {
      const newComment = {
        id: `${comments.length + 1}`,
        name: name,
        text: newCommentText,
        replies: [],
      };
      setComments((prev) => [...prev, newComment]);
      //setComments((prev)=> prev.concat(newComment))
      //setCommenst((prev)=> prev.slice().concat(newComment))
      setNewCommentText("");
      setName("");
    }
  };

  const handleReply = (parentId, reply) => {
    const findParentComment = (commentsArray, targetId) => {
      for (const comment of commentsArray) {
        if (comment.id === targetId) {
          return comment;
        } else if (comment.replies && comment.replies.length > 0) {
          const foundInNested = findParentComment(comment.replies, targetId);
          if (foundInNested) {
            return foundInNested;
          }
        }
      }
      return null;
    };

    const parentComment = findParentComment(comments, parentId);

    // If the parent comment is found, add the reply to its replies array
    if (parentComment) {
      parentComment.replies = [...parentComment.replies, reply];

      // Update the comments array with the modified parent comment
      const updatedComments = comments.map((comment) =>
        comment.id === parentId
          ? { ...comment, replies: parentComment.replies }
          : comment
      );

      setComments(updatedComments);
    }
  };

  return (
    <div style={{ margin: "5px", padding: "2px" }}>
      <h1 style={{ fontWeight: "900" }}> comment :</h1>
      <div>
        <input
          type="text"
          placeholder="enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Add a new comment..."
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
        />
        <button onClick={handleNewComment}>Add Comment</button>
      </div>
      <CommentList data={comments} onReply={handleReply} />
    </div>
  );
};

export default Comment;
