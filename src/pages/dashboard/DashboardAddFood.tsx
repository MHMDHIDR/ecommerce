import { useState, useEffect, useRef, useContext, ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import { FileUploadContext } from '../../contexts/FileUploadContext'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import useAxios from '../../hooks/useAxios'
import Modal from '../../components/Modal/Modal'
import { Success, Error, Loading } from '../../components/Icons/Status'
import FileUpload from '../../components/FileUpload'
import { createSlug } from '../../utils/functions/slug'
import goTo from '../../utils/functions/goTo'
import scrollToView from '../../utils/functions/scrollToView'

const AddProducts = () => {
  useDocumentTitle('إضافة منتجات')

  useEffect(() => {
    scrollToView()
  }, [])

  //Form States
  const [foodName, setFoodName] = useState('')
  const [foodPrice, setFoodPrice] = useState('')
  const [category, setCategory] = useState([])
  const [foodDesc, setFoodDesc] = useState('')

  const [addFoodStatus, setAddFoodStatus] = useState()
  const [addFoodMessage, setAddFoodMessage] = useState()
  const [categoryList, setCategoryList] = useState([])
  const [toppings, setToppings] = useState([])

  //Contexts
  const { file } = useContext(FileUploadContext)

  //Form errors messages
  const ImgErr = useRef<HTMLSpanElement>(null)
  const foodNameErr = useRef<HTMLSpanElement>(null)
  const priceErr = useRef<HTMLSpanElement>(null)
  const descErr = useRef<HTMLSpanElement>(null)
  const formMsg = useRef<HTMLDivElement>(null)

  const modalLoading = document.querySelector('#modal')

  //fetching categories
  const { response } = useAxios({ url: '/settings' })

  useEffect(() => {
    if (response !== null) {
      setCategoryList(response?.CategoryList)
    }
  }, [response])

  // const handleAddFood = async (e: { key?: string; preventDefault: () => void }) => {
  //   if (e.key === 'Enter') {
  //     //don't submit the form if Enter is pressed
  //     e.preventDefault()
  //   } else {
  //     e.preventDefault()

  //     //using FormData to send constructed data
  //     const formData = new FormData()
  //     formData.append('foodName', foodName)
  //     formData.append('foodPrice', foodPrice)
  //     formData.append('category', category[0])
  //     formData.append('foodDesc', foodDesc)
  //     formData.append('foodToppings', JSON.stringify(toppings))

  //     file.map(foodImg => {
  //       console.log(foodImg)
  //       formData.append('foodImg', foodImg)
  //     })

  //       //show waiting modal
  //       modalLoading.classList.remove('hidden')

  //       try {
  //         const response = await Axios.post(`${API_URL}/foods`, formData)

  //         const { foodAdded, message } = response.data
  //         setAddFoodStatus(foodAdded)
  //         setAddFoodMessage(message)
  //         //Remove waiting modal
  //         setTimeout(() => {
  //           modalLoading.classList.add('hidden')
  //         }, 300)
  //       } catch (err) {
  //         formMsg.current.textContent = `عفواً حدث خطأ ما 😥 ${err}`
  //       }

  //   }
  // }

  // const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
  //   const { name, value } = e.target
  //   const newToppings = [...toppings]
  //   newToppings[index][name] = value
  //   setToppings(newToppings)
  // }

  // const handleAddClick = () => {
  //   setToppings([...toppings, {}])
  // }

  // const handleRemoveClick = index => {
  //   const list = [...toppings]
  //   list.splice(index, 1)
  //   setToppings(list)
  // }

  return (
    <>
      {addFoodStatus === 1 ? (
        <Modal
          status={Success}
          msg={`تم إضافة ${category[1]} بنجاح 😄 الرجاء الانتظار ليتم تحويلك لقائمة الوجبات والمشروبات`}
          redirectLink='menu'
          redirectTime={3000}
        />
      ) : addFoodStatus === 0 ? (
        <Modal status={Error} msg={addFoodMessage} />
      ) : null}

      <section className='py-12 my-8 dashboard'>
        <div className='container mx-auto'>
          <h3 className='mx-0 mt-4 mb-12 text-2xl text-center md:text-3xl'>إضافة وجبة</h3>
          <div>
            <div className='food'>
              {/* Show Modal Loading when submitting form */}
              <Modal
                status={Loading}
                modalHidden='hidden'
                classes='text-blue-500 text-center'
                msg='الرجاء الانتظار...'
              />

              <form
                method='POST'
                className='form'
                encType='multipart/form-data'
                // onSubmit={e => handleAddFood(e)}
              >
                <div className='flex flex-col items-center justify-center gap-4 mb-8 sm:justify-between'>
                  <FileUpload
                    data={{
                      defaultImg: [
                        {
                          foodImgDisplayName: 'food',
                          foodImgDisplayPath: 'https://source.unsplash.com/random?food'
                        }
                      ],
                      foodName: 'Food, Drink, Sweet'
                    }}
                  />

                  <span
                    className='inline-block md:text-lg text-red-600 dark:text-red-400 font-[600] pt-2 px-1'
                    ref={ImgErr}
                  ></span>
                </div>

                <label htmlFor='foodName' className='form__group'>
                  <input
                    type='text'
                    id='foodName'
                    className='form__input'
                    autoFocus
                    required
                    onChange={e => setFoodName(createSlug(e.target.value.trim()))}
                  />
                  <span className='form__label'>اسم الوجبة أو المشروب</span>
                  <span
                    className='inline-block md:text-lg text-red-600 dark:text-red-400 font-[600] pt-2 px-1'
                    ref={foodNameErr}
                  ></span>
                </label>

                <label htmlFor='foodPrice' className='form__group'>
                  <input
                    type='number'
                    id='foodPrice'
                    className='form__input'
                    min='5'
                    max='500'
                    required
                    onChange={e => setFoodPrice(e.target.value.trim())}
                  />
                  <span className='form__label'>السعر (ر.ق)</span>
                  <span
                    className='inline-block md:text-lg text-red-600 dark:text-red-400 font-[600] pt-2 px-1'
                    ref={priceErr}
                  ></span>
                </label>

                <label htmlFor='category' className='form__group'>
                  <select
                    id='category'
                    className='form__input'
                    required
                    // onChange={e =>
                    //   setCategory([
                    //     e.target.value.trim(),
                    //     e.target.options[e.target.selectedIndex].textContent
                    //   ])
                    // }
                  >
                    <option value=''>اختر التصنيف</option>
                    {categoryList?.map((category, idx) => (
                      <option key={idx} value={category[0]}>
                        {category[1]}
                      </option>
                    ))}
                  </select>
                  <span className='form__label active'>التصنيف</span>
                </label>

                <label htmlFor='foodDescription' className='form__group'>
                  <textarea
                    name='foodDescription'
                    id='foodDescription'
                    minLength={10}
                    maxLength={300}
                    className='form__input'
                    required
                    onChange={e => setFoodDesc(e.target.value.trim())}
                  ></textarea>
                  <span className='form__label'>وصف الوجبة أو المشروب</span>
                  <span
                    className='inline-block md:text-lg text-red-600 dark:text-red-400 font-[600] pt-2 px-1'
                    ref={descErr}
                  ></span>
                </label>

                <div className='mx-0 mt-4 mb-6 text-center'>
                  <h3 className='mb-10 text-xl'>الإضافات - Toppings (اختياري)</h3>
                  <div className='flex justify-around'>
                    <span className='text-xl'>الإضافة</span>
                    <span className='text-xl'>السعر (ر.ق)</span>
                  </div>
                </div>
                {toppings?.map(({ toppingName, toppingPrice }, idx) => (
                  <label className='block space-y-2' key={idx}>
                    <div className='flex gap-4 justify-evenly'>
                      <input
                        type='text'
                        id='toppingName'
                        min='5'
                        max='500'
                        className='w-2/4 p-3 text-xl text-gray-700 bg-transparent border-2 border-gray-500 border-solid rounded-lg outline-none focus-within:border-orange-500 dark:focus-within:border-gray-400 dark:text-gray-200'
                        dir='auto'
                        name='toppingName'
                        defaultValue={toppingName}
                        // onChange={e => handleInputChange(e, idx)}
                      />
                      <input
                        type='number'
                        id='toppingPrice'
                        min='1'
                        max='500'
                        className='w-2/4 p-3 text-xl text-gray-700 bg-transparent border-2 border-gray-500 border-solid rounded-lg outline-none focus-within:border-orange-500 dark:focus-within:border-gray-400 dark:text-gray-200 rtl'
                        dir='auto'
                        name='toppingPrice'
                        defaultValue={toppingPrice}
                        // onChange={e => handleInputChange(e, idx)}
                      />
                    </div>
                    <div className='flex gap-4 pb-6'>
                      {toppings.length !== 1 && (
                        <button
                          type='button'
                          data-tooltip='حذف الإضافة'
                          className='px-5 py-2 text-white transition-colors bg-red-500 rounded-lg w-fit hover:bg-red-600'
                          // onClick={() => handleRemoveClick(idx)}
                        >
                          -
                        </button>
                      )}
                      {toppings.length - 1 === idx && (
                        <button
                          type='button'
                          data-tooltip='إضافة جديدة'
                          className='px-5 py-2 text-white transition-colors bg-blue-500 rounded-lg w-fit hover:bg-blue-600'
                          // onClick={handleAddClick}
                        >
                          +
                        </button>
                      )}
                    </div>
                  </label>
                ))}

                <div
                  className='my-14 inline-block md:text-2xl text-red-600 dark:text-red-400 font-[600] py-2 px-1'
                  ref={formMsg}
                ></div>

                <div className='flex items-center justify-evenly'>
                  <button
                    type='submit'
                    className='min-w-[7rem] bg-green-600 hover:bg-green-700 text-white py-1.5 px-6 rounded-md'
                  >
                    إضافة
                  </button>
                  <Link
                    to={goTo('menu')}
                    className='text-gray-800 underline-hover text-bold dark:text-white'
                  >
                    القائمة
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AddProducts
