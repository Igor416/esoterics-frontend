import { IMatrixData } from "../MatrixData";
import './CirclePositions.css'
import './NumberPositions.css'

interface MatrixForeground2Props {
  data: IMatrixData
}

export function MatrixForeground2({data}: MatrixForeground2Props) {
  return <>
    <div className="matrix-circle active size-lg position-a white" data-combination='a'>{data.combinations.a}</div>
    <div className="matrix-circle active size-lg position-b white" data-combination='b'>{data.combinations.b}</div>
    <div className="matrix-circle active size-lg position-с white" data-combination='c'>{data.combinations.c}</div>
    <div className="matrix-circle active size-lg position-d white" data-combination='d'>{data.combinations.d}</div>
    <div className="matrix-circle active size-lg position-e white" data-combination='e'>{data.combinations.e}</div>
    <div className="matrix-circle active size-lg position-f white" data-combination='f'>{data.combinations.f}</div>
    <div className="matrix-circle active size-lg position-g white" data-combination='g'>{data.combinations.g}</div>
    <div className="matrix-circle active size-lg position-h white" data-combination='h'>{data.combinations.h}</div>
    <div className="matrix-circle active size-lg position-z white" data-combination='z'>{data.combinations.z}</div>
  </>
}