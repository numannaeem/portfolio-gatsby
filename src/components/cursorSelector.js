import React, { useContext } from 'react'
import { CursorContext } from './layout'

const CursorSelector = () => {
  const { cursor, setCursor } = useContext(CursorContext)

  let options = ['dog', 'monkey', 'lion', 'bee']

  return (
    <div className='hidden cursor-default md:flex flex-col group items-center self-end mt-3 mr-3'>
      <div className='flex'>
        {options.map(option => (
          <div
            className={`${option === cursor &&
              'bg-gray-700'} transition-colors rounded-md p-1 cursor-pointer m-1`}
          >
            <img
              alt={option}
              title={option}
              onClick={() => setCursor(option)}
              height={32}
              width={32}
              src={`svgs/${option}.svg`}
            />
          </div>
        ))}
      </div>
      <p className='text-yellow-200 transition opacity-0 group-hover:opacity-90'>
        choose your cursor!
      </p>
    </div>
  )
}

export default CursorSelector
