import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';
import { AppContext } from '../../Context/AppContext';
import YouTube from 'react-youtube'; 
import Footer from '../../components/student/Footer';
import Rating from '../../components/student/Rating';

const Player = () => {
  const { enrolledCourses, calculateChapterTime } = useContext(AppContext);
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState({});

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getCourseData = () => {
    const course = enrolledCourses.find((course) => course._id === courseId);
    if (course) setCourseData(course);
  };

  useEffect(() => {
    getCourseData();
  }, [enrolledCourses]);

  return (
  <>
    <div className='p-4 sm:p-10 flex-col-reverse md:grid md:grid-cols-2 gap-10'>
      {/* Left Column */}
      <div className='text-gray-800'>
        <h2 className='text-xl font-semibold'>Course Structure</h2>
        <div className='pt-5'>
          {courseData &&
            courseData.courseContent?.map((chapter, index) => (
              <div className='border border-gray-300 bg-white mb-2 rounded' key={index}>
                <div
                  className='flex items-center justify-between px-4 py-3 cursor-pointer select-none'
                  onClick={() => toggleSection(index)}
                >
                  <div className='flex items-center gap-2'>
                    <img
                      className={`transform transition-transform ${
                        openSections[index] ? 'rotate-180' : ''
                      }`}
                      src={assets.down_arrow_icon}
                      alt='arrow icon'
                    />
                    <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
                  </div>
                  <p className='text-sm md:text-default'>
                    {chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}
                  </p>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openSections[index] ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300'>
                    {chapter.chapterContent.map((lecture, i) => (
                      <li className='flex items-start gap-2 py-1' key={i}>
                        <img
                          className='w-4 h-4 mt-1'
                          src={false ? assets.blue_tick_icon : assets.play_icon}
                          alt='playIcon'
                        />
                        <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-default'>
                          <p>{lecture.lectureTitle}</p>
                          <div className='flex gap-2'>
                            {lecture.lectureUrl && (
                              <p
                                onClick={() =>
                                  setPlayerData({
                                    ...lecture,
                                    chapter: index + 1,
                                    lecture: i + 1,
                                  })
                                }
                                className='text-blue-500 cursor-pointer'
                              >
                                Watch
                              </p>
                            )}
                            <p>
                              {humanizeDuration(lecture.lectureDuration * 60 * 1000, {
                                units: ['h', 'm'],
                              })}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
        </div>

        <div className='flex items-center gap-2 py-3 mt-10'>
          <h1 className='text-xl font-bold'>Rate this course</h1>
          <Rating initialRating={0}/>
        </div>

      </div>

      {/* Right Column */}
      <div className='md:mt-10'>
        {playerData.lectureUrl ? (
          <div>
            <YouTube
              videoId={playerData.lectureUrl.split('/').pop()}
              opts={{ playerVars: { autoplay: 1 } }}
              iframeClassName='w-full aspect-video'
            />
            <div className='flex justify-between items-center mt-1'>
              <p>{playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}</p>
              <button className='text-blue-600'>{false ? 'Completed' : 'Mark Complete'}</button>
            </div>
          </div>
        ) : (
          <img
            src={courseData ? courseData.courseThumbnail : ''}
            alt='Course Thumbnail'
            className='w-full aspect-video object-cover rounded'
          />
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Player;
