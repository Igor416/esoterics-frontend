import { useContext } from "react";
import { RemoveCircleOutline } from "@mui/icons-material";
import { ActionButton } from "./ActionButton";
import { deleteMatrixRequest } from "../../../api";
import { MatrixRequest, TokenPair } from "../../../JSONTypes";
import { TokenContext } from "../../../contexts";

interface DeleteButtonProps {
  item: MatrixRequest,
  handleResp: ([resp, newTokenPair]: [MatrixRequest[], TokenPair]) => void
}

export function DeleteButton({item, handleResp}: DeleteButtonProps) {
  const {tokenPair} = useContext(TokenContext)

  return <ActionButton
    Icon={RemoveCircleOutline}
    onClick={() => deleteMatrixRequest(item.id!, tokenPair).then(handleResp)}
  />
}