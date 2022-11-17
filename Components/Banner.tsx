import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Movie } from '../typings'
import bannerstyles from '../styles/Banner.module.css'
import {useRecoilState} from 'recoil'
import {modalState, movieState} from '../atom/modalAtom'
import { FaPlay } from 'react-icons/fa'

const baseUrl = 'https://image.tmdb.org/t/p/original/'
interface Props {
    trendingNow: Movie[]
  }
  
function Banner({trendingNow}: Props) {

    const [modal, setModal] = useRecoilState(modalState);
    const [movie, setMovie] = useState<Movie | null>(null);
    const [currentMovie, setCurrentMovie] = useRecoilState(movieState)



    useEffect(() => {
      setMovie(
            trendingNow[Math.floor(Math.random() * trendingNow.length - 1)]
        )
        
      }, [trendingNow])

    return (
        <div>
            <div className={bannerstyles.banner}>
                <Image  src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
                layout="fill"
                objectFit='cover' alt={'backdrop Image'}></Image>
                <div className={bannerstyles.banner_contents}>
                <h1 className={bannerstyles.banner_title}>
                   {movie?.name || movie?.title || movie?.original_name}
                </h1>
                <h1 className={bannerstyles.banner_description}>
                      {movie?.overview?.length> 150? movie?.overview.slice(0,150)+" ..." : movie?.overview }
 
                    
                </h1>
                
                <div className={bannerstyles.banner_buttons}>
                    <button className={bannerstyles.banner_button_play}>
                    <FaPlay className={bannerstyles.playBtn} />
                        Play</button>
                    <button className={bannerstyles.banner_button}
                    onClick = {()=>{
                        setCurrentMovie(movie)
                        setModal(true)
                    }}>More Info</button>
                </div>
         
            </div>

            </div>
        </div>
    )
}



export default Banner