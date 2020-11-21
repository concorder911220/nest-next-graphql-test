import React from "react";

import { css } from "@emotion/core";
import { Button, Checkbox, Popup } from "semantic-ui-react";

import { useDeleteTaskContentMutation, useUpdateTaskContentMutation } from "@/graphql/generated";

export type TaskContentType = {
  id: string;
  checked: boolean;
  title: string;
  createdAt: number;
  updatedAt: number;
};

export const TaskContent = React.memo<{
  taskContent: TaskContentType;
  refetchTasks: () => Promise<unknown>;
}>(({ taskContent, refetchTasks }) => {
  const [updateTaskContent] = useUpdateTaskContentMutation();
  const [deleteTaskContent] = useDeleteTaskContentMutation();

  const { id, title, checked } = taskContent;

  const handleChangeChecked = async (checked: boolean) => {
    await updateTaskContent({ variables: { taskContent: { id, checked } } });
    await refetchTasks();
  };

  const handleDelete = async () => {
    await deleteTaskContent({ variables: { id } });
    await refetchTasks();
  };

  return (
    <div
      key={id}
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: white;
        border: 1px solid #d4d4d5;
        border-radius: 4px;
        padding: 4px 4px 4px 12px;
        margin-top: 8px;
      `}
    >
      <Checkbox checked={checked} onChange={(e, d) => handleChangeChecked(d.checked)} label={<label>{title}</label>} />
      <Popup position="bottom right" trigger={<Button icon="ellipsis horizontal" />}>
        <Button content="削除" color="red" onClick={handleDelete} css={css``} />
      </Popup>
    </div>
  );
});
