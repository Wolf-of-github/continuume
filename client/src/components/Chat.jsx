import React from 'react'

export default function Chat() {
  return (
    
          <div className="flex-1 grid grid-rows-10 grid-cols-1 bg-gray-800 h-screen"> 

              <div className="row-span-9 overflow-auto col-span-1 custom-scrollbar">
                    
                    <div className="flex flex-col mt-5 ml-2 mr-2">


                      <div className="flex justify-end mb-4">
                        <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                          Welcome to group everyone!
                        </div>
                      </div>
                      <div className="flex justify-start mb-4">
                        <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat at praesentium, aut ullam delectus odio error sit rem. Architecto nulla doloribus laborum illo rem enim dolor odio saepe, consequatur quas?
                        </div>
                      </div>
                      <div className="flex justify-end mb-4">
                        <div>
                          <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam, repudiandae.
                          </div>
                          <div className="mt-4 mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reiciendis!
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-start mb-4">
                        <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                          Happy holiday guys!
                        </div>
                      </div>
                      <div className="flex justify-end mb-4">
                        <div>
                          <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam, repudiandae.
                          </div>
                        </div>
                      </div>                      


                    </div>


                    <style jsx>{`
                      /* For Webkit browsers (Chrome, Safari) */
                      .custom-scrollbar::-webkit-scrollbar {
                        display: none;
                      }

                      /* For Firefox */
                      .custom-scrollbar {
                        scrollbar-width: none;
                      }

                      /* For Internet Explorer and Edge */
                      .custom-scrollbar {
                        -ms-overflow-style: none;
                      }
                    `}</style>
              </div>

              <div className="col-span-1 flex justify-center px-4">
                
                
                  <div className='w-full max-w-lg"'>
                    <input className="w-full px-4 py-2 rounded bg-gray-300" placeholder='Enter message' />
                  </div>                

              </div>

          </div>      
    
  )
}
