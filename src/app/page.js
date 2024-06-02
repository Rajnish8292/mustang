'use client'

import localFont from 'next/font/local'


import { Canvas, useLoader, useThree, useFrame, extend } from "@react-three/fiber";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

import { Center, Scroll, useHelper } from "@react-three/drei";
import { SpotLightHelper, DirectionalLightHelper } from "three";
import { use, useLayoutEffect, useRef } from "react";

import { useEffect } from 'react';

import { IoIosArrowRoundDown } from "react-icons/io";
import { MdArrowRightAlt } from "react-icons/md";
import { VscSettings } from "react-icons/vsc";

import { gsap } from "gsap";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Loader from './components/loader';

gsap.registerPlugin(ScrollTrigger);


extend({OrbitControls})





const jersey = localFont({src: './assets/fonts/Jersey15-Regular.ttf'})


function InitiateOrbitControl(props)
{
  const orbitControlsRef = useRef()
  const {camera, gl, scene} = useThree()

  useFrame((state, delta, xFrame) => {
      if(orbitControlsRef.current)
      {
        orbitControlsRef.current.update()
      }
  })
  return (
    <orbitControls ref={orbitControlsRef} args = {[camera, gl.domElement]} target={[0, 70, 0]} enableDamping {...props}/>
  )
}


function Scene(props)
{
  const {camera, scene} = useThree()
  const gltf = useLoader(GLTFLoader, '/ford_mustang_1965/scene.gltf')
  
  useEffect(() => {
    for(let i in scene.children)
    {
      console.log(scene.children)
      if(scene.children[i].name == 'mustang_model')
      {
        console.log(2)
        scene.children[i].rotateY(-40*(3.14/180))
        scene.children[i].rotateZ(-10*(3.14/180))
      }
    }
  }, [])

  useLayoutEffect(() => {
    camera.top = 700 / 2
    camera.bottom = 700 / -2
    camera.left = 800 / -2
    camera.right = 800 / 2
    camera.updateProjectionMatrix()
  })
  return (<primitive position={[0, 0, 0]} name={'mustang_model'} object={gltf.scene} scale={[400, 400, 400]}  {...props}/>)
}


function Lights()
{
  const light1 = useRef()
  const light2 = useRef()
  const light3 = useRef()
  const light4 = useRef()

  // useHelper(light1, DirectionalLightHelper, 1)
  // useHelper(light2, DirectionalLightHelper, 1)

  // useHelper(light3, DirectionalLightHelper, 1)

  // useHelper(light4, DirectionalLightHelper, 1)


  return(
    <>
      <ambientLight color={0xffffff} />
      <directionalLight ref={light1} color={0xffffff} intensity={7} position={[-3, 2, 0]} />
      <directionalLight ref={light2} color={0xffffff} intensity={7} position={[3, 2, 0]} />

      <directionalLight ref={light3} color={0xffffff} intensity={7} position={[0, 2, 3]} />

      <directionalLight ref={light4} color={0xffffff} intensity={7} position={[0, 2, -3]} />

    </>
  )
}


function ScrollAnimation(props)
{
  const {scene} = useThree()
  const {section2Ref} = props
  useEffect(() => {
    for(let i in scene.children)
    {
      if(scene.children[i].name == 'mustang_model')
      {

        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: section2Ref.current,
            start: 'top bottom',
            end:'+=300%',
            scrub: 1,
            // ease: "power4.out",
          }
        })
          // console.log('timeline', scene.children[i])
          tl.to(scene.children[i].rotation, {
            y: -10*(3.14/180),
            x: 10 * (3.14/180),
            duration: 2.5,
            ease: 'power1.out'
          })

          tl.to(scene.children[i].rotation, {
            y: 40*(3.14/180),
            x: -10 * (3.14/180),
            duration: 2.5,
            ease: 'power1.in'
          })
          tl.to(scene.children[i].rotation, {
            y: 0*(3.14/180),
            x: 30 * (3.14/180),
            z: 0,
            duration: 2.5,
            ease: 'power1.out'
          })
      }
    }
  }, [])

}


