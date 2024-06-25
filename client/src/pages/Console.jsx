import React from 'react'
import Users from '../components/Users'

export default function Console() {
  return (
    <div>
      <div class="grid grid-rows-3 grid-cols-2 grid-flow-col h-screen">
        <div class="row-span-3 col-span-1">
          <Users/>
        </div>
        <div class=" bg-zinc-300">02</div>
        <div class="row-span-2 bg-amber-500">03</div>
      </div>
    </div>
  )
}
