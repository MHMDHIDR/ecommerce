import { useState, useEffect, useRef, useContext, ChangeEvent, Suspense } from 'react'
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
import Layout from '../../components/Layout'
import { LoadingPage } from '../../components/Loading'

const AddProducts = () => {
  useDocumentTitle('إضافة منتجات')

  useEffect(() => {
    scrollToView()
  }, [])

  //Form States
  const [itemName, setItemName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState([])
  const [itemDesc, setItemDesc] = useState('')

  const [addItemStatus, setAddItemStatus] = useState()
  const [addFoodMessage, setAddItemMessage] = useState()
  const [categoryList, setCategoryList] = useState([])
  const [toppings, setToppings] = useState([])

  //Contexts
  const { file } = useContext(FileUploadContext)

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
  //     formData.append('itemName', itemName)
  //     formData.append('price', price)
  //     formData.append('category', category[0])
  //     formData.append('itemDesc', itemDesc)
  //     formData.append('foodToppings', JSON.stringify(toppings))

  //     file.map(foodImg => {
  //       console.log(foodImg)
  //       formData.append('foodImg', foodImg)
  //     })

  //       //show waiting modal
  //       modalLoading.classList.remove('hidden')

  //       try {
  //         const response = await Axios.post(`${API_URL}/foods`, formData)

  //         const { itemAdded, message } = response.data
  //         setAddItemStatus(itemAdded)
  //         setAddItemMessage(message)
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
      {addItemStatus === 1 ? (
        <Modal
          status={Success}
          msg={`تم إضافة ${category[1]} بنجاح 😄 الرجاء الانتظار ليتم تحويلك لقائمة الوجبات والمشروبات`}
          redirectLink='menu'
          redirectTime={3000}
        />
      ) : addItemStatus === 0 ? (
        <Modal status={Error} msg={addFoodMessage} />
      ) : null}

      <Suspense fallback={<LoadingPage />}>
        <Layout>
          <section className='py-12 my-8 dashboard'>
            <div className='container mx-auto max-w-6xl'>
              <h3 className='mx-0 mt-4 mb-12 text-2xl text-center md:text-3xl'>
                إضافة وجبة
              </h3>

              {/* Show Modal Loading when submitting form */}
              {/* <Modal
                status={Loading}
                modalHidden='hidden'
                classes='text-blue-500 text-center'
                msg='الرجاء الانتظار...'
              /> */}

              <form
                method='POST'
                className='flex flex-col'
                encType='multipart/form-data'
                // onSubmit={e => handleAddFood(e)}
              >
                <div className='flex flex-col items-center justify-center gap-4 mb-8 sm:justify-between'>
                  <FileUpload
                    data={{
                      defaultImg: [
                        {
                          ImgDisplayName: 'Item Name',
                          ImgDisplayPath: 'https://tecdn.b-cdn.net/img/new/avatars/2.jpg'
                        }
                      ],
                      imgName: 'Item Name',
                      label: 'أضف صورة'
                    }}
                  />
                </div>

                <label htmlFor='itemName' className='form__group'>
                  <input
                    type='text'
                    id='itemName'
                    className='form__input'
                    autoFocus
                    required
                    onChange={e => setItemName(createSlug(e.target.value.trim()))}
                  />
                  <span className='form__label'>اسم المنتج</span>
                </label>

                <label htmlFor='price' className='form__group'>
                  <input
                    type='number'
                    id='price'
                    className='form__input'
                    min='5'
                    max='500'
                    required
                    onChange={e => setPrice(e.target.value.trim())}
                  />
                  <span className='form__label'>السعر (ر.ق)</span>
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

                <label htmlFor='description' className='form__group'>
                  <textarea
                    name='description'
                    id='description'
                    minLength={10}
                    maxLength={300}
                    className='form__input'
                    required
                    onChange={e => setItemDesc(e.target.value.trim())}
                  ></textarea>
                  <span className='form__label'>وصف المنتج</span>
                </label>

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
          </section>
        </Layout>
      </Suspense>
    </>
  )
}

export default AddProducts