export default function Home() {
  const section1Ref = useRef()
  const section2Ref = useRef()
  const section3Ref = useRef()
  const canvasRef = useRef()
  useEffect(() => {
    // let tl1 = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: section2Ref.current,
    //     start: 'top bottom',
    //     end:'bottom bottom',
    //     scrub: 1,
    //     markers: true,
    //     ease: "power4.out",
    //   }
    // })
    // tl1.to(canvasRef.current, {
    //   left: 0
    // })

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: section2Ref.current,
        start: 'top bottom',
        end:'+=300%',
        scrub: 1,
        markers: true,
        // ease: "power4.out",
      }
    })
    tl.to(canvasRef.current, {
      left: 0,
      duration: 2.5,
      ease: "power4.out",
    })
    tl.to(canvasRef.current, {
        left: '100%',
        x: '-100%',
        duration: 2.5,
        ease: "power4.in",
    })
    tl.to(canvasRef.current, {
      // left: '50%',
      // x: '-100%',
      left:'50%',
      x: '-50%',
      duration: 2.5,
      ease: "power4.out",
  })
    
  })


  return (<>
  <div className='overlay_canvas' ref={canvasRef} >
  <Canvas  orthographic camera={{position: [0, 0, 1000], near: 0.001, far: 5000, aspect: 1/1}} style={{background:'transparent', height: '700px', width: '800px'}} fallback={<Loader />}>
      <Scene />
      <Lights />
      <ScrollAnimation section2Ref={section2Ref}/>
      {/* <InitiateOrbitControl /> */}
   </Canvas>
  </div>


   <section ref={section1Ref} className={['first_section'].join(' ')} style={{height:'100vh'}}>
   <div className={['title_container'].join(' ')}>
      <div className={[jersey.className, 'first_page_title'].join(' ')}>
        <p>FORD</p>
        <p>MUSTANG 1965</p>
      </div>
      
      <div className={['section_button', jersey.className].join(' ')}>
        <p>Explore the journey</p> <MdArrowRightAlt style={{marginLeft: '20px', fontSize: '25px', transform: 'scalex(2)'}}/>
      </div>

   </div>

      <div className={['down_arrow']}><IoIosArrowRoundDown className='arrow_animation' /></div>
      <div className={['background_circle']}></div>
   </section>

    <section ref={section2Ref}  className={['second_section'].join(' ')}>
      <div className='cross'>
        <div className='left plate'></div>
        <div className='right plate'></div>
      </div>
      <div className={['about_container'].join(' ')}>
        <h2 className={[jersey.className].join(' ')}>
          About
        </h2>

        <p className={[jersey.className].join(' ')} style={{
          fontSize: '22px',
          lineHeight: '25px',
          marginTop: '20px'
        }}>
        The first-generation Ford Mustang was manufactured by Ford from March <span style={{color: '#D91A60'}}>1964</span> until <span style={{color: '#D91A60'}}>1973</span>. The introduction of the Mustang created a new class of automobiles known as pony cars. The Mustang's styling, with its long hood and short deck, proved wildly popular and inspired a host of competition.
        The first-generation Mustangs grew in overall dimensions and engine power with each revision. The <span style={{color: '#D91A60'}}>1971</span> model featured a drastic redesign. This new car shared no components with preceding models.
        </p>
      </div>
    </section>
    <section ref={section3Ref} style={{background: 'none'}}>
        <div className='square'></div>
        <div className='specification_container'>
          <h2 className={jersey.className}>Specifications</h2>
          <p className={jersey.className} style={{fontSize: '22px', marginTop: '20px', lineHeight: '25px', letterSpacing: '1px'}}>
            <span><span style={{color: '#D91A60'}}>Price </span><span> $2,370-$2,612</span></span><br />
            <span><span style={{color: '#D91A60'}}>Weight  </span><span>1117.198 kg</span></span><br />
            <span><span style={{color: '#D91A60'}}>Displacement </span><span>3277 cc | 200.0 cu in. | 3.3 L</span></span><br />
            <span><span style={{color: '#D91A60'}}>Power </span><span> 120 BHP (88.32 KW) @ 4400 RPM</span></span><br />
            <span><span style={{color: '#D91A60'}}>Top Speed </span><span> 207 km/h | 128.651 mph</span></span><br />
          </p> 
        </div>
    </section>
    <section>
        <div className={['last_text', 'left_text', jersey.className].join(' ')}>
          FORD
        </div>
        <div className={['last_text', 'right_text', jersey.className].join(' ')}>
         <span style={{color: '#D91A60'}}>MUSTANG</span> 
        </div>
    </section>
  </>


  );
}
