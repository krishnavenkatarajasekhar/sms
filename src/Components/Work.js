import React from "react";
import Book from "../Assets/book.png";
import Discipline from "../Assets/discipline.png";
import Teacher from "../Assets/school-teacher.png";
import './Landing.css';

const Work = () => {
  const workInfoData = [
    {
      image: Book,
      title: "Books",
      text: "A book is a medium for recording information in the form of writing or images, typically composed of many pages.",
    },
    {
      image: Discipline,
      title: "Discipline",
      text: "Discipline is the practice of training people to obey rules or a code of behavior, using punishment to correct disobedience. ",
    },
    {
      image: Teacher,
      title: "Teacher",
      text: " A Teacher is a person who helps students to acquire knowledge, competence, or virtue, via the practice of teaching.",
    },
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Work</p>
        <h1 className="primary-heading">How It Works</h1>
        <p className="primary-text">
        A school is both the educational institution and building designed to provide learning spaces and learning environments for the teaching of students under the direction of teachers.
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
