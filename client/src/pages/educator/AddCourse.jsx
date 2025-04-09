import React, { useEffect, useRef, useState } from 'react'
import uniqid from 'uniqid'
import Quill from 'quill'
import { assets } from '../../assets/assets'

const AddCourse = () => {
  const quillRef = useRef()
  const EditorRef = useRef()

  const [courseTitle, setCourseTitle] = useState('')
  const [coursePrice, setCoursePrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [image, setImage] = useState(null)
  const [chapters, setChapters] = useState([])
  const [showPop, setShowPop] = useState(false)
  const [currentChapterId, setCurrentChapterId] = useState(null)

  const [lectureDetails, setlectureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPreviewFree: false,
  })

  const handleChapter = (action, chapterId) => {
    if (action === 'add') {
      const title = prompt('Enter chaapter Name')
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        }
        setChapters([...chapters, newChapter])
      }
    } else if (action === 'remove') {
      setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId))
    } else if (action === 'toggle') {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId ? { ...chapter, collapsed: !chapter.collapsed } : chapter
        )
      )
    }
  }

  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === 'add') {
      setCurrentChapterId(chapterId)
      setShowPop(true)
    } else if (action === 'remove') {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            const updatedContent = [...chapter.chapterContent]
            updatedContent.splice(lectureIndex, 1)
            return { ...chapter, chapterContent: updatedContent }
          }
          return chapter
        })
      )
    }
  }

  const addLecture = () => {
    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder: chapter.chapterContent.length > 0 ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1 : 1,
            lectureId: uniqid(), 
          }
          return {
            ...chapter,
            chapterContent: [...chapter.chapterContent, newLecture],
          }
        }
        return chapter
      })
    )

    setlectureDetails({
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false,
    })
    setShowPop(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault() 
    console.log('Form submitted')
  }

  useEffect(() => {
    if (!quillRef.current && EditorRef.current) {
      quillRef.current = new Quill(EditorRef.current, {
        theme: 'snow',
      })
    }
  }, [])

  return (
    <div className='h-screen overflow-scroll flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-md w-full text-gray-500'>
        <div className='flex flex-col gap-1'>
          <p>Course Title</p>
          <input type='text' onChange={(e) => setCourseTitle(e.target.value)} value={courseTitle} placeholder='Type here' className='outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500 required' />
        </div>

        <div className='flex flex-col gap-1'>
          <p>Course Description</p>
          <div ref={EditorRef}></div>
        </div>

        <div className='flex items-center justify-between flex-wrap gap-4'>
          <div className='flex flex-col gap-1'>
            <p>Course Price</p>
            <input type='number' onChange={(e) => setCoursePrice(e.target.value)} value={coursePrice} placeholder='0' className='outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500' required />
          </div>

          <div className='flex md:flex-row flex-col items-center gap-3'>
            <p>Course Thumbnail</p>
            <label htmlFor='thumbnailImage' className='flex items-center gap-3'>
              <img src={assets.file_upload_icon} className='p-3 bg-blue-500 rounded cursor-pointer' />
              <input type='file' id='thumbnailImage' onChange={(e) => setImage(e.target.files[0])} accept='image/*' hidden />
              <img src={image ? URL.createObjectURL(image) : ''} className='max-h-10' />
            </label>
          </div>
        </div>

        <div className='flex flex-col gap-1'>
          <p>Discount %</p>
          <input type='number' onChange={(e) => setDiscount(e.target.value)} value={discount} placeholder='0' min={0} max={100} className='outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500' />
        </div>

        <div>
          {chapters.map((chapter, chapterIndex) => (
            <div className='border rounded-lg mb-4 bg-white' key={chapter.chapterId}>
              <div className='flex justify-between items-center p-4 border-b'>
                <div className='flex items-center'>
                  <img
                    src={assets.dropdown_icon}
                    width={14}
                    className={`mr-2 cursor-pointer transition-all ${chapter.collapsed ? '-rotate-90' : ''}`}
                    onClick={() => handleChapter('toggle', chapter.chapterId)}
                  />
                  <span className='font-semibold'>{chapterIndex + 1} {chapter.chapterTitle}</span>
                </div>
                <div className='flex items-center gap-3'>
                  <span className='text-gray-500'>{chapter.chapterContent.length} Lectures</span>
                  <img src={assets.cross_icon} className='cursor-pointer' alt='cross-icon' onClick={() => handleChapter('remove', chapter.chapterId)} />
                </div>
              </div>
              {!chapter.collapsed && (
                <div className='p-4'>
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <div key={lectureIndex} className='flex justify-between items-center mb-2'>
                      <span>
                        {lectureIndex + 1} {lecture.lectureTitle} - {lecture.lectureDuration} mins - <a href={lecture.lectureUrl} target='_blank' className='text-blue-500' rel="noreferrer">Link</a> - {lecture.isPreviewFree ? 'Free Preview' : 'Paid'}
                      </span>
                      <img src={assets.cross_icon} className='cursor-pointer' onClick={() => handleLecture('remove', chapter.chapterId, lectureIndex)} />
                    </div>
                  ))}
                  <div className='inline-flex bg-gray-200 p-2 rounded cursor-pointer mt-2' onClick={() => handleLecture('add', chapter.chapterId)}>
                    + Add lecture
                  </div>
                </div>
              )}
            </div>
          ))}
          <div onClick={() => handleChapter('add')} className='flex justify-center items-center bg-blue-100 p-2 rounded-lg cursor-pointer text-gray-400'>+ Add Chapter</div>

          {showPop && (
            <div className='fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50'>
              <div className='bg-white text-gray-700 p-4 rounded relative w-full max-w-80'>
                <h2 className='text-lg font-semibold mb-4'>Add Lecture</h2>

                <div className='pb-2'>
                  <p>Lecture Title</p>
                  <input type='text' value={lectureDetails.lectureTitle} onChange={(e) => setlectureDetails({ ...lectureDetails, lectureTitle: e.target.value })} className='mt-1 block w-full border rounded py-1 px-2' />
                </div>

                <div className='pb-2'>
                  <p>Duration (minutes)</p>
                  <input type='number' value={lectureDetails.lectureDuration} onChange={(e) => setlectureDetails({ ...lectureDetails, lectureDuration: e.target.value })} className='mt-1 block w-full border rounded py-1 px-2' />
                </div>

                <div className='pb-2'>
                  <p>Lecture URL</p>
                  <input type='text' value={lectureDetails.lectureUrl} onChange={(e) => setlectureDetails({ ...lectureDetails, lectureUrl: e.target.value })} className='mt-1 block w-full border rounded py-1 px-2' />
                </div>

                <div className='flex gap-2 my-4'>
                  <p>Is Preview free?</p>
                  <input type='checkbox' className='mt-1 scale-125' checked={lectureDetails.isPreviewFree} onChange={(e) => setlectureDetails({ ...lectureDetails, isPreviewFree: e.target.checked })} />
                </div>

                <button type='button' onClick={addLecture} className='w-full bg-blue-400 text-white px-4 py-2 rounded'>
                  Add
                </button>

                <img src={assets.cross_icon} onClick={() => setShowPop(false)} className='absolute top-4 right-4 w-4 cursor-pointer' />
              </div>
            </div>
          )}
        </div>

        <button type='submit' className='bg-black text-white w-max py-2.5 px-8 rounded my-4'>Add</button>
      </form>
    </div>
  )
}

export default AddCourse
