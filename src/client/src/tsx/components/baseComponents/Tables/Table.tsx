import React from "react";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

import { getKeysArrObj, getValuesArrObj } from "../../../utilities/helpersFun";
import { TableProps } from "../baseComponentsTypes";
import { formatThValue, TdCell, ThCell } from "./TableCells";
import style from "./Table.module.scss";
import { Link } from "react-router-dom";

// Creates dynamic data table with action of edit and remove.
// customizes the table by Td and Th cells component.
function Table<T extends Record<string, any>>({
  dataArr,
  className,
  Td,
  Th,
  mainRoute,
  deleteItemFun,
}: TableProps<T> & { mainRoute: string }) {
  const TH = Th ? Th : ThCell;
  const TD = Td ? Td : TdCell;
  const newDataArr = dataArr.map((obj: T) => {
    let newObj = {};

    console.log(obj);
    for (let key in obj) {
      if (key === "user_id" && obj["username"]) {
        newObj = { ...newObj, [key]: obj[key] };
      } else if (key !== "user_id") newObj = { ...newObj, [key]: obj[key] };
    }
    return newObj;
  });

  const keys = getKeysArrObj(newDataArr[0])
    .slice(1)
    .map(formatThValue)
    .concat("Actions");

  return (
    <table className={`${className || ""} `}>
      <thead>
        <tr>
          {keys.map((el, i) => {
            return <TH key={i} value={el}></TH>;
          })}
        </tr>
      </thead>
      <tbody>
        {newDataArr.map((obj, row) => {
          const values = getValuesArrObj(obj);
          const valuesWithOutID = values.slice(1);

          return (
            <tr key={`${values[0]}${row}`}>
              {valuesWithOutID.map((value, col) => (
                <TD fitTh={keys[col]} key={`${value}${col}`} value={value} />
              ))}
              <td data-label="Actions">
                <span className={`${style.actions}`}>
                  {
                    <Link to={`/${mainRoute}/${values[0]}`}>
                      <FaEdit className={style.iconEdit} />
                    </Link>
                  }
                  {deleteItemFun && (
                    <AiFillDelete
                      onClick={() => deleteItemFun && deleteItemFun(values[0])}
                      className={style.deleteIcon}
                    ></AiFillDelete>
                  )}
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
