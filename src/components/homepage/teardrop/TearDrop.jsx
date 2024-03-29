import React from "react";
import { GiWaterDrop } from "react-icons/gi";
import { RiLeafFill } from "react-icons/ri";
import { AiFillCloud } from "react-icons/ai";
import { BsFillSunFill } from "react-icons/bs";
import "./TearDrop.css";

const TearDrop = () => {
  function handlePlantGrow() {
    let plant = document.getElementById("teardrop-plant");

    plant.style.fontSize = "130px";
    plant.style.top = "610px";
    plant.style.right = "80px";
  }
  setTimeout(handlePlantGrow, 1500);

  function handleSun() {
    const sun = document.querySelector(".sun");
    const cloud = document.querySelector(".cloud");

    const tears = document.querySelectorAll(".tear");
    tears.forEach((tear) => {
      tear.style.display = "none";
    });

    cloud.style.opacity = "0";
    setTimeout(function() {
      sun.style.opacity = "1";
      sun.classList.add("animate-pulse");
    }, 1000);
    
  }
  setTimeout(handleSun, 4000);

  return (
    <>
      <AiFillCloud className="cloud" />
      <BsFillSunFill className="sun" />

      <GiWaterDrop id="teardrop" className="teardrop tear" />
      <GiWaterDrop id="teardrop2" className="teardrop2 tear" />
      <GiWaterDrop id="teardrop3" className="teardrop3 tear" />

      <RiLeafFill id="teardrop-plant" className="teardrop-plant"></RiLeafFill>
    </>
  );
};

export default TearDrop;
