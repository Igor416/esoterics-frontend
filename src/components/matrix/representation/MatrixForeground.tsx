import { IMatrixData } from "../MatrixData";
import './CirclePositions.css'
import './NumberPositions.css'

interface MatrixForegroundProps {
  data: IMatrixData
}

export function MatrixForeground({data}: MatrixForegroundProps) {
  return <>
    <div className="matrix-circle active size-lg position-a purple" data-combination='a'>{data.combinations.a}</div>
    <div className="matrix-circle active size-md position-a1 blue" data-combination='a1'>{data.combinations.a1}</div>
    <div className="matrix-circle active size-sm position-a2 cyan" data-combination='a2'>{data.combinations.a2}</div>
    <div className="matrix-circle active size-sm position-a3 green" data-combination='a3'>{data.combinations.a3}</div>

    <div className="matrix-circle active size-lg position-с purple" data-combination='c'>{data.combinations.c}</div>
    <div className="matrix-circle active size-md position-с1 blue" data-combination='c1'>{data.combinations.c1}</div>
    <div className="matrix-circle active size-sm position-с2 cyan" data-combination='c2'>{data.combinations.c2}</div>
    <div className="matrix-circle active size-sm position-с3 green" data-combination='c3'>{data.combinations.c3}</div>

    <div className="matrix-circle active size-lg position-e red" data-combination='e'>{data.combinations.e}</div>
    <div className="matrix-circle active size-md position-e1 white" data-combination='e1'>{data.combinations.e1}</div>
    <div className="matrix-circle active size-sm position-e2 orange" data-combination='e2'>{data.combinations.e2}</div>

    <div className="matrix-circle active size-lg position-g red" data-combination='g'>{data.combinations.g}</div>
    <div className="matrix-circle active size-md position-g1 white" data-combination='g1'>{data.combinations.g1}</div>
    <div className="matrix-circle active size-sm position-g2 orange" data-combination='g2'>{data.combinations.g2}</div>

    <div className="matrix-circle active size-lg position-z yellow" data-combination='z'>{data.combinations.z}</div>
    <div className="matrix-circle active size-md position-z1 white" data-combination='z1'>{data.combinations.z1}</div>
    <div className="matrix-circle active size-sm position-z2 white" data-combination='z2'>{data.combinations.z2}</div>

    <div className="matrix-circle active size-lg position-b white" data-combination='b'>{data.combinations.b}</div>
    <div className="matrix-circle active size-md position-b1 white" data-combination='b1'>{data.combinations.b1}</div>
    <div className="matrix-circle active size-sm position-b2 white" data-combination='b2'>{data.combinations.b2}</div>

    <div className="matrix-circle active size-lg position-d white" data-combination='d'>{data.combinations.d}</div>
    <div className="matrix-circle active size-md position-d1 white" data-combination='d1'>{data.combinations.d1}</div>
    <div className="matrix-circle active size-sm position-d2 white" data-combination='d2'>{data.combinations.d2}</div>

    <div className="matrix-circle active size-lg position-f white" data-combination='f'>{data.combinations.f}</div>
    <div className="matrix-circle active size-md position-f1 white" data-combination='f1'>{data.combinations.f1}</div>
    <div className="matrix-circle active size-sm position-f2 white" data-combination='f2'>{data.combinations.f2}</div>

    <div className="matrix-circle active size-lg position-h white" data-combination='h'>{data.combinations.h}</div>
    <div className="matrix-circle active size-sm position-h1 white" data-combination='h1'>{data.combinations.h1}</div>
    <div className="matrix-circle active size-md position-h2 white" data-combination='h2'>{data.combinations.h2}</div>

    <div className="matrix-circle active size-sm position-x white" data-combination='x'>{data.combinations.x}</div>
    <div className="matrix-circle active size-sm position-xe white" data-combination='xe'>{data.combinations.xe}</div>
    <div className="matrix-circle active size-sm position-xg white" data-combination='xg'>{data.combinations.xg}</div>

    {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(letter => 
      [1, 2, 3, 4, 5, 6, 7].map(number => 
        <div
          key={letter + number}
          className={`matrix-number ${number === 4 ? 'bold ' : ''}position-${letter}${number}`}
        >{data.numbers[letter + number]}</div>
      )
    )}
  </>
}