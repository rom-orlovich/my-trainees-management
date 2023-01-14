/* eslint-disable @typescript-eslint/no-shadow */
import { UseQuery } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import React, {
  ChangeEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IoFilterCircle } from "react-icons/io5";

import { useDebounceHook } from "../../../../hooks/useDebounceHook";
import useHideUnFocusElement from "../../../../hooks/useHideUnFocusElement";

import { ResponseQueryAPI } from "../../../../redux/api/interfaceAPI";

import { getEntriesArrObj } from "../../../../utilities/helpersFun";
import { LiProps } from "../../baseComponentsTypes";

import ListObserver from "../../List/ListObserver";
import { LoadingSpinnerProps } from "../../LoadingSpinner/LoadingSpinner";
import InputIcon from "../InputIcon/InputIcon";
import { InputLabel, InputLabelProps } from "../InputLabel/InputLabel";
import style from "./AutocompleteInput.module.scss";
import AutocompleteLi, {
  createStrFromValuesOfChosenKeys,
} from "./AutocompleteLi";

export interface AddOption {
  link?: string;
  onClick?: () => void;
}
export interface IconOption {
  link?: string | ((id?: any) => string);
  onClick?: ((id?: any) => void) | (() => void);
}
export interface AutocompleteInputProps<T, O extends FieldValues = any> {
  className?: string;
  RHFProps?: Partial<ControllerRenderProps<O, Path<O>>>;
  loadingSpinnerResult?: Partial<LoadingSpinnerProps<T>>;
  InputLabelProps: InputLabelProps;
  liProps?: LiProps;
  keys?: (keyof T)[];
  id: keyof T;
  addOption?: IconOption;
  editOption?: IconOption;
  filterOptions?: IconOption;
  useGetData: UseQuery<any>;
  setSelectOptionValue?: React.Dispatch<React.SetStateAction<string[]>>;
  getCurClickLI?: (value: string[]) => void;
  children?: ReactNode;
  defaultValueID?: number;
  queriesOptions?: Record<string, any>;
  transformValue?: (keyValue: string[]) => unknown[];
}

function AutocompleteInput<T extends Record<string, any>>({
  className,
  InputLabelProps,
  liProps,
  defaultValueID,
  useGetData,
  keys,
  id,
  editOption,
  setSelectOptionValue,
  children,
  addOption,
  RHFProps,
  filterOptions,
  queriesOptions,
  getCurClickLI,
  transformValue,
}: AutocompleteInputProps<T>) {
  const [page, setPage] = useState(1);
  // The first element in array is the id of the option. The sec element is the input value.
  const [inputValueName, setInputValue] = useState(["", ""]);
  // Debounce the input value change.
  const firstRender = useRef(true);
  const debounce = useDebounceHook(inputValueName, 500);
  const autoCompleteContainerRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useHideUnFocusElement(autoCompleteContainerRef);
  const [lastDataState, setLastData] = useState<any[]>([]);

  const defaultIDQuery =
    firstRender.current && defaultValueID ? { id: defaultValueID } : {};
  const { data } = useGetData({
    page,
    mainName: debounce[1],
    ...defaultIDQuery,
    ...queriesOptions,
  });

  const Data = data as ResponseQueryAPI<T> | undefined;

  useEffect(() => {
    // Set default value by given id, when the data is defined and the id
    // is exist in the data array, update the input value.
    if (Data && defaultValueID) {
      // In order prevent infinite loop.
      if (firstRender.current) {
        firstRender.current = false;
        const objData = Data.data[0];
        if (objData) {
          // Create string of values from chosen keys.
          const strValues = createStrFromValuesOfChosenKeys(
            objData,
            keys || []
          );
          setInputValue([`${defaultValueID}`, strValues]);
        }
      }
    }
  }, [Data, defaultValueID, id, keys]);

  useEffect(() => {
    // The parent element's access to the value of the Autocomplete component.
    setSelectOptionValue && setSelectOptionValue(debounce);
    // React hook form Autocomplete component need only the id of the option.
    const debounceRes = transformValue ? transformValue(debounce) : debounce;
    debounceRes[0] && RHFProps?.onChange && RHFProps?.onChange(debounceRes[0]);
  }, [debounce, RHFProps, setSelectOptionValue]);

  // Handle the input change value, open the options,
  // set page to first page and reset the data array.
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLastData([]);
    setPage(1);
    setInputValue(["", e.target.value]);
  };

  // Handle click on option and set the value of that option in the input.
  const handleClickLi = (obj: Record<string, any>) => {
    const keyValue = getEntriesArrObj(obj)[0];

    setPage(1);
    setInputValue(keyValue);
    getCurClickLI && getCurClickLI(keyValue);
  };

  // Handles the scrolling event of the autocomplete input's options.
  // If there is next page, add the new result to the data array,
  // and update the page number to the next page.
  const listObserverFun = () => {
    if (Data?.next) {
      setLastData((pre) => [...pre, ...Data.data]);
      setPage((pre) => pre + 1);
    }
  };

  return (
    <span
      className={`${style.autocomplete_container} ${className}`}
      ref={autoCompleteContainerRef}
    >
      <InputLabel
        {...InputLabelProps}
        InputProps={{
          ...InputLabelProps.InputProps,
          autoComplete: "off",
          value: inputValueName[1].slice(0, 25),
          onChange: handleInputChange,
        }}
      />

      {isVisible && (
        <ListObserver<T>
          fn={() => listObserverFun()}
          listProps={{
            className: style.list_res,
            LI: (props) => (
              <AutocompleteLi<T>
                editOption={editOption}
                {...props.liProps}
                {...liProps}
                handleOnClick={handleClickLi}
                keys={keys || []}
                props={props}
                id={id}
              />
            ),
            dataArr: Data ? [...lastDataState, ...Data.data] : lastDataState,
          }}
        />
      )}
      <InputIcon IconEl={AiOutlinePlusCircle} option={addOption} />
      <InputIcon IconEl={IoFilterCircle} option={filterOptions} />

      {children}
    </span>
  );
}

export default AutocompleteInput;
