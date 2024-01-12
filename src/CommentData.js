import React, { useState } from "react";
import { CommentList } from "./CommentList";
const IMG_URL =
  "https://cdn.iconscout.com/icon/free/png-256/free-down-arrow-1767499-1502567.png";

export const CommentData = ({ data, onReply }) => {
  const { id, name, text, replies } = data;
  const [replyText, setReplyText] = useState("");
  const [yourName, setYourName] = useState("");
  const [img, setImg] = useState(false);
  const handleReply = () => {
    if (replyText.trim() !== "") {
      const reply = {
        id: `${id}_${replies.length + 1}`,
        name: yourName,
        text: replyText,
        replies: [],
      };

      onReply(id, reply);
      setReplyText("");
      setYourName("");
      setImg(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        boxShadow: "revert",
        borderLeft: "2px solid grey",
        borderRadius: "5px",
        marginBottom: "5px",
        marginLeft: "10px",
        padding: "10px",
        gap: "10px",
      }}
    >
      <div style={{ paddingRight: "5px" }}>
        <div style={{ display: "flex" }}>
          <div>
            <p style={{ fontWeight: "900", gap: "10px" }}>Name :{name}</p>
            <p style={{ gap: "10px" }}>Comment: {text}</p>
          </div>
          <div>
            <img
              src={IMG_URL}
              width={50}
              height={50}
              alt="img-tab"
              onClick={(e) => setImg(!img)}
            />
          </div>
        </div>
      </div>
      <div>
        {img && (
          <div>
            <input
              type="text"
              placeholder="your name..."
              value={yourName}
              onChange={(e) => setYourName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <button onClick={handleReply}>Reply</button>
          </div>
        )}
      </div>
      {replies.length > 0 && (
        <div
          style={{
            marginLeft: "100px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CommentList data={replies} onReply={onReply} />
        </div>
      )}
    </div>
  );
};
