import { useAppDispatch } from "../../../redux/hooks";
import { closeModel } from "../../../redux/slices/modelControllerSlices/modelControllerSlice";
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
          dispatch(closeModel());
        }}
      />
      <Card className={genClassName(style.model_card, className)}>
        {children}
      </Card>
    </Model>
  );
}

export default ModelCard;
