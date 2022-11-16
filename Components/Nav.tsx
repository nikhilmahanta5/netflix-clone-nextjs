import { useEffect, useState } from "react";
import navstyles from "../styles/Nav.module.css";

function Nav() {
  const[isScroll, setIsScroll] = useState(false)

  useEffect(()=>{
    const handleScroll = () => {
      if(window.scrollY > 100){
        setIsScroll(true)
      }
      else{
        setIsScroll(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return ()=>{
      window.removeEventListener('scroll', handleScroll)
    }
  },[])



  return (
  <div className={navstyles.nav}>
<div className={`${isScroll && 'bg_black'}`}>
      <div className={navstyles.nav_contents}>
        <div className={navstyles.nav_left}>
        <img
          className={navstyles.nav_logo}
          src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
          alt=""
        />
        <ul className={navstyles.nav_list}>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li> Browse by Language</li>
        </ul>
        </div>
        <img
          className={navstyles.nav_avatar}
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt=""
        />
      </div>
    </div>

  </div>



    
  );
}

export default Nav;
