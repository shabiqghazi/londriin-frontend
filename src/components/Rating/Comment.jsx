import React from "react";

const Comment = ({name, rate, comment}) => {
  return (
    <>
      <div className="">
        <h6>{name}</h6>
        <p>{rate}/5</p>
        <p>
          {comment}
        </p>
      </div>
      <hr />
    </>
  );
};

export default Comment;
