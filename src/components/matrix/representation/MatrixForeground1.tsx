import { IMatrixData } from "../MatrixData";
import './CirclePositions.css'
import './NumberPositions.css'

interface MatrixForeground1Props {
  data: IMatrixData
}

export function MatrixForeground1({data}: MatrixForeground1Props) {
  return <>
    <div className="matrix-circle active size-lg position-a white" data-combination='a'>{data.combinations.a}</div>
    <div className="matrix-circle active size-md position-a1 white" data-combination='a1'>{data.combinations.a1}</div>
    <div className="matrix-circle active size-sm position-a2 white" data-combination='a2'>{data.combinations.a2}</div>

    <div className="matrix-circle active size-lg position-с white" data-combination='c'>{data.combinations.c}</div>
    <div className="matrix-circle active size-md position-с1 white" data-combination='c1'>{data.combinations.c1}</div>
    <div className="matrix-circle active size-sm position-с2 white" data-combination='c2'>{data.combinations.c2}</div>

    <div className="matrix-circle active size-lg position-e white" data-combination='e'>{data.combinations.e}</div>
    <div className="matrix-circle active size-md position-e1 white" data-combination='e1'>{data.combinations.e1}</div>
    <div className="matrix-circle active size-sm position-e2 white" data-combination='e2'>{data.combinations.e2}</div>

    <div className="matrix-circle active size-lg position-g white" data-combination='g'>{data.combinations.g}</div>
    <div className="matrix-circle active size-md position-g1 white" data-combination='g1'>{data.combinations.g1}</div>
    <div className="matrix-circle active size-sm position-g2 white" data-combination='g2'>{data.combinations.g2}</div>

    <div className="matrix-circle active size-lg position-z white" data-combination='z'>{data.combinations.z}</div>

    <div className="matrix-circle active size-lg position-b white" data-combination='b'>{data.combinations.b}</div>
    <div className="matrix-circle active size-lg position-d white" data-combination='d'>{data.combinations.d}</div>
    <div className="matrix-circle active size-lg position-f white" data-combination='f'>{data.combinations.f}</div>
    <div className="matrix-circle active size-lg position-h white" data-combination='h'>{data.combinations.h}</div>

    <div className="matrix-circle active size-sm position-x white" data-combination='x'>{data.combinations.x}</div>
    <div className="matrix-circle active size-sm position-xe white" data-combination='xe'>{data.combinations.xe}</div>
    <div className="matrix-circle active size-sm position-xg white" data-combination='xg'>{data.combinations.xg}</div>
  </>
}