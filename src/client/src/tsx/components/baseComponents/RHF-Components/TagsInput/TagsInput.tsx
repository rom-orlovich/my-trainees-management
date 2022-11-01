import React, { useState } from "react";

import { UseFormSetValue } from "react-hook-form";

import { WithContext as ReactTags } from "react-tag-input";
import { MeetingAPI } from "../../../../redux/api/interfaceAPI";
import style from "./TagsInput.module.scss";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];
export interface Tag {
  id: string;
  text: string;
}
export default function TagsInput({
  defaultTags,
  suggestions,
  setInputValue,
  setTagResult,
}: {
  defaultTags?: Tag[];
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setTagResult: UseFormSetValue<MeetingAPI>;
  suggestions: Tag[];
}) {
  const [tags, setTags] = React.useState<Tag[]>(defaultTags || []);

  const handleDelete = (i: number) => {
    setTags(tags.filter((tag, index) => index !== i));
    setTagResult(
      "participants_group",
      tags
        .filter((tag, index) => index !== i)
        .map((el) => ({ trainee_id: Number(el.id) }))
    );
  };

  const handleOnChange = (value: string) => {
    setInputValue(value);
  };

  const handleAddition = (tag: Tag) => {
    setTags([...tags, tag]);
    setTagResult(
      "participants_group",
      [...tags, tag].map((el) => ({ trainee_id: Number(el.id) }))
    );
  };

  const handleDrag = (tag: Tag, currPos: number, newPos: number) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
    setTagResult(
      "participants_group",
      newTags.map((el) => ({ trainee_id: Number(el.id) }))
    );
  };

  return (
    <ReactTags
      classNames={{
        tag: style.label,
        selected: style.selected,
        tagInput: style.input,
        remove: style.remove,
        activeSuggestion: style.activeSuggestion,
        suggestions: style.suggestion,
      }}
      tags={tags}
      minQueryLength={0}
      delimiters={delimiters}
      suggestions={suggestions}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      handleDrag={handleDrag}
      handleInputChange={handleOnChange}
      inputFieldPosition="top"
      placeholder="Enter Participants"
      autocomplete
    />
  );
}
