import React from 'react'
import Cards from './Cards'
import img1 from "../assets/c1.png"
import img2 from "../assets/c2.png"
import img3 from "../assets/c4.png"


function Home() {
  return (
   <>
 <div id="carousel" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={img1} className="d-block w-100 custom-carousel-img" alt="..." />
    </div>
    <div className="carousel-item">
      <img src={img2} className="d-block w-100 custom-carousel-img" alt="..." />
    </div>
    <div className="carousel-item">
      <img src={img3} className="d-block w-100 custom-carousel-img" alt="..." />
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

   </>
  )
}

export default Home
