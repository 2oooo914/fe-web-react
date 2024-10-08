import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import ProblemHeader from "../../components/Header/problemHeader";
import ProblemDetailNav from "../../components/nav/problemDetailNav";
import ProblemDetailContainer from '../../components/problemDetail/problemDetailContainer';
import ProblemDetailModal from '../../components/problemDetail/problemDetailModal';
import DataLoadingSpinner from "../../components/common/dataLoadingSpinner";
import { client } from "../../utils";

export default function ProblemDetail() {
  const { id } = useParams();
  const [problemData, setProblemData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    const fetchProblemDetail = async () => {
      try {
        const response = await client.get(`/api/v1/problem/${id}/detail`, {
          withCredentials: true
        });
        if (response.status === 200) {
          setProblemData(response.data);
        } else {
          console.error('Failed to fetch problem data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching problem data:', error);
      }
    };

    fetchProblemDetail();
  }, [id]);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsDeleteOpen(false);
  };

  if (!problemData) {
    return (
      <div className="w-full p-20">
      <div className="flex flex-col justify-center items-center m-10">
        <DataLoadingSpinner />
      </div>
      </div>
    )
  }

  return (
    <>
    <div className="fixed top-16 left-0 w-full z-10">
    <ProblemHeader 
      title={problemData.title} 
    />
    <ProblemDetailNav 
      problemData={problemData}
      onEditClick={handleEditClick}
      onDeleteClick={handleDeleteClick}
    />
    </div>
      <ProblemDetailContainer 
      problemData={problemData}
      />
      <ProblemDetailModal 
        isOpen={isModalOpen || isDeleteOpen}
        onClose={handleCloseModal}
        problemData={problemData}
        isDeleteModal={isDeleteOpen}
      />
    </>

  );
}