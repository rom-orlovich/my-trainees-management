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
import { Link } from "react-router-dom";

import { useDebounceHook } from "../../../../hooks/useDebounceHook";
import useHideUnFocusElement from "../../../../hooks/useHideUnFocusElement";

import { ResponseQueryAPI } from "../../../../redux/api/interfaceAPI";

import { getEntriesArrObj } from "../../../../utilities/helpersFun";
import { LiProps } from "../../baseComponentsTypes";

import ListObserver from "../../List/ListObserver";
import LoadingSpinner, { LoadingSpinnerProps } from "../../LoadingSpinner";
import { InputLabel, InputLabelProps } from "../InputLabel/InputLabel";
import style from "./AutocompleteInput.module.scss";
import AutocompleteLi, {
  createStrFromValuesOfChosenKeys,
} from "./AutocompleteLi";

export interface AutocompleteInputProps<T, O extends FieldValues = any> {
  className?: string;
  RHFProps?: Partial<ControllerRenderProps<O, Path<O>>>;
  loadingSpinnerResult?: Partial<LoadingSpinnerProps<T>>;
  InputLabelProps: InputLabelProps;
  liProps?: LiProps;
  keys?: (keyof T)[];
  id: keyof T;

  addOption?: {
    link: string;
    saveState?: () => void;
  };
  externalInputValueOnChange?: React.Dispatch<React.SetStateAction<string>>;
  useGetData: UseQuery<any>;
  setSelectOptionValue?: React.Dispatch<React.SetStateAction<string[]>>;
  children?: ReactNode;
  defaultValueID?: number;
}

function AutocompleteInput<T extends Record<string, any>>({
  className,
  InputLabelProps,
  liProps,
  loadingSpinnerResult,
  defaultValueID,
  useGetData,
  keys,
  id,
  setSelectOptionValue,
  children,
  addOption,
  RHFProps,
}: // externalInputValueOnChange,
AutocompleteInputProps<T>) {
  const [page, setPage] = useState(1);

  const [inputValueName, setInputValue] = useState(["", ""]);

  const debounce = useDebounceHook(inputValueName, 500);

  const autoCompleteContainerRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useHideUnFocusElement(autoCompleteContainerRef);

  const [lastDataState, setLastData] = useState<any[]>([]);
  const { data, isError, isFetching, isLoading } = useGetData({
    page: page,
    mainName: debounce[1],
  });
  const Data = data as ResponseQueryAPI<T> | undefined;
  const firstRender = useRef(true);

  useEffect(() => {
    setSelectOptionValue && setSelectOptionValue(debounce);
    if (debounce[0]) RHFProps?.onChange && RHFProps?.onChange(debounce[0]);
  }, [debounce, RHFProps, setSelectOptionValue]);

  // Set default value by given id , when the data is defined and the id
  // is exist in the data array, update the input value.
  useEffect(() => {
    if (Data)
      if (firstRender.current) {
        firstRender.current = false;
        if (defaultValueID) {
          const objData = Data.data.find((el) => el[id] === defaultValueID);
          if (objData) {
            // Create string of values from chosen keys.
            const strValues = createStrFromValuesOfChosenKeys(
              objData,
              keys || []
            );
            setInputValue(["", strValues]);
          }
        }
      }
  }, [Data, defaultValueID, id, keys]);
  // Handle the input change value ,open the option,
  // set page to first page and reset the data array.
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPage(1);
    setInputValue(["", e.target.value]);
    setLastData([]);
  };
  // Opens the autocomplete input's options.
  const handleClickInput = () => {
    setPage(1);
    setLastData([]);
  };
  // Handle click on option and set the value of that option in the input.
  const handleClickLi = (obj: Record<string, any>) => {
    const keyValue = getEntriesArrObj(obj)[0];
    setInputValue(keyValue);
  };

  // Handles the scrolling event of the autocomplete input's options.
  // If there is next page , add the new result to the data array,
  // and update the page number to the next page.
  const listObserverFun = <T,>(data: ResponseQueryAPI<T>) => {
    if (data.next) {
      setLastData((pre) => [...pre, ...data.data]);
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
          onClick: handleClickInput,
        }}
      ></InputLabel>

      {
        <LoadingSpinner
          {...loadingSpinnerResult}
          stateData={{ data: Data, isError, isFetching, isLoading }}
        >
          {(data) => {
            return (
              isVisible && (
                <ListObserver<T>
                  fn={() => listObserverFun(data)}
                  listProps={{
                    className: style.list_res,
                    LI: (props) => {
                      return (
                        <AutocompleteLi<T>
                          {...props.liProps}
                          {...liProps}
                          handleOnClick={handleClickLi}
                          keys={keys || []}
                          props={props}
                          id={id}
                        />
                      );
                    },
                    dataArr:
                      lastDataState.length === 0 //If the user haven't typed yet.
                        ? data.data
                        : [...lastDataState, ...data.data],
                  }}
                />
              )
            );
          }}
        </LoadingSpinner>
      }
      <span className={style.select_plus_button}>
        {addOption ? (
          <Link to={addOption.link}>{<AiOutlinePlusCircle />} </Link>
        ) : (
          <> </>
        )}
      </span>
      {children}
    </span>
  );
}

export default AutocompleteInput;
