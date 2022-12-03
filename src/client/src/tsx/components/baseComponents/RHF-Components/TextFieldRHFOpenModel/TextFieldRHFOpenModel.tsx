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
import {
  ModelDisplayContentOptions,
  openModel,
} from "../../../../redux/slices/modelControllerSlice";
import { InputLabel } from "../InputLabel/InputLabel";
import style from "./TextFieldRHFOpenModel.module.scss";

function TextFieldOpenModel<T extends FieldValues>({
  modelName,
  register,
  nameField,
  placeholder,
  labelText,
}: {
  labelText: string;
  modelName: ModelDisplayContentOptions;
  nameField: Path<T>;
  register: UseFormRegister<T>;
  placeholder: string;
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
