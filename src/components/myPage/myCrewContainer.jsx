import React from 'react';
import Button from '../common/button';
import LanguageTag from '../common/languageTag';

const formatDate = (submissionTime) => {
  const date = new Date(submissionTime);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; 
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedDate = `${year}년 ${month.toString().padStart(2, '0')}월 ${day.toString().padStart(2, '0')}일 ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  return formattedDate;
};

export default function MyCrewContainer() {
  const crewData = [
    {
      id: 1,
      created_at: '2024-08-16T12:34:00',
      icon: '😉',
      name: '코딩메리호',
      tags: [
        { type: 'language', name: 'Python' },
        { type: 'level', name: '실버 5 이상' },
        { type: 'custom', name: '알고리즘' },
      ],
      message: '저 진짜 열심히 할 자신있습니다. 받아주세요 저 진짜 열심히 할 자신있습니다. 받아주세요 저 진짜 열심히 할 자신있습니다. 받아주세요 저 진짜 열심히 할 자신있습니다. 받아주세요저 진짜 열심히 할 자신있습니다. 받아주세요 저 진짜 열심히 할 자신있습니다. 받아주세요 저 진짜 열심히 할 자신있습니다. 받아주세요 저 진짜 열심히 할 자신있습니다. 받아주세요',
    },
    {
      id: 2,
      created_at: '2024-08-16T12:35:00',
      icon: '🚀',
      name: '우주탐사대',
      tags: [
        { type: 'language', name: 'JavaScript' },
        { type: 'level', name: '골드 3 이상' },
        { type: 'custom', name: '웹 개발' },
      ],
      message: '열정과 실력을 겸비했습니다 열심히 하겠습니다!',
    },
    {
      id: 3,
      created_at: '2024-08-16T12:36:00',
      icon: '🌟',
      name: '스타코더즈',
      tags: [
        { type: 'language', name: 'Java' },
        { type: 'level', name: '브론즈 1 이상' },
        { type: 'custom', name: '데이터베이스' },
      ],
      message: '데이터베이스에 관심 있습니다.',
    },
    {
      id: 4,
      created_at: '2024-08-16T12:37:00',
      icon: '💻',
      name: '해커톤 마스터즈',
      tags: [
        { type: 'language', name: 'C++' },
        { type: 'level', name: '플래티넘 5 이상' },
        { type: 'custom', name: '해커톤' },
      ],
      message: '열심히하겠습니다.',
    }
  ];

  const approveMessage = () => {
    return alert('선장님의 승인/거절 여부에 따라 이메일로 결과가 전송돼요!');
  }

  return (
    <div className='col-span-3 box min-w-fit'>
      <div className='w-full flex flex-col gap-6'>
        <p className='boxTitle w-fit'>크루 가입 신청 현황</p>
        
        {crewData.map(crew => (
          <div key={crew.id} className='box'>
            <div className='w-full flex-col justify-end items-end gap-6 inline-flex'>
              <div className='w-full flex-col justify-start items-start gap-6 inline-flex'>
                <div className='inline-flex gap-6 justify-start items-start'>
                  <p className='text-5xl font-bold'>{crew.icon}</p>
                  
                  <div className='flex-col justify-start items-start gap-4 flex'>
                    <p className='text-gray-900 font-bold'>{crew.name}</p>
                    <div className='justify-between items-center inline-flex gap-6'>
                      <p className='font-medium text-base-15'>신청 시각</p>
                      <p className='font-normal text-base-15'>{formatDate(crew.created_at)}</p>
                    </div>
                    <div className='justify-between items-center inline-flex gap-6'>
                      <p className='font-medium'>크루 태그</p>
                      <div className="justify-start items-center gap-2 inline-flex flex-wrap">
                        {crew.tags
                          .filter(tag => tag.type === "language")
                          .map((tag, index) => (
                            <LanguageTag key={index} language={tag.name} />
                        ))}
                        {crew.tags
                          .filter(tag => tag.type === "level")
                          .map((tag, index) => (
                            <LanguageTag key={index} language={tag.name} className="tag border bg-gray-600 text-white" />
                        ))}
                        {crew.tags
                          .filter(tag => tag.type === "custom")
                          .map((tag, index) => (
                            <LanguageTag key={index} language={tag.name} className="bg-white text-gray-600 border border-gray-600" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='w-full flex flex-col gap-2'>
                  <p className='text-gray-900 text-base-14 font-medium'>신청 메시지</p>
                  <div className='w-full p-5 bg-gray-50 justify-start items-start h-fit'>
                    <p className='text-gray-900 whitespace-normal'>{crew.message}</p>
                  </div>
                </div>
              </div>
              
              <Button
                buttonSize={'detailBtn'}
                colorStyle={'whiteBlack'}
                content={'수락 대기중'}
                onClick={approveMessage}
              />
            </div>  
          </div> 
        ))}
      </div>
    </div>
  );
}