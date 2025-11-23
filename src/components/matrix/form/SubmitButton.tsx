import { useCallback, useContext, useEffect } from "react"
import { getMatrixData, getCompatilityMatrixData } from "../../../api"
import { IMatrixData } from "../MatrixData"
import { MatrixRequest } from "../../../JSONTypes"
import { MatrixRequestsContext } from "../../../contexts"
import { ContainedButton } from "../../styled"
import { CloseButton } from "../../history"

interface SubmitButtonProps {
  request?: MatrixRequest,
  compatibility: boolean,
  data?: IMatrixData,
  setData: (data?: IMatrixData) => void,
  beginWaiting: () => Animation | undefined
}

export function SubmitButton({request, compatibility, data, setData, beginWaiting}: SubmitButtonProps) {
  const {matrixRequest, setMatrixRequest} = useContext(MatrixRequestsContext)

  const onSubmit = useCallback((matrixRequest?: MatrixRequest) => {
    if (matrixRequest && matrixRequest?.date != '') {
      const firstAnimation = beginWaiting()
      let promise;
      if (compatibility) {
        promise = getCompatilityMatrixData(matrixRequest.date, matrixRequest.date2)
      } else {
        promise = getMatrixData(matrixRequest.date)
      }
      promise.then(([data]) => {
        firstAnimation?.finished.then(() => setTimeout(() => setData(data), 300))
      })
      setMatrixRequest(undefined)
    }
  }, [compatibility, setData, setMatrixRequest, beginWaiting])

  useEffect(() => {
    if (matrixRequest && (compatibility === (matrixRequest.gender === 'c'))) {
      onSubmit(matrixRequest)
    }
  }, [compatibility, matrixRequest, onSubmit])
  
  if (data) {
    return <CloseButton onClose={() => setData(undefined)} />
  }

  return <ContainedButton sx={{m: 2, width: '100%'}} onClick={() => onSubmit(request)}>Получить результат</ContainedButton>
}