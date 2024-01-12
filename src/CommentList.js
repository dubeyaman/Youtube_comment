import { CommentData } from "./CommentData";

export const CommentList = ({ data, onReply }) => {
  return data.map((comment) => (
    <div key={comment.id} style={{ padding: "10px" }}>
      <CommentData key={comment.id} data={comment} onReply={onReply} />
    </div>
  ));
};
