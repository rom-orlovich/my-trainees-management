/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
import React from "react";
import {
  FieldValue,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { useAppDispatch } from "../../../../redux/hooks";
import { openModel } from "../../../../redux/slices/modelControllerSlices/modelControllerSlice";
import {
  ModelDisplayContentOptions,
  ModelFormQuestionnaireModeDisplay,
} from "../../../../redux/slices/modelControllerSlices/modelControllerSliceTypes";

import { InputLabel } from "../InputLabel/InputLabel";
import style from "./TextFieldRHFOpenModel.module.scss";

function TextFieldOpenModel<T extends FieldValues, CP extends any>({
  modelName,
  register,
  nameField,
  placeholder,
  labelText,
  curParam,
}: {
  labelText: string;
  modelName: ModelDisplayContentOptions;
  nameField: Path<T>;
  register: UseFormRegister<T>;
  placeholder: string;
  curParam?: CP;
}) {
  const dispatch = useAppDispatch();

  return (
    <InputLabel
      TextAreaProps={{
        ...register(nameField),
        disabled: true,
        placeholder,
      }}
      inputIconProps={{
        IconEl: FaEdit,
        className: style.edit_icon,

        option: {
          link: "",
          onClick: (id: number) => {
            dispatch(
              openModel({
                displayContent: modelName,
                curParam: id,
              })
            );
          },
        },
      }}
      LabelProps={{
        labelText,
      }}
    >
      {/* <InputErrorMessage nameInput="Text" error={allergens} /> */}
    </InputLabel>
  );
}
export default TextFieldOpenModel;
