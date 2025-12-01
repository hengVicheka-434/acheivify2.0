import React from 'react'
import '../styles/Home.css'
import PageContent from '../components/PageContent'
import homeImg from '../assets/home.png'

export default function Home() {
  return (
    <PageContent pageTitle="Welcome to Achievify!">
      <section className="home">
        <main>
          <div className="home-content">
            <div className="text">

              <p className="home-text">
                Achievify is a web-based productivity tool designed specifically for 
                students who want to stay organized, motivated, and on track with 
                their academic goals. Whether you're juggling assignments, planning 
                study sessions, or just trying to build better habits, Achievify helps 
                you manage it all in one sleek and simple dashboard.
              </p>

              <p className="home-text">
                With features like a customizable to-do list, task tracking with 
                progress updates, a history log of completed tasks, and user 
                authentication for personalized access, Achievify turns productivity 
                into a daily habit. Designed with a clean and consistent user 
                interface, it’s more than just a tracker — it’s your digital study buddy.
              </p>

              <p className="home-text">
                Whether you're prepping for finals or just trying to keep life in order, 
                Achievify makes goal-chasing simple, stylish, and satisfying.
              </p>

            </div>

            <img 
              src={homeImg} 
              alt="An illustration of a man working on his computer." 
              className="home-img" 
            />
          </div>
        </main>
      </section>
    </PageContent>
  );
}
