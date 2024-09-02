import { Canvas } from "@react-three/fiber"

import Experience from "./Experience"
import Layout from "./layout"
import RectangleCalculations from "./RectangleCalculations"
import ThreeDimensional from "./ThreeDimensional"
import { heroContents, triangleCard } from "./utils"

export default function App() {
  return (
    <>
      <Layout>
        <Hero
        // title={heroContents.title}
        // description={heroContents.description}
        />
        <RectangleCalculations />
      </Layout>
    </>
  )
}

function Hero({ title, description }) {
  return (
    <>
      <div className="hero bg-black bg-opacity-30">
        <div className="hero-content text-white-content text-center z-10">
          <div className="max-w-md">
            <h1 className=" font-sans text-5xl capsize leading-none font-bold">
              {title}
            </h1>
            <p className="mt-8 font-sans text-base capsize leading-normal">
              {description}
            </p>
            {/* <button className="btn btn-primary ">Get Started</button> */}
          </div>
        </div>
        <Canvas shadows={true}>
          <Experience />
        </Canvas>
      </div>
    </>
  )
}
