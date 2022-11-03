/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable camelcase */
import {
  MutationTrigger,
  UseMutation,
} from "@reduxjs/toolkit/dist/query/react/buildHooks";
import React, { useState } from "react";
import { UseFormSetValue } from "react-hook-form";

import { WithContext as ReactTags } from "react-tag-input";
import { MeetingAPI } from "../../../../redux/api/interfaceAPI";

import { uniqueObjArr } from "../../../../utilities/helpersFun";
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
  deleteParticipant,
}: {
  defaultTags?: Tag[];
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setTagResult: UseFormSetValue<MeetingAPI>;
  deleteParticipant: (id: string) => void;

  suggestions: Tag[];
}) {
  // const [tags, setTags] = React.useState<Tag[]>(defaultTags || []);
  // const checkIfTraineeIsInGroup = (tag: Tag) => {
  //   const [suggestTraineeID] = tag.id.split(",");
  //   const suggestionTrainee = tags.find((el) => {
  //     const [defaultTraineeID, participants_group_id] = el.id.split(",");
  //     return participants_group_id && suggestTraineeID === defaultTraineeID;
  //   });
  //   const participantsGroupId = suggestionTrainee?.id.split(",")[1];
  //   if (participantsGroupId)
  //     return { id: `${tag.id},${participantsGroupId}`, text: tag.text };
  //   return tag;
  // };
  // // The tags array which will send to the server.
  // const getParticipantValuesArr = (tags: Tag[]) => {
  //   const mapTag: { trainee_id: number }[] = tags.map((el) => {
  //     const [trainee_id, participants_group_id] = el.id.split(",");
  //     const obj = participants_group_id
  //       ? { participants_group_id: Number(participants_group_id) }
  //       : {};
  //     return {
  //       trainee_id: Number(trainee_id),
  //       ...obj,
  //     };
  //   });
  //   return uniqueObjArr(mapTag, "trainee_id");
  // };
  // // The tags array of the component.
  // const getUniqueTagsArr = (tags: Tag[]) => {
  //   const mapTag: Tag[] = tags.map((el) => {
  //     const [trainee_id] = el.id.split(",");
  //     return {
  //       ...el,
  //       id: String(trainee_id),
  //     };
  //   });
  //   return uniqueObjArr(mapTag, "id");
  // };
  // const handleDelete = (i: number) => {
  //   const tagsFilter = tags.filter((tag, index) => index !== i);
  //   setTags(tagsFilter);
  //   deleteParticipant(tags[i].id.split(",")[1]);
  //   setTagResult(
  //     "participants_groups_list_id",
  //     getParticipantValuesArr(tagsFilter)
  //   );
  // };
  // const handleOnChange = (value: string) => {
  //   setInputValue(value);
  // };
  // const handleAddition = (tag: Tag) => {
  //   const newTags = [...tags, checkIfTraineeIsInGroup(tag)];
  //   setTags(newTags);
  //   setTagResult(
  //     "participants_groups_list_id",
  //     getParticipantValuesArr(newTags)
  //   );
  // };
  // const handleDrag = (tag: Tag, currPos: number, newPos: number) => {
  //   const newTags = tags.slice();
  //   newTags.splice(currPos, 1);
  //   newTags.splice(newPos, 0, tag);
  //   setTags(newTags);
  //   setTagResult(
  //     "participants_groups_list_id",
  //     getParticipantValuesArr(newTags)
  //   );
  // };
  // return (
  //   <ReactTags
  //     classNames={{
  //       tag: style.label,
  //       selected: style.selected,
  //       tagInput: style.input,
  //       remove: style.remove,
  //       activeSuggestion: style.activeSuggestion,
  //       suggestions: style.suggestion,
  //     }}
  //     tags={getUniqueTagsArr(tags)}
  //     minQueryLength={0}
  //     delimiters={delimiters}
  //     suggestions={suggestions}
  //     allowDeleteFromEmptyInput={true}
  //     allowUnique={true}
  //     handleDelete={handleDelete}
  //     handleAddition={handleAddition}
  //     handleDrag={handleDrag}
  //     handleInputChange={handleOnChange}
  //     inputFieldPosition="top"
  //     placeholder="Enter Participants"
  //     autocomplete
  //   />
  // );
}
