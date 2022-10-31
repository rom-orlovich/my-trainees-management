import { useAppDispatch } from "../../../redux/hooks";
import { changeModelState } from "../../../redux/slices/apiSideEffectSlice";
import { genClassName } from "../../../utilities/helpersFun";
import { PropsBasic } from "../baseComponentsTypes";
import Card from "../Card/Card";

import Model from "./Model";
import style from "./ModelCard.module.scss";

function ModelCard({ children, className }: PropsBasic) {
  const dispatch = useAppDispatch();

  return (
    <Model>
      <div
        id={style.backdrop}
        onClick={() => {
          dispatch(changeModelState());
        }}
      />
      <Card className={genClassName(style.model_card, className)}>
        {children}
      </Card>
    </Model>
  );
}

export default ModelCard;
