/* eslint-disable no-restricted-syntax */
import React from "react";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

import { Link } from "react-router-dom";

import {
  genClassName,
  getKeysArrObj,
  getValuesArrObj,
} from "../../../utilities/helpersFun";
import { TableProps } from "../baseComponentsTypes";
import { formatThValue, TdCell, ThCell } from "./TableCells";
import style from "./Table.module.scss";

// Creates dynamic data table with action of edit and remove.
// customizes the table by Td and Th cells component.
function Table<T extends Record<string, any>>({
  dataArr,
  className,
  Td,
  Th,
  editPagePath,
  deleteItemFun,
  openEditModel,
  actions = { edit: true, delete: true },
}: TableProps<T> & {
  editPagePath: string;
  openEditModel?: (id: any) => void;
}) {
  const TH = Th || ThCell;
  const TD = Td || TdCell;
  const newDataArr = dataArr.map((obj: T) => {
    let newObj = {};

    // Check if the table is users table
    for (const key in obj) {
      if (key === "user_id" && obj.username) {
        newObj = { ...newObj, [key]: obj[key] };
      } else if (key !== "user_id") newObj = { ...newObj, [key]: obj[key] };
    }
    return newObj;
  });

  const keys = getKeysArrObj(newDataArr[0]).slice(1).map(formatThValue);

  return (
    <table className={genClassName(style.table_container, className)}>
      <thead>
        <tr>
          {keys.map((el, i) => (
            <TH key={i} value={el} />
          ))}
          {actions ? <TH key={keys.length + 1} value={"Action"} /> : <></>}
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

              {actions && (
                <td data-label="Actions">
                  <span className={`${style.actions}`}>
                    {actions?.edit && (
                      <Link
                        onClick={(e) => {
                          if (openEditModel) {
                            e.preventDefault();
                            openEditModel(values[0]);
                          }
                        }}
                        to={
                          openEditModel ? " " : `/${editPagePath}/${values[0]}`
                        }
                      >
                        <FaEdit className={style.iconEdit} />
                      </Link>
                    )}

                    {actions?.delete && (
                      <AiFillDelete
                        onClick={() =>
                          deleteItemFun && deleteItemFun(values[0])
                        }
                        className={style.deleteIcon}
                      />
                    )}
                  </span>
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
